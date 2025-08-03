import express from "express";
import axios from "axios";
import { getSessionStep, updateSessionStep } from "../lib/session";
import { fetchUserProfile } from "../lib/facebook";
import { upsertUser, saveEtaxRegister, saveEtaxPassword } from "../lib/user";
import { saveEtax2FAMethod } from "../lib/user";

const router = express.Router();

const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
const PAGE_ID = process.env.PAGE_ID;

const processedMessageIds = new Set<string>(); // ✅ Flood таслах

// ✅ FB-д reply илгээх туслах функц
async function sendFbMessage(senderId: string, message: string) {
  try {
    const fbRes = await axios.post(
      `https://graph.facebook.com/v18.0/${PAGE_ID}/messages`,
      {
        messaging_type: "RESPONSE",
        recipient: { id: senderId },
        message: { text: message },
      },
      {
        headers: {
          Authorization: `Bearer ${PAGE_ACCESS_TOKEN}`,
        },
      }
    );
    console.log("✅ FB хариу:", fbRes.data);
  } catch (err: any) {
    console.error("❌ FB API алдаа:", err.response?.data || err.message);
  }
}

router.post("/", async (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    for (const entry of body.entry || []) {
      const webhook_event = entry.messaging?.[0];
      const senderId = webhook_event?.sender?.id;
      const messageId = webhook_event?.message?.mid;
      const msg = webhook_event?.message?.text?.trim();

      // 🛑 Өөрсдийн мессеж бол skip
      if (webhook_event?.message?.is_echo) {
        console.log("⚠️ is_echo: true — skip");
        continue;
      }

      // 🛑 Flood-той message давхцаж байвал skip
      if (!messageId || processedMessageIds.has(messageId)) {
        console.log("⚠️ Давхардсан message: ", messageId);
        continue;
      }
      processedMessageIds.add(messageId);

      if (!senderId || !msg) {
        console.warn("⚠️ senderId эсвэл message байхгүй");
        continue;
      }

      // ✅ Session logic
      const step = await getSessionStep(senderId);

      if (!step) {
        const fb_name = await fetchUserProfile(senderId);
        await upsertUser(senderId, fb_name);
        await updateSessionStep(senderId, "terms");
        await sendFbMessage(senderId, `📃 Сайн байна уу ${fb_name}! Үйлчилгээний нөхцлийг зөвшөөрнө үү. "Зөвшөөрч байна" гэж бичнэ үү.`);
        continue;
      }

      if (step === "terms" && msg === "Зөвшөөрч байна") {
        await updateSessionStep(senderId, "etax_login");
        await sendFbMessage(senderId, "🆔 Регистрээ бичнэ үү:");
        continue;
      }

      if (step === "etax_login") {
        await saveEtaxRegister(senderId, msg);
        await updateSessionStep(senderId, "etax_password");
        await sendFbMessage(senderId, "🔐 Etax нууц үгээ бичнэ үү:");
        continue;
      }

      if (step === "etax_password") {
        await saveEtaxPassword(senderId, msg);
        await updateSessionStep(senderId, "2fa_select");
        await sendFbMessage(senderId, "📲 2FA аргаа сонгоно уу: 1 - Мэйл, 2 - QR, 3 - SMS");
        continue;
      }

      if (step === "2fa_select") {
        if (["1", "2", "3"].includes(msg)) {
          await saveEtax2FAMethod(senderId, msg);
          await updateSessionStep(senderId, `2fa_${msg}`);

          if (msg === "1") {
            await sendFbMessage(senderId, "📧 Мэйлээр ирсэн 6 оронтой кодыг оруулна уу:");
          } else if (msg === "2") {
            await sendFbMessage(senderId, "📷 QR код уншуулах заавар... (түр placeholder)");
          } else if (msg === "3") {
            await sendFbMessage(senderId, "📩 383890 гэсэн кодыг 131315 дугаар луу илгээнэ үү.");
          }
        } else {
          await sendFbMessage(senderId, "⚠️ 1, 2 эсвэл 3 гэж сонгож бичнэ үү.");
        }
        continue;
      }

      // 📌 Default message
      await sendFbMessage(senderId, "🤖 Командаа таньж чадсангүй. /start гэж бичээд эхлүүлнэ үү.");
    }

    return res.sendStatus(200);
  }

  return res.sendStatus(404);
});

export default router;
