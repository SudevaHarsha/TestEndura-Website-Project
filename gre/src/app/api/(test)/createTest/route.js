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
    const { name, description, duration, sections } = req.body;

    console.log(req.body.name);

    const newTest = await db.test.create({
      data: {
        name:"test1",
        description:"gre",
        sections: ['AnalyticalWriting','VerbalReasoning1','VerbalReasoning2','QuantativeReasoning1','QuantativeReasoning2'],
        overallDuration:"120",
        sectionDuration:['20',"30","25","20","30"]
      }
    });

    return new NextResponse(JSON.stringify(newTest), { status: 201 });
  } catch (error) {
    console.error("Error creating test:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
