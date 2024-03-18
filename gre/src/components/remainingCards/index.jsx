import { db } from '@/lib/db';
import React from 'react'

const RemainingCards = async() => {
    const filteredSessions = await db.testSession.findMany({
        where: {
          NOT: {
            duration: ''
          }
        }
      });
      
      const testSessions = filteredSessions.filter(session => {
        // Convert duration and endTime to appropriate types if necessary
        const duration = new Date(session.duration);
        const endTime = new Date(session.endTime);
      
        // Compare the duration with endTime
        return duration < endTime;
      });
      
        console.log(testSessions);
  return (
    <div>{JSON.stringify(testSessions)}</div>
  )
}

export default RemainingCards