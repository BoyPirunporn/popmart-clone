"use client"
import React, { useState } from 'react'
declare global {
  interface Window {
    AwsWafCaptcha: any
  }
}
const page = () => {
  const captchaRef = React.useRef<HTMLDivElement>(null)
  const [canva, setCanva] = useState<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (!window.AwsWafCaptcha || !captchaRef.current) return
    window.AwsWafCaptcha.renderCaptcha(captchaRef.current, {
      apiKey: process.env.NEXT_PUBLIC_AWS_CAPTCHA_KEY!, // ใส่ใน .env
      onSuccess: (token: any) => {
        console.log('CAPTCHA success:', token)
        // ส่ง token ไป backend เพื่อ verify
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
        const canvas = wafElement.shadowRoot.querySelector("canvas");
        if (canvas) {
          setCanva(canvas as HTMLCanvasElement);
          console.log("SET CANVA");
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
      const ctx = canva.getContext("2d");
      const tileSize = canva.width / 3;
      const images = [];

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const tileCanvas = document.createElement('canvas');
          tileCanvas.width = tileSize;
          tileCanvas.height = tileSize;
          const tileCtx = tileCanvas.getContext('2d');

          tileCtx!.drawImage(
            canva,
            col * tileSize,
            row * tileSize,
            tileSize,
            tileSize,
            0,
            0,
            tileSize,
            tileSize
          );

          const base64 = tileCanvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
          images.push(base64);
        }
      }

      images.forEach(image => {
        callInferenceAPI(image)
      })
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