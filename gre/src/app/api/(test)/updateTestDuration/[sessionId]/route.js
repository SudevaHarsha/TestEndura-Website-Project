import { db } from "@/lib/db";
const { NextResponse } = require("next/server");

export async function PUT(req,{params}) {    
    
    try {
      // Retrieve the testSession from the database
      const testSession = await db.testSession.update({
        where: {
          id: params.sessionId
        },
        data: {
          duration: new Date().toISOString() // Update endTime with the current date
        }
      });

      return new NextResponse(200, { message: 'Test session updated successfully', testSession });
    } catch (error) {
      console.error('Error updating test session:', error);
      return new NextResponse(500, { error: 'Unable to update test session' });
    }
  }