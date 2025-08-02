import fs from "fs";
import path from "path";

const LOG_DIR = path.join(__dirname, "../logs");
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

export async function logReport(companyId: string, success: boolean, message: string) {
  const log = {
    companyId,
    success,
    message,
    timestamp: new Date().toISOString(),
  };

  const filePath = path.join(LOG_DIR, "report-log.jsonl");
  fs.appendFileSync(filePath, JSON.stringify(log) + "\n");
}
