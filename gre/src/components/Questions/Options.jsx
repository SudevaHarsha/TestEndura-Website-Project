import React, { useState } from 'react'
import { Button } from '../ui/button';
import { useCurrentSession } from '@/providers/CurrentSessionContext';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';

const Options = ({ question,selectmode }) => {

   /*  const [selectedChoices, setSelectedChoices] = useState([]); */
    const questionHasImage = false; // Set this to true if the question has an image
    console.log(question.option)
    const maxSelections = question.option || question.options.length;
    const {selectedChoices, setSelectedChoices} = useCurrentQuestion();

    const handleOptionClick = (index) => {
        if (selectedChoices.length < maxSelections || selectedChoices.includes(index)) {
            const updatedChoices = selectedChoices.includes(index)
                ? selectedChoices.filter((choice) => choice !== index)
                : [...selectedChoices, index];
            setSelectedChoices(updatedChoices);
        }
    };

    console.log(selectedChoices);

    return (
        <>
            {selectmode === false && question?.options.map((option, index) => (
                <Button
                    key={option}
                    variant={
                        selectedChoices.includes(index) ? "default" : "outline"
                    }
                    className={`justify-start w-full py-8 mb-4 rounded hover:bg-gray-200 ${selectedChoices.includes(index)
                        ? "bg-black text-white hover:bg-black"
                        : "bg-slate-100 text-black"
                        }`}
                    onClick={() => {
                        handleOptionClick(index)
                    }}
                >
                    <div className="flex items-center justify-start">
                        <div className="p-2 px-3 mr-5 border">{index + 1}</div>
                        <div className="text-start">{option}</div>
                    </div>
                </Button>
            ))}
            
        </>
    )
}

export default Options