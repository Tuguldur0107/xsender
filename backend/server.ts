import express from "express";
import dotenv from "dotenv";
import reportRoutes from "./routes/report";
import paymentRoutes from "./routes/payment";

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use("/api/report", reportRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ X-SENDER backend running on port ${PORT}`);
});

app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});
