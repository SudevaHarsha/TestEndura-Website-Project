// pages/api/questions.js

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const {
    testId,
    typeId,
    questionText,
    numberOfOptions,
    options,
    correctAnswer,
    image,
    select,
    blankType,
    highlighted,
    section,
    numberOfBlanks, 
    blankOptions
  } = await req.json();
  try {
    console.log(
      testId,
      typeId,
      questionText,
      numberOfOptions,
      options,
      correctAnswer,
      image,
      select,
      blankType,
      highlighted,
      section,
      numberOfBlanks,
    blankOptions
    );
    const newQuestion = await db.question.create({
      data: {
        testId,
        typeId,
        questionText,
        options,
        option: parseInt(numberOfOptions),
        correctAnswer,
        image,
        select,
        blankType,
        highlighted,
        section,
        numberOfBlanks,
      blankOptions
      },
    });
    console.log(newQuestion);
    return new NextResponse(201, newQuestion);
  } catch (error) {
    console.log(error);
    return new NextResponse(500, { error: "Could not create question" });
  }
}
