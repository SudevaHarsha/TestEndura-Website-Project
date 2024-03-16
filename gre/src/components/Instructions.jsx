"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import questions from '@/data/Questions';

const Instructions = () => {

  const {instructions,setInstructions,setCurrentQuestion,currentSection,setCurrentSection,currentQuestion} = useCurrentQuestion();

  const router = useRouter();

  const handleClick = () =>{
    console.log("instructionsclicked");
    if(instructions===0){
      setInstructions(instructions+1);
      router.push("/insrtructions");
      return
    }
    setInstructions(instructions+1);
    if(currentSection==="AnalyticalWriting" && currentQuestion===0) {
      console.log("first");
      router.push("/mock-tests/65efaaa9089eca86da736740");
      return
    }
    const sectionKeys = Object.keys(questions);
    const currentIndex = sectionKeys.indexOf(currentSection);
    if (currentIndex < sectionKeys.length - 1) {
        setCurrentSection(sectionKeys[currentIndex + 1]);
        setCurrentQuestion(0);
        router.push("/mock-tests/65efaaa9089eca86da736740");
    } else {
        console.log('Quiz finished');
        setCurrentQuestion(0);
        setCurrentSection("AnalyticalWriting");
        router.push("/mock-tests")
        // You can handle quiz completion here
    }
  }

  const stmt = instructions === 0 ? "GRE MOCK TEST" :
  instructions === 1 ? "ANALYTICAL WRITING" :
  instructions === 2 ? "VERBAL REASONING-1" :
  instructions === 3 ? "VERBAL REASONING 2" :
  instructions === 4 ? "QUANTITATIVE ANALYSIS 1" :
  instructions === 5 ? "QUANTITATIVE ANALYSIS 2" : "";

  console.log(stmt);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">{stmt}</h1>

      <Card className="rounded-xl p-6">
        <CardHeader>
          <CardTitle>General Instructions</CardTitle>
        </CardHeader>
        <CardDescription>
          <ul className="list-disc pl-6">
            <li>Ensure you have a stable internet connection before starting the test.</li>
            <li>You will have a total of 3 hours to complete the test.</li>
            <li>There will be multiple-choice questions, reading comprehension passages, quantitative questions, and open-ended questions.</li>
            <li>Each question may have one or more correct answers.</li>
            <li>Do not refresh the page during the test, as it may lead to loss of progress.</li>
            <li>Once you start the test, the timer will begin, and it will not stop even if you leave the page.</li>
          </ul>
        </CardDescription>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">How to Answer Different Question Types</h2>

        <Card className="rounded-xl p-6">
          <CardHeader>
            <CardTitle>Multiple Choice Questions</CardTitle>
          </CardHeader>
          <CardDescription>
            <p>Select the correct option by clicking on the radio button next to it. You can choose only one answer.</p>
          </CardDescription>
        </Card>

        <Card className="mt-4 rounded-xl p-6">
          <CardHeader>
            <CardTitle>Reading Comprehension</CardTitle>
          </CardHeader>
          <CardDescription>
            <p>Read the passage carefully and answer the questions based on the information provided in the passage.</p>
            <p>Some questions may ask you to select specific sentences from the passage.</p>
          </CardDescription>
        </Card>

        {/* Add instructions for other question types here */}

      </div>

      <div className="mt-8">
          <Button onClick={handleClick} variant="primary" className="bg-strong text-white hover:bg-strong/80">Start Test</Button>
      </div>
    </div>
  );
};

export default Instructions;
