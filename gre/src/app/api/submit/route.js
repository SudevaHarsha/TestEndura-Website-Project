// pages/api/evaluate-quiz.js

import { NextResponse } from 'next/server';
import { db } from "@/lib/db";
import { data } from 'autoprefixer';

export async function POST(req, res) {

  const { sessionId } = await req.json();

  try {
    // Fetch questions for the given test session
    console.log(sessionId);
    const testSession = await db.testSession.update({
        where: {
          id: sessionId,
        },
        data: {
          finished: true
        },
        include: {
          test: {
            include: {
              Questions: {
                include: {
                  questionType: true,
                }
              },
              analyticalWritingQuestions: {
                include: {
                  questionType: true,
                }
              },
              quantitativeQuestions: {
                include: {
                  questionType: true,
                }
              },
              readingComprehensionQuestions: {
                include: {
                  questionType: true,
                }
              },
              multipleAnswerQuestions: {
                include: {
                  questionType: true,
                }
              },
              multipleChoiceQuestions: {
                include: {
                  questionType: true,
                }
              },
            },
          },
        },
      });

      console.log(testSession);

    if (!testSession) {
      return new NextResponse(404);
    }

    const questions = [
      ...testSession.test.Questions,
      ...testSession.test.analyticalWritingQuestions,
      ...testSession.test.quantitativeQuestions,
      ...testSession.test.readingComprehensionQuestions,
      ...testSession.test.multipleAnswerQuestions,
      ...testSession.test.multipleChoiceQuestions,
    ];

    const sections = testSession.test.sections.reduce((acc, section) => {
      const sectionQuestions = questions.filter(
        (question) => question.section === section
      );
      acc[section] = sectionQuestions;
      return acc;
    }, {});

/*     let AllQuestions = [];
 */
    const AllQuestions = testSession.test.sections.reduce((acc, section) => {
      return acc.concat([...sections[section]])
    },[]);

    console.log("ALL",AllQuestions)

    // Evaluate the answers and store results in an array
    const results = [];
    console.log(testSession.sessionAnswers);
    for (const [questionId, userAnswer] of Object.entries(testSession.sessionAnswers)) {
      const question = AllQuestions[questionId];
      console.log(questionId,question);
      if (!question) {
        return new NextResponse(500);
      }

      const correctAnswer = question?.select ? question?.correctSentence :question.correctAnswer || [];
      let isCorrect = question?.select ? correctAnswer === userAnswer[0] : arraysEqual(userAnswer.sort(), correctAnswer.sort());
      if(question.blankType === 'fraction' && question?.denominator >0) {
        console.log(userAnswer[0])
        console.log(userAnswer[1])
        let isNumerator = userAnswer[0] === question?.numerator
        let isDenominator = userAnswer[1] === question?.denominator
        console.log(isDenominator,isNumerator)
        isCorrect = isNumerator && isDenominator;
      }
      if(question.blankType === 'numeric units') {
        console.log(userAnswer[0])
        console.log(userAnswer[1])
        let isNumeric = userAnswer[0] === question?.correctNumeric
        let isUnits = userAnswer[1] === question?.units
        console.log(isNumeric,isUnits)
        isCorrect = isNumeric && isUnits;
      }
      if(question.blankType === 'numeric' && question?.correctNumeric > 0) {
        console.log(userAnswer[0])
        let isNumeric = userAnswer[0] === question?.correctNumeric
        console.log(isNumeric);
        isCorrect = isNumeric;
      }
      if(question?.select === true) {
        console.log(userAnswer[0],question?.correctSentence)
        const isSentence = question.correctSentence.includes(userAnswer[0]);
        console.log(isSentence);
        isCorrect = isSentence;
      }
      results.push(isCorrect);
    }

    console.log(results);

    const resultSession = await db.testSession.update({
      where: {
        id: sessionId
      },
      data: {
        results: results
      }
    });

    return new NextResponse(200, { results });
  } catch (error) {
    console.error('Error evaluating quiz:', error);
    return new NextResponse(500);
  }
}

// Utility function to check if two arrays are equal
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
