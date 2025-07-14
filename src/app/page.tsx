"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
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

  const handleReload = useCallback(() => {
    console.log("🔄 Reloading in 2s...");
    setTimeout(() => window.location.reload(), 2000);
  }, []);

  // Render AWS CAPTCHA
  useEffect(() => {
    if (!window.AwsWafCaptcha || !captchaRef.current) return;

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
        defaultLocale: 'th-TH',
        disableLanguageSelector: true,
      });
    } catch (error) {
      console.error("🚨 CAPTCHA render error:", error);
    }
  }, [handleReload]);

  // Scan shadow DOM and set canvas
  useEffect(() => {
    if (canvas || started) return;

    const interval = setInterval(() => {
      const wafElement = document.getElementsByTagName("awswaf-captcha")[0];
      if (wafElement?.shadowRoot) {
        const em = wafElement.shadowRoot.querySelector("em");
        const foundCanvas = wafElement.shadowRoot.querySelector("canvas");
        const button = wafElement.shadowRoot.querySelector('button[type="submit"]') as HTMLButtonElement;

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
  }, [canvas, started]);

  // Process CAPTCHA image and auto-click
  useEffect(() => {
    if (!canvas || !promptType || !submitBtn) return;

    const runBot = async () => {
      const tiles = splitCanvasInto9Images(canvas);
      const prompt = `These are 9 image tiles from a CAPTCHA. Tell me which tiles (numbered 1-9, left to right, top to bottom) contain '${promptType}'. Respond with only tile numbers as array.`;

      const indices = await askGeminiWithVision(tiles, prompt);
      console.log("🤖 GPT returned indices:", indices);
      autoClickTiles(indices);
      await delay(3*1000)
      submitBtn.click();
    };

    runBot();
  }, [canvas, promptType, submitBtn]);

  return (
    <div className="min-h-screen p-4">
      <div ref={captchaRef} />
    </div>
  );
};

export default Page;
