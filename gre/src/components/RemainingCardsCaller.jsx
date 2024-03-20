import { db } from '@/lib/db';
import React from 'react'
import RemainingCards from './remainingCards/index';

const RemainingCardsCaller = async() => {
    const filteredSessions = await db.testSession.findMany({
        where: {
          finished: false
        }
      });
      
/*       const testSessions = filteredSessions.filter(session => {
        // Convert duration and endTime to appropriate types if necessary
        const duration = new Date(session.duration);
        const endTime = new Date(session.endTime);
      
        // Compare the duration with endTime
        return duration < endTime;
      }); */

        return <RemainingCards filteredSessions={filteredSessions} />
}

export default RemainingCardsCaller