import { submitXReport } from "./etax";
import { logReport } from "./logger";

export async function triggerReportSubmission(companyId: string): Promise<string> {
  try {
    const dummyData = {
      regNo: "1234567",
      password: "supersecret",
    };

    const result = await submitXReport(dummyData.regNo, dummyData.password);
    await logReport(companyId, true, result);
    return result;
  } catch (err) {
    await logReport(companyId, false, String(err));
    throw err;
  }
}
