import express from "express";
import dotenv from "dotenv";
import reportRoutes from "./routes/report";
import paymentRoutes from "./routes/payment";
import webhookRoutes from "./routes/webhook"; // ✅ нэмсэн

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use("/api/report", reportRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/webhook", webhookRoutes); // ✅ Webhook-г энд холбож байна

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ X-SENDER backend running on port ${PORT}`);
});
