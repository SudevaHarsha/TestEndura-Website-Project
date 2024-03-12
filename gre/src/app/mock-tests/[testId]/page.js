// pages/tests/[testId].js
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import Timer from "@/components/Timer";

const TestPage = async({ testId }) => {
  /* const router = useRouter(); */
  /* const { testId } = router.query; */

  const profile = await currentProfile();

  const test = await db.test.findFirst({
    where: {
      testId: testId
    }
  });

  if(test) {
    console.log(test);
  }

  const testSession = await db.testSession.create({
    data: {
      profileId: profile.id, // Replace with actual user ID
      testId: test.id,
      duration:'30',
      startTime: new Date(),
      endTime: new Date(Date.now() + test.duration * 60000), // Add test duration in minutes
    },
  });

  if(!testSession) {
    console.log("error in test session creation");
  }

  return (
    <div>
      <h1>{test?.name}</h1>
      <p>{test?.description}</p>
      <Timer duration={test.duration} />
    </div>
  );
};

/* export async function getServerSideProps({ params }) {
  const { testId } = params;
  const test = await prisma.test.findUnique({
    where: {
      id: testId,
    },
  });
  return {
    props: {
      test,
    },
  };
} */

export default TestPage;
