"use client"

import questions from '@/data/Questions';
import React, { useEffect, useRef, useState } from 'react';
import AllQuestions from '../AllQuestions';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import QuestionsNav from './QuestionsNav';
import Timeout from '../TimeOut';
import { useRouter } from 'next/navigation';

const SectionWiseQuestions = ({test,testSession}) => {

    const router = useRouter();

    const { currentQuestion, setCurrentQuestion, currentSection, setCurrentSection, nextQuestion } = useCurrentQuestion();
    console.log("question", currentQuestion);

   /*  const cquestions = questions[currentSection];
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

    return (
        <>
            <QuestionsNav questionLength={questions[currentSection].length} testSession={testSession} test={test}/>
            <AllQuestions questions={questions[currentSection]} />
            {/* <Timeout handleNextSection={handleNextSection} /> */}
        </>
    );
};

export default SectionWiseQuestions;
