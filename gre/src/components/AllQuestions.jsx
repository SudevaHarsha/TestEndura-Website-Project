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
import axios from 'axios';
import { useCurrentSession } from '@/providers/CurrentSessionContext';

const AllQuestions = ({ questions, testSession }) => {

  const router = useRouter();

  const { currentQuestion, setCurrentQuestion, currentSection, setCurrentSection, nextQuestion, selectedChoices, setSelectedChoices } = useCurrentQuestion();
  console.log("question", currentQuestion);
  const { currentSession, setCurrentSession } = useCurrentSession();
  console.log(questions);

  const currentDate = new Date();
  const handleNext = async () => {
    /* const sectionEndTimes = [...testSession.sectionEndTimes,currentDate]
    const updatedTestSession = await db.testSession.update({
      where: {
        id: testSession.id,
      },
      data: {
        sectionEndTimes: sectionEndTimes,
      },
    }); */
    StoreQuestion();
    let converteedAnswers;
    if (typeof currentSession.sessionAnswers === 'string' && (data.startsWith('{') || data.startsWith('['))) {
      converteedAnswers = JsonToArray();
    }
    const updatedTestSession = handleUpdateTimes();
    console.log(updatedTestSession);
    router.push(`/timepause/${currentSession.id}`)
    setSelectedChoices([])
  }

  const handleUpdateTimes = async () =>{
    const updatedSessionAnswers = JsonToArray();
    const updatedTestSession = await axios.patch(`/api/updateSectionEndTimes/${currentSession.id}`, { sessionAnswers: [...updatedSessionAnswers, selectedChoices], currentSection: currentSection })

    return updatedTestSession;
  }

  const handleSubmit = async () => {
    /* const updatedTestSession = await axios.patch(`/api/updateSectionEndTimes/${currentSession.id}`, { sessionAnswers: [...currentSession.sessionAnswers, selectedChoices] }); */
    handleUpdateTimes();
    const results = await axios.post("/api/submit", { sessionId: currentSession.id });

    console.log("frontend", results)
  }

  const JsonToArray = () => {
    if (currentSession.sessionAnswers && !Array.isArray(currentSession?.sessionAnswers)) {
      const arrayOfValues = Object.values(currentSession.sessionAnswers);

      return arrayOfValues;
    }
    return currentSession.sessionAnswers;
  }

  const StoreQuestion = () => {
    console.log(currentSession);
    setCurrentQuestion(currentQuestion + 1);
    currentSession.sessionAnswers && setCurrentSession((prevSession) => {
      const updatedSession = { ...prevSession };
      console.log("up", updatedSession.sessionAnswers)
      const prevAnswers = Array.isArray(updatedSession?.sessionAnswers) ? updatedSession.sessionAnswers : Object.values(updatedSession.sessionAnswers);
      // Merge the newly selected choices with the existing sessionAnswers
      updatedSession.sessionAnswers = [...prevAnswers, selectedChoices];
      return updatedSession;
    });
/*     setCurrentSession([...currentSession.sessionAnswers, selectedChoices])
 */    setSelectedChoices([]);
  }

  const NextQuestion = () => {
    if (currentSection === "QuantativeReasoning2") {
      console.log("entered");
      setCurrentSection('VerbalReasoning1');
      setCurrentQuestion(0);
      handleSubmit();
      router.push("/submission")
      return
    }
    currentQuestion < questions.length - 1 ? StoreQuestion() : handleNext()
  };

  return <>
    {questions.map((question, index) => {
      console.log(question, index)
      if (index === currentQuestion) {
        console.log(question.questionType.type);
        if (question.questionType.type === "MCQ") {
          console.log('MCQ');
          return <MCQ key={index} question={question} NextQuestion={NextQuestion} />;
        } else if (question.questionType.type === "Blank" || question.type === "input") {
          return <OpenEndedQuestions key={index} question={question} NextQuestion={NextQuestion} />;
        } else if (question.questionType.type === "Quantitative") {
          return <QuantitativeQuestions key={index} question={question} NextQuestion={NextQuestion} />;
        } else if (question.questionType.type === "Reading Comprehension") {
          return <ReadingCompehension key={index} question={question} NextQuestion={NextQuestion} />;
        } else if (question.questionType.type === "Analytical Writing") {
          return <AnalyticalWriting key={index} question={question} NextQuestion={NextQuestion} />;
        }
      }

      return null; // Return null for unsupported question types
    })}
  </>
}

export default AllQuestions