"use client"

import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useCurrentSession } from '@/providers/CurrentSessionContext';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button';

const RemainingCards = ({ filteredSessions }) => {
  const router = useRouter();
  const { currentSession, setCurrentSession } = useCurrentSession();
  const { setCurrentQuestion, setCurrentSection, setResume } = useCurrentQuestion();

  const handleResumeClick = (index) => {
    setCurrentSession(filteredSessions[index]);
    setCurrentQuestion(filteredSessions[index].currentQuestion - 1)
    console.log(filteredSessions[index].id)
    setCurrentSection(filteredSessions[index].currentSection)
    setResume(true);
    router.push(`/mock-tests/resume-test/${filteredSessions[index].id}`)
  }

  const generatePersonalizedMessage = (sessionRemained) => {
    const { currentSection, currentQuestion, test } = sessionRemained;

    // Example personalized messages based on different criteria
    if (currentQuestion < 5) {
      return `You're just getting started with ${currentSection}. Keep going!`;
    } else if (currentQuestion >= 5 && currentQuestion < 10) {
      return `You're making good progress in ${currentSection}. Keep it up!`;
    } else if (currentQuestion >= 10 && currentQuestion < 15) {
      return `You're doing great in ${currentSection}. Almost there!`;
    } else if (currentQuestion >= 15 && currentQuestion < 20) {
      return `You're almost finished with ${currentSection}. Finish strong!`;
    } else {
      return `You've completed ${currentSection}. Well done!`;
    }
  };

  return (
    <div className='flex w-full flex-wrap gap-9 items-center justify-center mt-7'>
      {filteredSessions.slice(-4).map((sessionRemained, index) => {
        const progress = (sessionRemained.currentQuestion / 20) * 100; // Assuming totalQuestions is defined somewhere
        const personalizedMessage = generatePersonalizedMessage(sessionRemained); // Function to generate personalized message
        return (
          <div key={index} onClick={() => handleResumeClick(index)}>
            <div className={`w-[600px] h-60 rounded-lg p-6 flex justify-between text-white bg-green-200 shadow-lg mx-4 mb-8 overflow-hidden transition-all duration-300 transform hover:scale-102 hover:translate-y-[10px] hover:translate-x-[5px] hover:shadow-2xl hover:shadow-black/60`}>
              <div className='pl-5 my-auto w-full'>
                <div className='flex justify-between items-center mt-2 mb-4'>
                  <h2 className="text-2xl mt-0 font-bold text-black">{sessionRemained.test.name}</h2>
                  <span className="bg-black text-white px-2 py-1 rounded-md text-xs">Graded by Accuracy</span>
                </div>
                {/* <h2 className='text-black'>Hey champ you are at <span className='text-strong font-bold'>{sessionRemained.currentSection}</span> ace it</h2> */}

                <div className="flex items-center mt-4">
                  <div className="w-full h-3 bg-gray-300 rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                  <span className="ml-2 text-xs text-gray-500">{progress.toFixed(0)}% completed</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{personalizedMessage}</p>
                <div className="flex items-center justify-center gap-7 mt-6">
                  <Button className='w-36' >Resume Test</Button>
                </div>
              </div>
              <div className="text-center flex justify-end items-center">
                {/* Add additional visuals or animations here */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RemainingCards;
