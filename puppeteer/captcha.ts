import { Page } from "puppeteer";

/**
 * CAPTCHA харагдаж байгааг шалгах
 */
export async function isCaptchaPresent(page: Page): Promise<boolean> {
  try {
    // CAPTCHA iframe, div эсвэл class байж болно — etax дээр тааруулж өөрчилнө
    const captchaSelector = "iframe[src*='captcha']"; // жишээ
    await page.waitForSelector(captchaSelector, { timeout: 3000 });
    console.log("🔒 CAPTCHA илэрлээ");
    return true;
  } catch {
    return false;
  }
}

/**
 * CAPTCHA эсвэл алдаа popup гарсан бол зогсоох
 */
export async function blockIfCaptcha(page: Page) {
  const hasCaptcha = await isCaptchaPresent(page);
  if (hasCaptcha) {
    throw new Error("❌ CAPTCHA илэрсэн тул автоматаар үргэлжлүүлэх боломжгүй.");
  }
}
