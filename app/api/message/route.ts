import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const messages = await client.db("database").collection("messages").find().toArray();
    return NextResponse.json({ messages }, { status: 200 });
  } catch (e) {
    console.error(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const { message } = await req.json();

    await client.db("database").collection("messages").insertOne({ ...message });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error(e);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const client = await clientPromise;
    const { messageID } = await req.json();

    await client.db("database").collection("messages").deleteOne({ messageID });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error(e);
  }
}
