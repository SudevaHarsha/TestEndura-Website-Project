"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCurrentSession } from './CurrentSessionContext';

const CurrentQuestionContext = createContext();

export const CurrentQuestionProvider = ({ children }) => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentSection, setCurrentSection] = useState('VerbalReasoning1');
  const [instructions,setInstructions] = useState(0);
  const [endTime,setEndTimeState] = useState(null);
  const [selectedChoices, setSelectedChoices] = useState([]);

  // Load the currentQuestion state from local storage, default to 0 if not available
/*   useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEndTime = window.localStorage.getItem('endTime');
      if (storedEndTime) {
        setEndTimeState(JSON.parse(storedEndTime));
      }
    }
  }, []); */

  // Update the endTime state and store it in local storage
  const setEndTime = (question) => {
    setEndTimeState(question);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('endTime', JSON.stringify(question));
    }
  };

  console.log(currentSection,currentQuestion,endTime);

  const nextQuestion = ({ length }) => {
    setCurrentQuestion((prevIndex) =>
      prevIndex < length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const value = {
    currentQuestion,
    setCurrentQuestion,
    currentSection,
    setCurrentSection,
    instructions,setInstructions,
    endTime,setEndTime,
    selectedChoices, setSelectedChoices
  };

  return <CurrentQuestionContext.Provider value={value}>{children}</CurrentQuestionContext.Provider>;
};

export const useCurrentQuestion = () => {
  const {currentQuestion,setCurrentQuestion,currentSection,setCurrentSection,instructions,setInstructions,endTime,setEndTime,selectedChoices, setSelectedChoices} = useContext(CurrentQuestionContext);

  return {currentQuestion,setCurrentQuestion,currentSection,setCurrentSection,instructions,setInstructions,endTime,setEndTime,selectedChoices, setSelectedChoices}
};