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
    blankOptions,
    paragraph,
    highlightedSentence,
    Quantity1,
    Quantity2,
    correctSentence
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
      blankOptions,
      paragraph,
      highlightedSentence,
      Quantity2,
      correctSentence
    );
    /*   const newQuestion = await db.question.create({
      data: {
        testId,
        typeId,
        questionText,
        options,
        option: parseInt(correctAnswer.length),
        correctAnswer,
        image,
        select,
        blankType,
        highlighted,
        section,
        numberOfBlanks,
      blankOptions,
      paragraph,
      highlightedSentence
      },
    }); */
    let newQuestion = {};
    const questionTypes = await db.questionType.findMany();

    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "Reading Comprehension"
    ) {
      const sentences = paragraph.split(". ");
      const index = sentences.find((sentence,index) => {
        if(sentence===correctAnswer) return index
      })
      const newQuestion = await db.readingComprehensionQuestion.create({
        data: {
          testId,
          typeId,
          questionText,
          options,
          option: parseInt(correctAnswer.length),
          correctAnswer: correctAnswer,
          correctSentence: [correctSentence],
          select,
          highlighted,
          section,
          paragraph,
          highlightedSentence,
        },
      });
    }
    if (questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "Blank") {
      const newQuestion = await db.multipleAnswerQuestion.create({
        data: {
          testId,
          typeId,
          questionText,
          options,
          option: parseInt(correctAnswer.length),
          correctAnswer,
          blankType,
          section,
          numberOfBlanks,
          blankOptions,
        },
      });
    }
    if (questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "MCQ") {
      const newQuestion = await db.multipleChoiceQuestion.create({
        data: {
          testId,
          typeId,
          questionText,
          options,
          option: parseInt(correctAnswer.length),
          correctAnswer,
          image,
          section,
        },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "Quantitative"
    ) {
      const newQuestion = await db.quantitativeQuestion.create({
        data: {
          testId,
          typeId,
          questionText,
          options,
          option: parseInt(correctAnswer.length),
          correctAnswer,
          section,
          Quantity1,
          Quantity2,
        },
      });
    }

    console.log(newQuestion);
    return new NextResponse(201, newQuestion);
  } catch (error) {
    console.log(error);
    return new NextResponse(500, { error: "Could not create question" });
  }
}
