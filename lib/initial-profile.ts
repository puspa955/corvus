import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const initialProfile = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      console.error("User is not authenticated");
      return auth().redirectToSignIn();
    }

    let profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (profile) {
      return profile;
    }

    const newProfile = await db.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newProfile;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in initialProfile:", error.message);
      throw new Error(`Failed to initialize profile: ${error.message}`);
    } else {
      console.error("Unexpected error in initialProfile:", error);
      throw new Error("Failed to initialize profile: Unknown error");
    }
  }
};
