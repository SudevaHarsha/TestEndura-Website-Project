"use client"

/* import questions from '@/data/Questions'; */
import React, { useEffect, useRef, useState } from 'react';
import AllQuestions from '../AllQuestions';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import QuestionsNav from './QuestionsNav';
import Timeout from '../TimeOut';
import { useRouter } from 'next/navigation';
import { useCurrentSession } from '@/providers/CurrentSessionContext';
import axios from 'axios';

const SectionWiseQuestions = ({test,testSession,questions}) => {

    const router = useRouter();

    const {currentSession,setCurrentSession} = useCurrentSession();
    const { currentQuestion, setCurrentQuestion, currentSection, setCurrentSection, nextQuestion } = useCurrentQuestion();
    console.log("question", currentQuestion);
    console.log(currentSection)

/*     setCurrentSession(testSession);
 */   /*  const cquestions = questions[currentSection];
    console.log(cquestions); */
/*     const handleNextSection = () => {
        const sectionKeys = Object.keys(questions);
        const currentIndex = sectionKeys.indexOf(currentSection);
        if (currentIndex < sectionKeys.length - 1) {
            setCurrentSection(sectionKeys[currentIndex + 1]);
            setCurrentQuestion(0);
        } else {
            console.log('Quiz finished');
            // You can handle quiz completion here
        }
    }; */

    /* useEffect(()=>{
        const fetchedQuestions = axios.post("/api/divide-questions",{testId:test.id})
        console.log(fetchedQuestions);
    },[]) */
    console.log(questions)

    return (
        <>
            <QuestionsNav questionLength={questions[currentSection].length} testSession={testSession} test={test}/>
            <AllQuestions questions={questions[currentSection]} testSession={testSession}/>
            {/* <Timeout handleNextSection={handleNextSection} /> */}
        </>
    );
};

export default SectionWiseQuestions;
