import { Server, Member, Profile } from "@prisma/client";

export type ServerWithMembersProfiles = Server & {
    members: (Member & {profile: Profile})[];
};