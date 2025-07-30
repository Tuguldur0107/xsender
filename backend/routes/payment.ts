import express from "express";

const router = express.Router();

// POST /api/payment/webhook
router.post("/webhook", async (req, res) => {
  const payload = req.body;

  // TODO: validate QPay signature here
  console.log("📥 QPay webhook received:", payload);

  // TODO: update DB - mark payment as confirmed

  res.sendStatus(200);
});

export default router;
