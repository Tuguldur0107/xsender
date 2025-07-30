import fs from "fs";
import path from "path";

const LOG_DIR = path.join(__dirname, "../logs");
const LOG_FILE = path.join(LOG_DIR, "reports.log");

export async function logReport(companyId: string, success: boolean, message: string) {
  try {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR);
    }

    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] companyId=${companyId} success=${success} message="${message}"\n`;

    fs.appendFileSync(LOG_FILE, logLine);
    console.log("📝 Report log written.");
  } catch (err) {
    console.error("❌ Failed to write log:", err);
  }
}
