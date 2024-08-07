import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "document_text.txt");

export async function POST(req) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const data = await req.json();
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: content }, ...data],
      model: "gpt-4o-mini",
    });

    return NextResponse.json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
