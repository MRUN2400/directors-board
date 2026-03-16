import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Project } from "@/models/Project";

export async function GET() {
  try {
    await connectDB();
    const project = await Project.findOne({ name: "DIRECTOR_MAIN_BOARD" });
    return NextResponse.json(project || { scenes: [] });
  } catch (error: any) {
    return NextResponse.json({ error: "Database Load Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Use 'upsert' to create it if it doesn't exist, or update if it does
    const updated = await Project.findOneAndUpdate(
      { name: "DIRECTOR_MAIN_BOARD" },
      { 
        scenes: body.scenes, 
        updatedAt: new Date() 
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}