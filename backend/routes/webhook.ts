import express from "express";
import axios from "axios";

const router = express.Router();

const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
const PAGE_ID = process.env.PAGE_ID;

router.post("/", async (req, res) => {
  const body = req.body;

  // ✅ Facebook page webhook шалгалт
  if (body.object === "page") {
    for (const entry of body.entry || []) {
      const webhook_event = entry.messaging?.[0];
      const senderId = webhook_event?.sender?.id;

      // ❌ senderId байхгүй эсвэл буруу байвал алгасана
      if (!senderId || typeof senderId !== "string") {
        console.warn("⚠️ senderId олдсонгүй эсвэл буруу форматтай:", senderId);
        continue;
      }

      try {
        // ✅ FB рүү мессеж илгээх
        const fbRes = await axios.post(
          `https://graph.facebook.com/v18.0/${PAGE_ID}/messages`,
          {
            messaging_type: "RESPONSE",
            recipient: { id: senderId },
            message: { text: "Танд баярлалаа! Тайлан илгээх товчийг дарна уу." },
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

    return res.sendStatus(200);
  }

  return res.sendStatus(404);
});

export default router;
