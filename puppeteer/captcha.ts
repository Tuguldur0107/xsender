import { Page } from "puppeteer";

export async function blockIfCaptcha(page: Page) {
  const bodyText = await page.evaluate(() => document.body.innerText);
  if (bodyText.includes("CAPTCHA") || bodyText.includes("бот шалгалт")) {
    throw new Error("❌ CAPTCHA илэрсэн тул automation зогслоо.");
  }
}
