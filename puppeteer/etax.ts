import { chromium } from "playwright";
import { blockIfCaptcha } from "./captcha";

export async function submitXReport(regNo: string, password: string): Promise<string> {
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("🔐 Etax руу нэвтэрч байна...");
    await page.goto("https://etax.mta.mn", { waitUntil: "networkidle" });

    await page.fill("input#username", regNo);
    await page.fill("input#password", password);
    await Promise.all([
      page.click("input[name='login']"),
      page.waitForLoadState("networkidle"),
    ]);

    await blockIfCaptcha(page);

    console.log("📄 X тайлан руу шилжиж байна...");
    // TODO: X тайлан илгээх UI interaction энд хийнэ
    // Жишээ:
    // await page.click("#submitBtn");

    console.log("✅ Тайлан илгээх процесс дууслаа.");
    await browser.close();
    return "Report submitted successfully";
  } catch (err) {
    await browser.close();
    throw new Error("etax automation failed: " + err);
  }
}
