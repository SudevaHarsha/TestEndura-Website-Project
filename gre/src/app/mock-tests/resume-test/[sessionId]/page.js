import SectionWiseQuestions from '@/components/Questions/SectionWiseQuestions'
import { db } from '@/lib/db'
import React from 'react'

const page = async({sessionId}) => {
  const testSession = await db.testSession.findFirst({
    where: {
      testId: sessionId,
    },
    include:{
      test:true
    }
  });
  console.log(testSession);
  return (
    <SectionWiseQuestions test={testSession.test} testSession={testSession} />
  )
}

export default page