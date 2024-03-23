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

const ReadingCompehension = ({ question, NextQuestion }) => {
    const options = [
        "exam",
        "TEST for fun",
        "Test for foreign",
        "test for timepass",
    ];
    const { currentQuestion, currentSection, setSelectedChoices, selectedChoices } = useCurrentQuestion();

    /*     const [selectedChoices, setSelectedChoices] = useState([]); */
    const [selectedSentence, setSelectedSentence] = useState(null);

    const selectmode = question?.select;
    const questionHasImage = false;
    let targetSentence = "";

    if (question?.highlighted) { targetSentence = question.highlightedSentence.slice(0, -1); }
    // The sentence to highlight
    const paragraph = `In the vast expanse of the cosmos, where the boundaries of time and space intertwine, celestial bodies dance in a cosmic ballet, their movements orchestrated by the invisible forces of gravity. On Earth, diverse ecosystems thrive, from the frozen tundras of the Arctic, where resilient wildlife battles harsh climates, to the lush rainforests of the equatorial regions, where a cacophony of life reverberates through the verdant canopies. Meanwhile, in bustling urban centers, human ingenuity gives rise to towering skyscrapers and intricate networks of transportation, each a testament to the evolution of civilization. As the digital age unfolds, technology weaves an intricate tapestry connecting people across continents. The internet, a vast virtual landscape, serves as a conduit for information, fostering global communication and collaboration. In this interconnected realm, social media platforms emerge as digital town squares, where ideas and opinions, both profound and mundane, collide and coalesce. Simultaneously, the rapid advancement of artificial intelligence raises ethical questions about the intersection of technology and humanity, prompting contemplation on the future of work, privacy, and the very essence of consciousness. In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries. From the microscopic intricacies of cellular biology to the awe-inspiring vastness of the cosmos, human curiosity propels us into uncharted territories. Genetic engineering offers glimpses into the potential for eradicating hereditary diseases, while space exploration fuels dreams of interplanetary colonization. The dichotomy of progress and ethical considerations permeates the scientific landscape, shaping the trajectory of innovation and the responsibilities that come with wielding the power of knowledge. In the tapestry of culture, art, and expression, diverse threads intertwine to create a rich mosaic. Literature, a timeless reflection of the human experience, captures the nuances of emotion and the complexity of the human psyche. Visual arts, from classical masterpieces to contemporary installations, serve as windows into the collective soul of societies across epochs. Music, with its rhythmic cadence and lyrical prose, transcends language, evoking emotions that resonate across cultural divides. In the throes of political landscapes, nations navigate a complex dance of power, diplomacy, and governance. Ideologies clash, borders shift, and the global stage witnesses a perpetual ebb and flow of alliances and conflicts. Human rights, democracy, and environmental stewardship become focal points in the discourse on the collective responsibility of humanity towards a sustainable and just future. As we navigate the intricate web of existence, each moment becomes a brushstroke on the canvas of time. The unfolding narrative of life, with its myriad complexities and interconnected narratives, invites contemplation on the profound mysteries that envelop our journey through the cosmos.`;

    const sentences = paragraph.split(". ");

    return (
        <div className="p-2 pt-4 sm:p-2 sm:pt-4 h-auto max-w-5xl">
            <div className="p-4 text-justify border rounded-2xl">
                <p>  {sentences.map((sentence, index) => (
                    <span key={index} className={`${sentence.includes(targetSentence) && question.highlighted === true ? "bg-strong text-white" : ""
                        } ${selectedSentence === index && selectmode === true ? "underline" : ""}`} onClick={() => {
                            setSelectedSentence(index);
                            setSelectedChoices([...selectedChoices,sentence])
                        }}>
                        {sentence}
                        {index < sentences.length - 1 && ". "}

                        {/* Add period and space unless it's the last sentence */}
                    </span>
                ))}</p>
            </div>
            <div className="d-block sm:flex w-full justify-between mt-5">
                {questionHasImage && (
                    <Image
                        width={200}
                        height={150}
                        src="/gre3.jpeg"
                        alt="Question Image"
                        className="w-[80%] mx-auto sm:w-[45%] sm:h-[90%] my-auto object-cover rounded-md sm:mr-4"
                    />
                )}
                <div className={`${questionHasImage ? `sm:w-[50%]` : `w-full`}`}>
                    <Card className="w-full mt-4 rounded-2xl">
                        <CardHeader className="flex flex-row items-center">
                            <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
                                <div>3</div>
                                <div className="text-base text-slate-400">10</div>
                            </CardTitle>
                            <CardDescription className="flex-grow text-lg">
                                {question?.questionText}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <div className="flex flex-col items-center justify-center w-full mt-4">
                        <Options question={question} selectmode={selectmode} />
                        <Button
                            variant="default"
                            className="mt-2 bg-strong text-white hover:bg-strong/90"
                            size="lg"
                            onClick={NextQuestion}
                        >
                            {currentSection === "QuantativeReasoning2" && currentQuestion === 19 ? "Submit" : "Next"} <ChevronRight className="w-4 h-4 ml-2 text-white" />
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ReadingCompehension;
