import puppeteer from "puppeteer";
import { blockIfCaptcha } from "./captcha";

export async function submitXReport(regNo: string, password: string): Promise<string> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    console.log("🔐 Etax руу нэвтэрч байна...");
    await page.goto("https://etax.mta.mn", { waitUntil: "networkidle2" });

    await page.waitForSelector("input#username", { timeout: 5000 });
    await page.type("input#username", regNo);
    await page.type("input#password", password);

    await Promise.all([
      page.click("input[name='login']"),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    await blockIfCaptcha(page);
    console.log("✅ Тайлан илгээх процесс дууслаа.");
    await browser.close();
    return "Report submitted successfully";
  } catch (err) {
    await browser.close();
    throw new Error("etax automation failed: " + err);
  }
}
