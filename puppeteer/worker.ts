import { submitXReport } from "./etax";
import { logReport } from "./logger";

/**
 * Энэ функц backend-аас дуудсан үед тайлан илгээнэ.
 */
export async function triggerReportSubmission(companyId: string) {
  try {
    // TODO: DB-оос компанийн мэдээлэл авах (regNo, encrypted password г.м.)
    const dummyData = {
      regNo: "1234567",
      password: "supersecret",
    };

    const result = await submitXReport(dummyData.regNo, dummyData.password);

    // Амжилттай тайлан илгээсэн лог
    await logReport(companyId, true, result);
    return result;
  } catch (err) {
    await logReport(companyId, false, String(err));
    throw err;
  }
}
