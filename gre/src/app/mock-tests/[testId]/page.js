"use server"

// pages/tests/[testId].js
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import Timer from "@/components/Timer";
import MCQ from "@/components/Questions/MCQ";
import ReadingCompehension from "@/components/Questions/ReadingComprehension";
import OpenEndedQuestions from "@/components/Questions/OpenEndedQuestions";
import QuantitativeQuestions from "@/components/Questions/QuantitativeQuestions";
import { Button } from "@/components/ui/button";
// Check the import statement
import { useCurrentQuestion } from "@/providers/CurrentQuestionContext.js";
import AllQuestions from "@/components/AllQuestions";
import QuestionsNav from "@/components/Questions/QuestionsNav";
import SectionWiseQuestions from "@/components/Questions/SectionWiseQuestions";
import questions from "@/data/Questions";

const TestPage = async ({ testId }) => {
  /* const questions = [
    {
      type: "Multiple Choice",
      option: "1",
      question: "What is the capital of France?",
      options: ["Madrid", "Paris", "Rome", "Berlin"],
      correctAnswer: "B",
      image:null,
    },
    {
      type: "Multiple Choice",
      option: "2",
      question: "Select the countries located in South America.",
      options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      correctAnswers: ["A", "D"],
      image:"/i6.gif",
    },
    {
      type: "Reading Comprehension",
      highlighted: false,
      select: false,
      highlightSentence: null,
      option: "",
      passage: "[Include a short passage]",
      question: "What is the main idea of the passage?",
      options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      image:"/i6.gif",
    },
    {
      type: "Reading Comprehension",
      highlighted: true,
      select: false,
      option: "1",
      highlightSentence:
        "In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries.",
      passage: "[Include a short passage with a highlighted sentence]",
      question: "What does the highlighted sentence suggest?",
      options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
    },
    {
      type: "Reading Comprehension",
      passage: "[Include a short passage]",
      highlighted: false,
      select: true,
      option: "2",
      highlightSentence: null,
      question: "What is gre",
      options: []
    },
    {
      type: "Blank",
      blankType: "",
      option: "1",
      sentence:
        "Complete the sentence: The __________ is the largest mammal on Earth.",
      options: ["Elephant", "Blue Whale", "Cheetah", "Giraffe"],
      correctAnswer: "B",
    },
    {
      type: "Blank",
      blankType: "",
      option: "2",
      sentence:
        "Fill in the blanks with the correct words: The four main seasons are spring, summer, __________, and winter.",
      options: ["Autumn", "Monsoon", "Fall", "Rainy"],
      correctAnswers: ["A", "D"],
    },
    {
      type: "input",
      blankType: "input",
      sentence:
        "Fill in the blank with the correct numerical value: The speed of light is approximately __________ kilometers per second.",
      blanks: ["country"],
    },
    {
      type: "Analytical Writing",
      blankType: "input",
      sentence:
        "Fill in the blank with the correct numerical value: The speed of light is approximately __________ kilometers per second.",
      blanks: ["country"],
    },
    {
      type: "Quantitative",
      question: "which is more",
      quantityA:
        "The area of a rectangle with length 8 units and width 5 units.",
      quantityB: "The area of a square with side length 6 units.",
      options: [
        "A is greater",
        "B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given",
      ],
      image:"/i6.gif"
    },
  ]; */

  /* const router = useRouter(); */
  /* const { testId } = router.query; */

  const profile = await currentProfile();

  /* const test = await db.test.findFirst({
    where: {
      testId: testId
    }
  });

  if(test) {
    console.log(test);
  }

  const testSession = await db.testSession.create({
    data: {
      profileId: profile.id, // Replace with actual user ID
      testId: test.id,
      duration:'30',
      startTime: new Date(),
      endTime: new Date(Date.now() + test.duration * 60000), // Add test duration in minutes
    },
  });

  if(!testSession) {
    console.log("error in test session creation");
  } */

  /* const NextClick = ()=>{
    
  } */

  /* let currentQuestion = 0; */

  return (
    <div className="w-full relative flex flex-col justify-center items-center">
{/*       <QuestionsNav questionLength={questions.length} />
 */}      {/* <h1>Test 1</h1>
      <p>An test on Gre</p> */}
      {/* <MCQ /> */}
      {/* <ReadingCompehension /> */}
      {/* <OpenEndedQuestions /> */}
      {/* <QuantitativeQuestions /> */}
      {/* <Timer duration={test.duration} /> */}
      
      <SectionWiseQuestions />
    </div>
  );
};

/* export async function getServerSideProps({ params }) {
  const { testId } = params;
  const test = await prisma.test.findUnique({
    where: {
      id: testId,
    },
  });
  return {
    props: {
      test,
    },
  };
} */

export default TestPage;
