"use client"

import React, { useEffect } from 'react'
import MCQ from './Questions/MCQ';
import OpenEndedQuestions from './Questions/OpenEndedQuestions';
import QuantitativeQuestions from './Questions/QuantitativeQuestions';
import ReadingCompehension from './Questions/ReadingComprehension';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import AnalyticalWriting from './Questions/AnalyticalWriting';
import { useTimer } from '@/providers/TimerContext';
import { useRouter } from 'next/navigation';

const AllQuestions = ({questions}) => {

  const router = useRouter();

    const {currentQuestion,setCurrentQuestion,currentSection,setCurrentSection,nextQuestion} = useCurrentQuestion();
    console.log("question",currentQuestion);
    console.log(questions);
    

    const NextQuestion = () => {
      if(currentSection==="QuantativeReasoning2" && currentQuestion === 19) {
        setCurrentSection('AnalyticalWriting');
        setCurrentQuestion(0);
        router.push("/submission")
        return
      }
        currentQuestion < questions.length - 1 ? setCurrentQuestion(currentQuestion + 1) : router.push("/timepause")
    };

  return <>
    {questions.map((question, index) => {
        if (index === currentQuestion) {
          if (question.type === "Multiple Choice") {
            return <MCQ key={index} question={question} NextQuestion={NextQuestion} />;
          } else if (question.type === "Blank" || question.type === "input") {
            return <OpenEndedQuestions key={index} question={question} NextQuestion={NextQuestion} />;
          } else if (question.type === "Quantitative") {
            return <QuantitativeQuestions key={index} question={question} NextQuestion={NextQuestion}  />;
          } else if (question.type === "Reading Comprehension") {
            return <ReadingCompehension key={index} question={question} NextQuestion={NextQuestion}  />;
          } else if (question.type === "Analytical Writing") {
            return <AnalyticalWriting key={index} question={question} NextQuestion={NextQuestion}  />;
          }
        }

        return null; // Return null for unsupported question types
      })}
  </>
}

export default AllQuestions