import { db } from "@/lib/db";
import { useCurrentQuestion } from "@/providers/CurrentQuestionContext";

export const currentEndTime = async () => {
  const { endTime, setEndTime } = useCurrentQuestion();

  if (endTime === "") {
    const Sectionduration = await db.testSession.findUnique({
      where: {
        duration: {
          not: null,
        },
      },
      include: {
        test: true,
      },
    });
    const duration = 3600000; // 1 hour in milliseconds
    const currentTime = new Date();
    const NewEndTime = new Date(currentTime.getTime() + duration);
  
    setEndTime(NewEndTime);
    console.log("new:",NewEndTime);
  }

  /* const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  }); */

  return NewEndTime;
};
