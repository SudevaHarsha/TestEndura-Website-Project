// pages/api/questions.js

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const {
    testId,
    typeId,
    questionText,
    prompt,
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
    correctSentence,
    numerator,
    denominator,
    units,
    correctNumeric,
    description,
    ImageUrl,
    optionType
  } = await req.json();
  try {
    console.log(
      testId,
      typeId,
      questionText,
      prompt,
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
      correctSentence,
      numerator,
      denominator,
      units,
      correctNumeric,
      description,
      ImageUrl,
      optionType
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
      "AnalyticalWriting"
    ) {
      const sentences = paragraph.split(". ");
      const index = sentences.find((sentence, index) => {
        if (sentence === correctAnswer) return index;
      });
      const newQuestion = await db.analyticalWritingQuestion.create({
        data: {
          testId,
          typeId,
          questionText,
          correctAnswer,
          questionText,
          section,
          description,
          prompt,
        },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "Reading Comprehension"
    ) {
      const sentences = paragraph.split(". ");
      const index = sentences.find((sentence, index) => {
        if (sentence === correctAnswer) return index;
      });
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
          description,
          paragraph,
          highlightedSentence,
        },
      });
    }
    if (questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "MultipleAnswerQuestion" || questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "TextCompletion") {
      const newQuestion = await db.multipleAnswerQuestion.create({
        data: {
          testId,
          typeId,
          questionText,
          options,
          correctAnswer,
          blankType,
          section,
          description,
          numberOfBlanks,
          blankOptions,
          numerator:parseInt(numerator),
          denominator:parseInt(denominator),
          units,
          correctNumeric: parseInt(correctNumeric)
        },
      });
    }
    if (questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "DataInterpretation" || questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "TextCompletion") {
      const newQuestion = await db.DataInterpretationQuestion.create({
        data: {
          testId,
          typeId,
          questionText,
          options,
          correctAnswer,
          optionType,
          section,
          description,
          images: ImageUrl,
          numerator:parseInt(numerator),
          denominator:parseInt(denominator),
          units,
          correctNumeric: parseInt(correctNumeric)
        },
      });
    }
    if (questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "MCQ") {
      console.log(ImageUrl[0]);
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
          ImageUrl : ImageUrl[0],
          description,
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
          description,
          Quantity1,
          Quantity2,
          image,
          ImageUrl1: ImageUrl[0],
          ImageUrl2: ImageUrl[1]
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
