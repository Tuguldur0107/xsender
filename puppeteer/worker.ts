import { submitXReport } from "./etax";

export async function triggerReportSubmission(companyId: string): Promise<void> {
  const dummyData = {
    regNo: "1234567",
    password: "password123",
  };

  try {
    console.log(`🚀 Тайлан илгээж байна: companyId = ${companyId}`);
    const result = await submitXReport(dummyData.regNo, dummyData.password);
    console.log(`✅ Тайлан илгээв: ${result}`);
  } catch (err) {
    console.error("❌ Алдаа гарлаа:", err);
  }
}
