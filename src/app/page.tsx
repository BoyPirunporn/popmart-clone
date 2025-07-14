"use client"
import React, { useState } from 'react'
import { askGeminiWithVision, askGPTWithVision, autoClickTiles, splitCanvasInto9Images } from './util'
declare global {
  interface Window {
    AwsWafCaptcha: any
  }
}
const page = () => {
  const captchaRef = React.useRef<HTMLDivElement>(null)
  const [canva, setCanva] = useState<HTMLCanvasElement | null>(null);
  const [promptType, setPromptType] = useState<string | null>(null);

  React.useEffect(() => {
    if (!window.AwsWafCaptcha || !captchaRef.current) return
    window.AwsWafCaptcha.renderCaptcha(captchaRef.current, {
      apiKey: process.env.NEXT_PUBLIC_AWS_CAPTCHA_KEY!, // ใส่ใน .env
      onSuccess: (token: any) => {
        console.log('CAPTCHA success:', token)
        window.location.reload()
      },
      onError: (err: any) => {
        console.error('CAPTCHA error:', err)
      },
      defaultLocale: 'th-TH',
      disableLanguageSelector: true,
    })


  }, [])

  React.useEffect(() => {
    if (canva) return;

    const interval = setInterval(() => {
      const wafElement = document.getElementsByTagName("awswaf-captcha")[0];
      if (wafElement?.shadowRoot) {
        const em = wafElement.shadowRoot.querySelector("em")
        const canvas = wafElement.shadowRoot.querySelector("canvas");
        if (canvas) {
          setCanva(canvas as HTMLCanvasElement);
          console.log("SET CANVA");
          setPromptType(em?.textContent!)
          const labelEl = wafElement?.shadowRoot.querySelector("div")?.textContent?.toLowerCase() || "";
          console.log({ labelEl })
          clearInterval(interval); // เจอแล้วหยุด
        } else {
          console.log("⏳ Canvas not found in shadowRoot");
        }
      } else {
        console.log("⏳ awswaf-captcha element or shadowRoot not ready");
      }
    }, 300); // เช็คทุก 300ms

    return () => clearInterval(interval); // cleanup ตอน unmount
  }, [canva]);



  React.useEffect(() => {
    if (canva) {
      const images = splitCanvasInto9Images(canva)
      const prompt = "These are 9 image tiles from a CAPTCHA. Tell me which tiles (numbered 1-9, left to right, top to bottom) contain '" + promptType + "'. Respond with only tile numbers as array."

      // askGeminiWithVision(images, prompt).then((indices) => {
      //   console.log("🤖 GPT returned indices:", indices)
      //   autoClickTiles(indices)
      // })
    }
  }, [canva])

  async function callInferenceAPI(base64Image: string) {
    const response = await fetch('/api/hf-infer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Image }),
    });
    const data = await response.json();
    console.log('Inference result:', data);
    return data;
  }
  return (
    <>
      <div className="min-h-screen p-4">
        <div ref={captchaRef} />

        {document.getElementsByTagName("awswaf-captcha")[0] ? "TRUE" : "FALSE"}

      </div>
    </>
  )
}

export default page