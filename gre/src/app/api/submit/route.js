// pages/api/evaluate-quiz.js

import { NextResponse } from 'next/server';
import { db } from "@/lib/db";

export async function POST(req, res) {

  const { sessionId } = await req.json();

  try {
    // Fetch questions for the given test session
    console.log(sessionId);
    const testSession = await db.testSession.findUnique({
        where: {
          id: sessionId,
        },
        include: {
          test: {
            include: {
              Questions: {
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

      const correctAnswer = question.select ? question.correctSentence :question.correctAnswer || [];
      const isCorrect = question.select ? correctAnswer === userAnswer : arraysEqual(userAnswer, correctAnswer);
      results.push(isCorrect);
    }

    console.log(results);

    return new NextResponse(200, { results });
  } catch (error) {
    console.error('Error evaluating quiz:', error);
    return new NextResponse(500);
  }
}

// Utility function to check if two arrays are equal
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  arr1=arr1.sort();
  arr2=arr2.sort();
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
