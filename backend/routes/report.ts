import express from "express";
import { triggerReportSubmission } from "../../puppeteer/worker";

const router = express.Router();

// POST /api/report/submit
router.post("/submit", async (req, res) => {
  const { companyId } = req.body;

  if (!companyId) {
    return res.status(400).json({ error: "companyId is required" });
  }

  try {
    const result = await triggerReportSubmission(companyId);
    res.json({ success: true, result });
  } catch (err) {
    console.error("❌ Report submission error:", err);
    res.status(500).json({ success: false, error: "Submission failed" });
  }
});

export default router;
