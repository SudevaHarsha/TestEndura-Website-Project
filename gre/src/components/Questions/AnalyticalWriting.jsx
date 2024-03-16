// pages/analytical-writing.js

import React from 'react';
import { CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';

const AnalyticalWritingPage = ({NextQuestion}) => {
  const {setCurrentQuestion} = useCurrentQuestion();
  const handleSubmitEssay = (essay) => {
    // Handle submission logic here
    console.log('Submitted Essay:', essay);
    setCurrentQuestion(3);
    NextQuestion();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center mx-auto">
        <CardDescription className="w-[90%] text-justify">
          <p>
            In this section, you will be presented with an essay prompt. Please read the prompt carefully and write
            your essay in the text box provided below.
          </p>
        </CardDescription>

        <div className="flex flex-col items-center justify-center p-2 text-justify">
          <CardDescription className="w-[90%]">
            <p className='border-b-2 mb-2 pb-1'>
              <strong>Prompt:</strong> Analyze the reasoning and evidence presented in the following argument. Write a
              response in which you discuss what specific evidence is needed to evaluate the argument and explain how
              the evidence would weaken or strengthen the argument.
            </p>
            <p>
              <em>Argument:</em> The following appeared in a memo from the director of a large group of hospitals.
              "In a controlled laboratory study of liquid hand soaps, a concentrated solution of extra strength
              UltraClean hand soap produced a 40 percent greater reduction in harmful bacteria than did the liquid hand
              soaps currently used in our hospitals. During our recent test of regular-strength UltraClean with doctors,
              nurses, and visitors at our hospital in Worktown, the hospital reported significantly fewer cases of patient
              infection (a 20 percent reduction) than did any of the other hospitals in our group. Therefore, to prevent
              serious patient infections, we should supply UltraClean at all hand-washing stations throughout our
              hospital system."
            </p>
          </CardDescription>

          <div className="mt-4 w-[90%] rounded-2xl">
            <Textarea placeholder="Write your essay here..." rows={10} className="rounded-2xl h-[500px]" />
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={handleSubmitEssay} variant="primary" className="bg-strong text-white hover:bg-strong/80">
              Submit Essay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticalWritingPage;
