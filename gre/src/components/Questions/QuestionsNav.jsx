"use client"

import React from 'react'
import { Button } from '../ui/button'
import { ChevronRight, ChevronLeft } from "lucide-react";
import TimerClock from '../Timer'
import { Timer } from "lucide-react";
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useTimer } from '@/providers/TimerContext';
import { useRouter } from 'next/navigation';

const QuestionsNav = ({questionLength}) => {

    const router= useRouter();

    const onTimeout = ()=>{
        router.push("/timeout")
    }

    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + "30" * 60000);

    const { currentQuestion, setCurrentQuestion, nextQuestion } = useCurrentQuestion();
    /* const {sessionStarted, sessionExpired, minutes, seconds, resetTimer, duration} = useTimer(); */

    const PreviousQuestion = () => {
        console.log("prec=vious");
        currentQuestion != 0 ? setCurrentQuestion(currentQuestion - 1) : currentQuestion
    };

    return (
        <div className="w-[100%] flex justify-between p-6 pb-0">
            <div className="flex flex-col">
                {/* topic */}
                <p>
                    <span className="text-slate-400">Topic</span> &nbsp;
                    <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
                        an gre test
                    </span>
                </p>
                <div className="flex self-start mt-3 text-slate-400">
                    <Timer className="mr-2" />
                    <TimerClock TestDuration="30" />
                </div>
            </div>
            <div>
                Question {currentQuestion+1} <span>{"/"+questionLength}</span>
            </div>
            <div className="text center">
                <Button onClick={PreviousQuestion} className="h-11 text-white bg-strong hover:bg-strong/90 px-3 my-auto text-center"><ChevronLeft className="w-4 h-4 mr-2 text-white" /> previous</Button>
            </div>
        </div>
    )
}

export default QuestionsNav