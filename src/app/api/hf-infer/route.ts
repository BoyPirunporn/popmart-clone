// ตัวอย่าง Next.js API route: /pages/api/hf-infer.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

const HUGGINGFACE_API_TOKEN = process.env.HF_API_TOKEN;  // ใส่ token ใน .env.local

export const POST = async (req: NextRequest) => {
    const { base64Image } = await req.json(); // base64 ของรูปภาพ (แบบ 'data:image/png;base64,...' หรือแค่ส่วนหลัง)

    if (!base64Image) {
        return NextResponse.json({ error: 'base64Image is required' }, {
            status: 400
        });
    }

    try {
        const body = {
            inputs: base64Image.startsWith('data:')
                ? base64Image
                : `data:image/png;base64,${base64Image}`,
        };

        const response = await fetch('https://api-inference.huggingface.co/models/google/vit-base-patch16-224', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json({ error: 'base64Image is required' }, {
                status: error.status
            });
        }

        const result = await response.json();

        // ตัวอย่างผลลัพธ์จะเป็น array ของ label กับ confidence
        return NextResponse.json(result, {
            status: 200
        });

    } catch (error) {
        return NextResponse.json({ error: 'Internal server error', details: error }, {
            status: 500
        });
    }
}

export const GET = () => {
    return NextResponse.json({ "SUCCESS": "TRUE" })
}