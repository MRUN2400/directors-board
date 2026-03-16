import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    // 1. Find the user in MongoDB
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "Credential ID not found" }, { status: 401 });
    }

    // 2. Compare the typed password with the hashed one in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid Access Key" }, { status: 401 });
    }

    // 3. If everything is correct
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}