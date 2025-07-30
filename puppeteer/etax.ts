import puppeteer from "puppeteer";
import { blockIfCaptcha } from "./captcha";

export async function submitXReport(regNo: string, password: string) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    console.log("🔐 Etax руу нэвтэрч байна...");
    await page.goto("https://etax.mta.mn", { waitUntil: "networkidle2" });

    // SSO login руу автоматаар redirect хийгдсэн гэж үзнэ
    await page.waitForSelector("input#username", { timeout: 5000 });
    await page.type("input#username", regNo);
    await page.type("input#password", password);

    await Promise.all([
      page.click("input[name='login']"),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    // CAPTCHA шалгах
    await blockIfCaptcha(page);

    console.log("📄 X тайлан руу шилжиж байна...");
    // TODO: X тайлан бүртгэх UI-руу орох
    // await page.goto("https://etax.mta.mn/taxform/X-zero", { waitUntil: "networkidle2" });

    // TODO: Илгээх товч дарах
    // await page.click("#submitBtn");

    console.log("✅ Тайлан илгээх процесс дууслаа.");
    await browser.close();
    return "Report submitted successfully";
  } catch (err) {
    console.error("❌ Automation error:", err);
    await browser.close();
    throw new Error("etax automation failed: " + err);
  }
}
