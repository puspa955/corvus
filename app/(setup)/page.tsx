import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async () => {
  const profile = await initialProfile();

  if (!profile) {
    // Handle the case where profile is undefined
    console.error("Profile is undefined");
    return <div>No profile available</div>;
  }

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id
        }
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
}

export default SetupPage;
