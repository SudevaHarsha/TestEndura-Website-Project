'use client'

import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from "axios";
import AllQuestions from './AllQuestions';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useCurrentSession } from '@/providers/CurrentSessionContext';

import MCQ from './Questions/MCQ';
import OpenEndedQuestions from './Questions/OpenEndedQuestions';
import QuantitativeQuestions from './Questions/QuantitativeQuestions';
import ReadingCompehension from './Questions/ReadingComprehension';
import AnalyticalWriting from './Questions/AnalyticalWriting';
import { Button } from './ui/button';

const ResultsPage = () => {
  // Sample data for available tests
  const [resultSessions, setResultSessions] = useState([]);
  const [currentResultQuestion, setCurrentResultQuestion] = useState(0);
  const [testId, setTestId] = useState(null);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/finished-tests");
        const tests = await axios.get("/api/find-test");
        setResultSessions(response.data.results);
        setTests(tests.data.tests)

        console.log("Result Session", response.data.results);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);


  const availableTests = [
    { id: 1, name: 'Test 1' },
    { id: 2, name: 'Test 2' },
    { id: 3, name: 'Test 3' },
    // Add more test data as needed
  ];

  // Sample data for default test results
  const defaultResults = [
    { id: 1, testName: 'Test 1', result: 'Your result for Test 1' },
    { id: 2, testName: 'Test 2', result: 'Your result for Test 2' },
    // Add more default result data as needed
  ];

  // State to track the selected test result for detailed view
  const [selectedResult, setSelectedResult] = useState(null);

  const { currentSection, currentQuestion, setCurrentQuestion, setCurrentSection, setResult, result } = useCurrentQuestion();
  const { setCurrentSession, currentSession } = useCurrentSession();

  /* const [questions, setQuestions] = useState([]); */

  /*  useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get(`/api/session/${selectedResult.id}`);
 
         setQuestions(response.data.AllQuestions);
 
         console.log("Dashboard", response.data.AllQuestions);
       } catch (error) {
         console.error("Error fetching questions:", error);
       }
     };
 
     fetchData();
   }, [selectedResult]); */

  /* useEffect(() => {
    if (selectedResult) {
        const questions = [...selectedResult.test.Questions,...selectedResult.test.analyticalWritingQuestions,...selectedResult.test.quantitativeQuestions,...selectedResult.test.readingComprehensionQuestions,...selectedResult.test.multipleAnswerQuestions,...selectedResult.test.multipleChoiceQuestions];
 
  const sections = selectedResult.test.sections.reduce((acc, section) => {
    const sectionQuestions = questions.filter(
      (question) => question.section === section
    );
    acc[section] = sectionQuestions;
    return acc;
  }, {});
 
  console.log(sections);
  
      setQuestions(sections);
    }
  }, [selectedResult]); */

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setCurrentSession(result);
    setCurrentSection(result.test.sections[0])
    setResult(true);
  }

  const getResultQuestions = () => {
    if (selectedResult) {
      const questions = [
        ...selectedResult.test.Questions,
        ...selectedResult.test.analyticalWritingQuestions,
        ...selectedResult.test.quantitativeQuestions,
        ...selectedResult.test.readingComprehensionQuestions,
        ...selectedResult.test.multipleAnswerQuestions,
        ...selectedResult.test.multipleChoiceQuestions,
      ];

      const sections = selectedResult.test.sections.reduce((acc, section) => {
        const sectionQuestions = questions.filter(
          (question) => question.section === section
        );
        acc[section] = sectionQuestions;
        return acc;
      }, {});

      const AllQuestions = selectedResult.test.sections.reduce((acc, section) => {
        return acc.concat([...sections[section]])
      }, []);

      return AllQuestions
    }
  }

  const questions = getResultQuestions();

  console.log(questions);

  const previousQuestionsLength = () => {
    if (selectedResult) {
      const keysArray = Object.keys(questions); // Convert keys to array
      const index = keysArray.indexOf(currentSection);
      const valuesArray = Object.values(questions);

      const lengths = valuesArray.map(innerArray => innerArray.length)

      console.log(lengths);

      return lengths.slice(0, index)
    }
  }

  selectedResult && console.log(currentResultQuestion < questions.length - 1);

  const NextQuestion = () => {
    if (currentResultQuestion === questions.length - 1) {
      setCurrentResultQuestion(0);
      setCurrentQuestion(0);
    } else {
      console.log("else");
      setCurrentResultQuestion(currentResultQuestion + 1)
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const time = (isoString) => {
    const isoTimestamp = isoString;
    const date = new Date(isoTimestamp);

    // Extracting date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    // Extracting time components
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Creating a formatted string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        {/* Available Tests */}
        <div className="flex justify-center mb-6">
          {tests.map(test => (
            <div key={test.id} className="mx-2">
              <Button className="h-11 min-w-24 text-white bg-strong hover:bg-strong/90 px-3 my-auto text-center" onClick={() => {
                setSelectedResult(null);
                setCurrentResultQuestion(0);
                setTestId(test.id)
              }}>{test.name}</Button>
            </div>
          ))}
        </div>

        {/* Default Test Results */}
        {!selectedResult && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resultSessions.filter(resultSession => resultSession.test.id === testId).map(result => (
            <div key={result.id} className="bg-slate-100 p-6 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl" onClick={() => handleResultClick(result)}>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{result.test.name}</h2>
              <p className="text-gray-600 mb-2">Result ID: {result.id}</p>
              <p className="text-gray-600 mb-2">Score: 120</p>
              <p className="text-gray-600 mb-2">Date: {time(result.updatedAt)}</p>
            </div>
          ))}
        </div>}

        {/* Selected Result Detail View */}
        {/* {selectedResult && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Detailed Result</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{selectedResult.testName}</h2>
              <p className="text-gray-600">{selectedResult.result}</p>
            </div>
          </div>
        )} */}
        {selectedResult && questions.map((question, index) => {
          console.log(question, index)
          if (index === currentResultQuestion) {
            console.log(question.questionType.type);
            if (question.questionType.type === "MCQ") {
              console.log('MCQ');
              return <>
                <MCQ key={index} question={question} NextQuestion={NextQuestion} />
                <div className="mb-4">
                  <p>Correct Answer: {question.correctAnswer.join(',')}</p>
                  <p>Your Answer: {currentSession.sessionAnswers[currentResultQuestion].join(',')}</p>
                </div>

                <div>
                  <h1>Description :</h1>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste doloremque pariatur, aliquam adipisci omnis fugiat blanditiis tempora minus aut odio soluta commodi, velit consequuntur non obcaecati labore natus eligendi ex!</p>
                </div>
              </>;
            } else if (question.questionType.type === "Blank" || question.type === "input") {
              return <>
                <OpenEndedQuestions key={index} question={question} NextQuestion={NextQuestion} />
                <div className="mb-4">
                  <p>Correct Answer: {question.correctAnswer.join(',')}</p>
                  <p>Your Answer: {currentSession.sessionAnswers[currentResultQuestion].join(',')}</p>
                </div>

                <div>
                  <h1>Description :</h1>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste doloremque pariatur, aliquam adipisci omnis fugiat blanditiis tempora minus aut odio soluta commodi, velit consequuntur non obcaecati labore natus eligendi ex!</p>
                </div>
              </>;
            } else if (question.questionType.type === "Quantitative") {
              return <>
                <QuantitativeQuestions key={index} question={question} NextQuestion={NextQuestion} />
                <div className="mb-4">
                  <p>Correct Answer: {question.correctAnswer.join(',')}</p>
                  <p>Your Answer: {currentSession.sessionAnswers[currentResultQuestion].join(',')}</p>
                </div>

                <div>
                  <h1>Description :</h1>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste doloremque pariatur, aliquam adipisci omnis fugiat blanditiis tempora minus aut odio soluta commodi, velit consequuntur non obcaecati labore natus eligendi ex!</p>
                </div>
              </>;
            } else if (question.questionType.type === "Reading Comprehension") {
              return <>
                <ReadingCompehension key={index} question={question} NextQuestion={NextQuestion} />
                <div className="mb-4">
                  <p>Correct Answer: {question.correctAnswer.join(',')}</p>
                  <p>Your Answer: {currentSession.sessionAnswers[currentResultQuestion].join(',')}</p>
                </div>

                <div>
                  <h1>Description :</h1>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste doloremque pariatur, aliquam adipisci omnis fugiat blanditiis tempora minus aut odio soluta commodi, velit consequuntur non obcaecati labore natus eligendi ex!</p>
                </div>
              </>;
            } else if (question.questionType.type === "AnalyticalWriting") {
              return <>
                <AnalyticalWriting key={index} question={question} NextQuestion={NextQuestion} />
                <div className="mb-4">
                  <p>Correct Answer: {question.correctAnswer.join(',')}</p>
                  <p>Your Answer: {currentSession.sessionAnswers[currentResultQuestion].join(',')}</p>
                </div>

                <div>
                  <h1>Description :</h1>
                  <p className='ml-6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste doloremque pariatur, aliquam adipisci omnis fugiat blanditiis tempora minus aut odio soluta commodi, velit consequuntur non obcaecati labore natus eligendi ex!</p>
                </div>
              </>;
            }
          }

          return null; // Return null for unsupported question types
        })}

      </main>
    </div>
  );
};

export default ResultsPage;
