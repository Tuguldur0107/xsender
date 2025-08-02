import express from "express";
import axios from "axios";

const router = express.Router();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const PAGE_ID = process.env.PAGE_ID;

router.post("/", async (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    for (const entry of body.entry) {
      const webhook_event = entry.messaging[0];
      const senderId = webhook_event.sender.id;

      // ✅ Энд мессеж буцааж илгээж байна
      await axios.post(
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
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

export default router;
