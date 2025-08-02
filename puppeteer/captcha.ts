// puppeteer/captcha.ts
import { Page } from 'playwright';

export async function blockIfCaptcha(page: Page): Promise<void> {
  const content = await page.content();
  if (content.includes('captcha') || content.includes('шинэчлээд орно уу')) {
    throw new Error('🛑 CAPTCHA илэрсэн тул процесс зогслоо!');
  }
}
