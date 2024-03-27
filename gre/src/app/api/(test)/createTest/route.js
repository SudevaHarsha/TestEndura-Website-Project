import { db } from "@/lib/db";

const { NextResponse } = require("next/server");
const { PrismaClient } = require("@prisma/client");

export async function GET(req, res) {
  try {
    const tests = await db.test.findMany();
    return new NextResponse(JSON.stringify(tests));
  } catch (error) {
    console.error("Error fetching tests:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    const { name, description, durations, sections } = await req.json();

    console.log(req.body.name);

    const newTest = await db.test.create({
      data: {
        name,
        description,
        sections,
        overallDuration: "120",
        sectionDuration: durations
      }
    });

    return new NextResponse(JSON.stringify(newTest), { status: 201 });
  } catch (error) {
    console.error("Error creating test:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
