"use client"

import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useCurrentSession } from '@/providers/CurrentSessionContext';
import { useRouter } from 'next/navigation'
import React from 'react'



const RemainingCards = ({filteredSessions}) => {

  const router = useRouter();
  const {currentSession,setCurrentSession} = useCurrentSession();
  const {setCurrentQuestion,setCurrentSection} = useCurrentQuestion();

  const handleResumeClick = (index) =>{
    setCurrentSession(filteredSessions[index]);
    setCurrentQuestion(filteredSessions[index].currentQuestion)
    setCurrentSection(filteredSessions[index].currentSection)
    router.push(`/mock-tests/resume-test/${filteredSessions[index].id}`)
  }
    return (
        <div>{
            filteredSessions.map((sessionRemained,index) => {
              return <div key={index} onClick={()=>handleResumeClick(index)}>{JSON.stringify(sessionRemained)}</div>
            })
          }</div>
      )
}

export default RemainingCards