import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { key, action } = await req.json();

    // Handle audio file request
    if (action === "get_audio") {
      try {
        // Path to audio file in public directory
        const audioFilePath = path.join(process.cwd(), "public", "Hidden.wav");
        const audioData = fs.readFileSync(audioFilePath);

        // Convert to base64 for JSON response
        const audioBase64 = audioData.toString("base64");

        return NextResponse.json({
          message: "Audio file retrieved successfully",
          audioData: audioBase64,
          mimeType: "audio/wav",
        });
      } catch (err) {
        console.error("Could not find Hidden.wav file:", err);
        return NextResponse.json(
          { message: "Audio file not found" },
          { status: 404 }
        );
      }
    }

    // Handle password validation (your existing logic)
    if (!key || typeof key !== "string") {
      return NextResponse.json(
        { message: "Invalid request format." },
        { status: 400 }
      );
    }

    const CORRECT_PASSWORD = process.env.CORRECT_KEY;

    if (!CORRECT_PASSWORD) {
      throw new Error(
        "CORRECT_PASSWORD is not defined in environment variables"
      );
    }

    if (key === CORRECT_PASSWORD) {
      const flag = process.env.FLAG || "hackemon{test_flag_if_env_is_not_set}";
      return NextResponse.json({
        message: `Correct. The final truth: ${flag}`,
      });
    } else {
      return NextResponse.json(
        { message: "Incorrect. The silence is unbroken." },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "System Malfunction." },
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests for audio file
export async function GET() {
  try {
    const audioFilePath = path.join(process.cwd(), "public", "Hidden.wav");
    const audioData = fs.readFileSync(audioFilePath);

    return new NextResponse(audioData, {
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": audioData.length.toString(),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Audio file not found" },
      { status: 404 }
    );
  }
}
