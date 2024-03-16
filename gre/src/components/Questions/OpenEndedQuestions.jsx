"use client"

import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Timer } from "lucide-react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import TimerClock from "../Timer";

import Image from "next/image"
import Options from "./Options";
import { useCurrentQuestion } from "@/providers/CurrentQuestionContext";

const OpenEndedQuestions = ({ question, NextQuestion }) => {
  const blanksData = [
    {
      id: 1,
      type: "input",
      sentence: "The capital of __________ is __________.",
      blanks: ["country", "capital"],
    },
    {
      id: 2,
      type: "numeric",
      sentence: "Enter a number between 100 to 200",
      range: { min: 1, max: 100 },
    },
    {
      id: 3,
      type: "multiple-choice",
      sentence: "Which of the following is a fruit? __________",
      choices: ["Carrot", "Apple", "Potato"],
    },
    // Add more blank question data as needed
  ];
  const { currentQuestion,currentSection } = useCurrentQuestion();


  const [selectedChoices, setSelectedChoices] = useState([]);
  const [currentBlankIndex, setCurrentBlankIndex] = useState(0);
  const questionHasImage = false; // Set this to true if the question has an image

  const currentBlank = question;

  const handleBlankChange = () => {
    setCurrentBlankIndex((prevIndex) =>
      prevIndex < blanksData.length - 1 ? prevIndex + 1 : prevIndex
    );
    setSelectedChoices([]);
  };

  return (
    <div className="h-[90vh] md:w-[80vw] max-w-4xl w-[90vw] flex flex-col items-center justify-center">
      {/* ... (previous code) */}
      <div className="d-block sm:flex w-full justify-between mt-5">
        {/* ... (previous code) */}
        <div className={`${questionHasImage ? "sm:w-[50%]" : "w-full"}`}>
          <div>
            {
              
              <div className="bg-gray-200 p-4 text-strong flex items-center justify-center rounded-2xl text-center">select any of {question.option} from the given options below</div>
            }
          </div>
          <Card className="w-full mt-4 rounded-2xl">
            <CardHeader className="flex flex-row items-center">
              <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
                <div>3</div>
                <div className="text-base text-slate-400">10</div>
              </CardTitle>
              <CardDescription className="flex-grow text-lg">
                {currentBlank.sentence}
              </CardDescription>
            </CardHeader>
          </Card>
          <div className="flex flex-col items-center justify-center w-full mt-4">
            {currentBlank.blankType === "input" ? (
              // Render input fields for blanks
              currentBlank.blanks.map((blank, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Enter ${blank}`}
                  value={selectedChoices[index] || ""}
                  onChange={(e) => {
                    const updatedChoices = [...selectedChoices];
                    updatedChoices[index] = e.target.value;
                    setSelectedChoices(updatedChoices);
                  }}
                  className="border-b p-2 mb-4 focus:outline-none focus:border-strong/70"
                />
              ))
            ) : currentBlank.type === "numeric" ? (
              // Render numeric input
              <input
                type="number"
                placeholder={`Enter a number between ${currentBlank.range.min} and ${currentBlank.range.max}`}
                value={selectedChoices[0] || ""}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  const isValid =
                    !isNaN(value) &&
                    value >= currentBlank.range.min &&
                    value <= currentBlank.range.max;
                  if (isValid) {
                    setSelectedChoices([value]);
                  }
                }}
                className="border-b p-2 mb-4 focus:outline-none focus:border-strong/70"
              />
            ) : (
              // Render multiple-choice options
              <Options question={question} selectmode={false} />
            )}
            <Button
              variant="default"
              className="mt-2 bg-strong text-white hover:bg-strong/90"
              size="lg"
              onClick={NextQuestion}
            >
              {currentSection==="QuantativeReasoning2" && currentQuestion === 19 ? "Submit" : "Next"} <ChevronRight className="w-4 h-4 ml-2 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenEndedQuestions;
