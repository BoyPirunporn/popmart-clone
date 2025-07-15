"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import { askGeminiWithVision, autoClickTiles, splitCanvasInto9Images } from './util';

declare global {
  interface Window {
    AwsWafCaptcha: any;
  }
}

const delay = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

const Page = () => {
  const captchaRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [promptType, setPromptType] = useState<string | null>(null);
  const [submitBtn, setSubmitBtn] = useState<HTMLButtonElement | null>(null);
  const [started, setStarted] = useState(false);
  const [localTH, setLocalTH] = useState(false);

  const handleReload = useCallback(() => {
    console.log("🔄 Reloading in 2s...");
    setTimeout(() => window.location.reload(), 2000);
  }, []);

  // Render AWS CAPTCHA
  useEffect(() => {
    console.log("NOT AWS => ", window.AwsWafCaptcha, captchaRef.current);

    // if (window.AwsWafCaptcha || captchaRef.current) return;
    try {
      window.AwsWafCaptcha.renderCaptcha(captchaRef.current, {
        apiKey: process.env.NEXT_PUBLIC_AWS_CAPTCHA_KEY!,
        onSuccess: () => {
          console.log("✅ CAPTCHA passed");
          handleReload();
        },
        onError: (err: any) => {
          console.error("❌ CAPTCHA error:", err);
          handleReload();
        },
        defaultLocale: 'th',
        disableLanguageSelector: true,
      });
    } catch (error) {
      console.error("🚨 CAPTCHA render error:", error);
    }
  }, [handleReload]);

  const handleReset = () => {
    setCanvas(null);       // clear state เพื่อให้รอ CAPTCHA ใหม่
    setPromptType(null);   // reset prompt
    setSubmitBtn(null);    // reset submit
    setStarted(false)
  };
  // Scan shadow DOM and set canvas
  useEffect(() => {
    if (canvas || started) return;

    const interval = setInterval(() => {
      const wafElement = document.getElementsByTagName("awswaf-captcha")[0];
      if (wafElement?.shadowRoot) {

        const em = wafElement.shadowRoot.querySelector("em");
        const foundCanvas = wafElement.shadowRoot.querySelector("canvas");
        const errorMsg = wafElement.shadowRoot.querySelector("p");
        const button = wafElement.shadowRoot.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (em && em.textContent && /[\u0E00-\u0E7F]+/g.test(em.textContent)) {
          setLocalTH(true)
        }
        // 🛑 ตรวจจับ CAPTCHA ผิด
        if (errorMsg?.textContent?.includes("Incorrect") || errorMsg?.textContent?.includes("ผิดพลาด")) {
          console.log("❌ CAPTCHA incorrect – resetting bot...");
        }
        if (foundCanvas && em && button) {
          setCanvas(foundCanvas as HTMLCanvasElement);
          setPromptType(em.textContent || "");
          setSubmitBtn(button);
          setStarted(true);
          console.log("✅ Canvas & prompt found");
          clearInterval(interval);
        } else {
          console.log("⏳ Waiting for CAPTCHA canvas...");
        }
      } else {
        console.log("⏳ Waiting for shadowRoot...");
      }
    }, 300);

    return () => clearInterval(interval);
  }, [canvas, started, handleReset]);


  // Process CAPTCHA image and auto-click
  useEffect(() => {
    if (!canvas || !promptType || !submitBtn) return;


    const runBot = async () => {
      const tiles = splitCanvasInto9Images(canvas);
      const promptEn = `These are 9 image tiles from a CAPTCHA. Tell me which tiles (numbered 1-9, left to right, top to bottom) contain '${promptType}'. Respond with only tile numbers as array.`;
      const promptTh = `มีภาพทั้งหมด 9 ช่องจาก CAPTCHA โดยเรียงหมายเลขจากซ้ายไปขวา บนลงล่าง (1 ถึง 9) ระบุช่องที่มี '${promptType}' เท่านั้น ตอบกลับมาเป็น array ของหมายเลขช่องเท่านั้น`
      const indices = await askGeminiWithVision(tiles, !localTH ? promptTh : promptEn);
      console.log("🤖 GPT returned indices:", indices);
      autoClickTiles(indices);
      await delay(3 * 1000);
      submitBtn.click();
      console.log("submit")
    };

    runBot();
  }, [canvas, promptType, submitBtn]);

  useEffect(() => {
    const captchaEl = document.getElementsByTagName("awswaf-captcha")[0];
    if (!captchaEl?.shadowRoot) {
      console.warn("❌ No shadowRoot found");
      return;
    }

    const shadow = captchaEl.shadowRoot;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        // ตรวจจับว่ามี node เปลี่ยน เช่น prompt หาย, ปุ่มเปลี่ยน, หรือ error โผล่
        const promptNode = shadow.querySelector("em");
        const canvasNode = shadow.querySelector("canvas");
        const errorText = shadow.querySelector("p")?.textContent;

        // 1️⃣ CAPTCHA ถูกรีเฟรชใหม่
        if (!promptNode || !canvasNode) {
          console.log("🔄 CAPTCHA refreshed — resetting...");
          handleReset(); // reset state (canvas, promptType, started)
          break;
        }

        // 2️⃣ CAPTCHA ไม่ผ่าน
        if (errorText?.toLowerCase().includes("incorrect") || errorText?.includes("ผิดพลาด")) {
          console.log("❌ CAPTCHA incorrect — resetting...");
          handleReset(); // หรืออาจรอ reload ใหม่
          break;
        }
      }
    });

    observer.observe(shadow, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen p-4">
      <div ref={captchaRef} />
    </div>
  );
};

export default Page;
