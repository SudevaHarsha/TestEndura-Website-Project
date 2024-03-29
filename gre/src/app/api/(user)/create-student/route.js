import { db } from "@/lib/db";
import { Clerk } from "@clerk/clerk-sdk-node";
/* import { useClerk } from '@clerk/clerk-sdk-node'; */
import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  /* const { signUp } = useClerk(); */
  const { email, password } = await req.json();
  console.log(email, password);
  try {
    // Initialize Clerk SDK
    /* const clerk = new Clerk(process.env.CLERK_SECRET_KEY); */

    // Create new user
    const emailAddress = email;
    /* const password = password; */
    /* const newUser = await clerkClient.users.createUser({emailAddress:emailAddress,password:password}); */
    // Create new user
    const newUser = await clerkClient.users.createUser({
      emailAddress: [emailAddress],
      password: password,
    });

    /* const newUser = await clerk.users.createUser({
      emailAddress: email,
      password: password,
    }); */

    const profile = await db.profile.findUnique({
      where: {
        userId: newUser.id,
      },
    });

    if (profile) {
      return profile;
    }

    const newProfile = await db.profile.create({
      data: {
        userId: newUser.id,
        name: `${newUser.firstName} ${newUser.lastName}`,
        imageUrl: newUser.imageUrl,
        email: newUser.emailAddresses[0].emailAddress,
        role: 'student',
      },
    });

    // Optionally, you can handle the response here

    return NextResponse.json({ newProfile });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.error(error, { status: 500 });
  }
}
