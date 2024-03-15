"use client";

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
import { useRouter } from "next/navigation";

const QuantitativeQuestions = ({ question, NextQuestion }) => {
    const router = useRouter();
    const quantities = [
        {
            label: "Quantity 1",
            value: "The sum of the first 10 positive integers.",
        },
        {
            label: "Quantity 2",
            value: "Twice the average of the first 10 positive integers.",
        },
    ];

    const {currentQuestion} = useCurrentQuestion();

    const handleNextQuestion = () => {
        if (currentQuestion === 8) {
            router.push('/submission'); // Navigate to the submit page
        } else {
            NextQuestion();
        }
    };

    const options = [
        "A is greater",
        "B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given",
    ];

    const [selectedChoices, setSelectedChoices] = useState([]);
    const questionHasImage = false; // Set this to true if the question has an image

    return (
        <div className="h-[90vh] md:w-[80vw] max-w-4xl w-[90vw] flex flex-col justify-center items-center">
            <div className="d-block sm:flex w-full justify-between mt-5">
                {/* {questionHasImage && (
                    <Image
                        width={200}
                        height={150}
                        src="/gre3.jpeg"
                        alt="Question Image"
                        className="w-[80%] mx-auto sm:w-[45%] sm:h-[90%] my-auto object-cover rounded-md sm:mr-4"
                    />
                )} */}
                <div className={`${questionHasImage ? `sm:w-[50%]` : `w-full`}`}>
                    <Card className="w-full mt-4 rounded-2xl">
                        <CardHeader className="flex flex-row items-center">
                            <CardHeader className="flex-grow text-lg">
                                {question.question}
                                <div className="flex flex-row justify-center gap-4">
                                    <div className={`w[50%] flex flex-col justify-center items-center text-center border-r-2 pr-1}`
                                    }>
                                        <div className="font-semibold">Quantity-1:</div>
                                        <div className="pt-2">{question.quantityA}</div>
                                    </div>
                                    <div className={`w-[50%] flex flex-col justify-center items-center text-center }`
                                    }>
                                        <div className="font-semibold">Quantity-2:</div>
                                        <div className="pt-2">{question.quantityB}</div>
                                    </div>
                                </div>
                            </CardHeader>
                        </CardHeader>
                    </Card>
                    <div className="flex flex-col items-center justify-center w-full mt-4">
                        <Options question={question} selectmode={false} />
                        <Button
                            variant="default"
                            className="mt-2 bg-strong text-white hover:bg-strong/90"
                            size="lg"
                            onClick={handleNextQuestion}
                        >
                         {currentQuestion === 8 ? "Submit" : "Next"}    <ChevronRight className="w-4 h-4 ml-2 text-white" />
                        </Button>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default QuantitativeQuestions;
