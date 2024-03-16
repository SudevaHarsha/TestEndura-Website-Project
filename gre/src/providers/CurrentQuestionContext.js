"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';

const CurrentQuestionContext = createContext();

export const CurrentQuestionProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentSection, setCurrentSection] = useState('AnalyticalWriting');
  const [instructions,setInstructions] = useState(0);

  // Load the currentQuestion state from local storage, default to 0 if not available
  /* useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedQuestion = window.localStorage.getItem('currentQuestion');
      if (storedQuestion) {
        setCurrentQuestionState(JSON.parse(storedQuestion));
      }
    }
  }, []);

  // Update the currentQuestion state and store it in local storage
  const setCurrentQuestion = (question) => {
    setCurrentQuestionState(question);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('currentQuestion', JSON.stringify(question));
    }
  }; */

  console.log(currentSection,currentQuestion);

  const nextQuestion = ({ length }) => {
    setCurrentQuestion((prevIndex) =>
      prevIndex < length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const value = {
    currentQuestion,
    setCurrentQuestion,
    nextQuestion,
    currentSection,
    setCurrentSection,
    instructions,setInstructions
  };

  return <CurrentQuestionContext.Provider value={value}>{children}</CurrentQuestionContext.Provider>;
};

export const useCurrentQuestion = () => {
  const {currentQuestion,setCurrentQuestion,currentSection,setCurrentSection,instructions,setInstructions} = useContext(CurrentQuestionContext);

  return {currentQuestion,setCurrentQuestion,currentSection,setCurrentSection,instructions,setInstructions}
};
