export function splitCanvasInto9Images(canvas: HTMLCanvasElement): string[] {
    const ctx = canvas.getContext("2d")!
    const tileW = canvas.width / 3
    const tileH = canvas.height / 3
    const images: string[] = []

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const tileCanvas = document.createElement("canvas")
            tileCanvas.width = tileW
            tileCanvas.height = tileH
            const tileCtx = tileCanvas.getContext("2d")!
            tileCtx.drawImage(canvas, col * tileW, row * tileH, tileW, tileH, 0, 0, tileW, tileH)
            images.push(tileCanvas.toDataURL("image/png"))
        }
    }

    return images
}

export function autoClickTiles(indices: number[]) {
    const wafElement = document.getElementsByTagName("awswaf-captcha")[0];
    if (!wafElement?.shadowRoot) return;

    const canvas = wafElement.shadowRoot.querySelector("canvas");
    if (!canvas) return;

    const buttons = canvas.querySelectorAll("button");
    indices.forEach((i) => {
        const btn = buttons[i];
        if (btn) {
            (btn as HTMLButtonElement).click();
            console.log(`Clicked tile #${i + 1}`);
        }
    });
}

export async function askGPTWithVision(images: string[], prompt: string): Promise<number[]> {
    const messages = [
        {
            role: "user",
            content: [
                { type: "text", text: prompt },
                ...images.map((img) => ({
                    type: "image_url",
                    image_url: { url: img },
                })),
            ],
        },
    ]

    console.log({ messages })

    const url = process.env.NEXT_PUBLIC_OPENAI_API_URL!,
        apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY!
    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            store: true,
            messages
        }),
    })

    const json = await res.json()
    const text: string = json.choices?.[0]?.message?.content || ""

    console.log("📨 GPT Response:", text)

    // ดึง index [1-9] จากข้อความ (แม้ตอบเป็น "Tiles 1, 4, 5")
    const indices = Array.from(text.matchAll(/\b([1-9])\b/g)).map((m) => parseInt(m[1]) - 1)
    return indices

}

export async function askGeminiWithVision(images: string[], prompt: string): Promise<number[]> {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    console.log({ prompt: prompt.replace("the ", "") })
    const contents = [
        {
            parts: [
                { text: prompt },
                ...images.map((img) => ({
                    inlineData: {
                        mimeType: "image/png", // หรือ "image/jpeg" ตามชนิด
                        data: img.replace(/^data:image\/(png|jpeg);base64,/, ""), // ตัด prefix base64
                    },
                })),
            ],
        },
    ];

    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
    });

    const json = await res.json();
    const text: string = json.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("📨 Gemini Response:", text);

    // ดึง index [1-9] จากข้อความ เช่น "Tiles 1, 4, 5"
    const indices = Array.from(text.matchAll(/\b([1-9])\b/g)).map((m) => parseInt(m[1]) - 1);
    return indices;
}
