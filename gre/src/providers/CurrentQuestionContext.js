"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';

const CurrentQuestionContext = createContext();

export const CurrentQuestionProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestionState] = useState(0);

  // Load the currentQuestion state from local storage, default to 0 if not available
  useEffect(() => {
    if (typeof window !== 'undefined') {
/*       const storedQuestion = window.localStorage.getItem('currentQuestion');
      if (storedQuestion) {
        setCurrentQuestionState(JSON.parse(storedQuestion));
      } */
    }
  }, []);

  // Update the currentQuestion state and store it in local storage
  const setCurrentQuestion = (question) => {
    setCurrentQuestionState(question);
/*     if (typeof window !== 'undefined') {
      window.localStorage.setItem('currentQuestion', JSON.stringify(question));
    } */
  };

  const nextQuestion = ({ length }) => {
    setCurrentQuestion((prevIndex) =>
      prevIndex < length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const value = {
    currentQuestion,
    setCurrentQuestion,
    nextQuestion,
  };

  return <CurrentQuestionContext.Provider value={value}>{children}</CurrentQuestionContext.Provider>;
};

export const useCurrentQuestion = () => {
  const {currentQuestion,setCurrentQuestion} = useContext(CurrentQuestionContext);

  return {currentQuestion,setCurrentQuestion}
};
