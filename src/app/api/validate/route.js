import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { key } = await req.json();

    if (!key || typeof key !== "string") {
      return NextResponse.json(
        { message: "Invalid request format." },
        { status: 400 }
      );
    }

    // ACTION: Replace this with the Base64 password you generated
    const CORRECT_PASSWORD =
      "Z1lRRRBYQxBUWFQRQ15FXlQAX1cRX15UEFlBXlQRU1xRQEBJXlYOZ1lRRRFJQxFFWFURQ15VXlURXlcQX19FEFhQXlQQU1xBQEFYXlYPZ1lBRBFYQhBEWVQAQ19EXlQQX1YAX19UEVhQXlQAU11QQEFZXlcfZ1lQRBBYQxFUWFURQ19FXlQAX1cRX19VEFhBXlURU1xRQEFJXlYOZ1lQRRBJQxFFWFURQ19VOgxFTw1FFk4MU0gVBgEACw0PFFAdBgZLdx8ABwAHHFRUCwlBAx8cAAMAX1YRX15VEFhBXlURUlxQQEBJXlYOZ1lRRBBJQxFFWFUQQ15VXlURXlYRX15FEFhQXlQQU1xBQEFYX1cOZllBRBFYQxBEWFQAQ15EX1QQXlcAX15UEFhRXlQAU11QQEFYX1cfZ1lQRBFYQhFUWFQRQl9EXlQAX1YRX15VEFhBXlURU1xRQUFJXlYOZ1lQRBBJQxFFWFUQQ15VXlURXlYQX15FEFlQX1QQU1xBQEFYXlYPZ1lBRBFYQxFFWVUAQ15EXlQRXlc=";

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
    return NextResponse.json(
      { message: "System Malfunction." },
      { status: 500 }
    );
  }
}
