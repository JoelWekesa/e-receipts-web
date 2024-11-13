import { useQuery } from "@tanstack/react-query";
import { profileView } from "../page/profile/get";
import { useSession } from "next-auth/react";
import { Profile } from "@/models/profile/user-profile";

const useProfile = ({ profile }: { profile: Profile | null }) => {
    const { data: session } = useSession()

    const token = session?.accessToken

    return useQuery({
        queryKey: ["profile", token ? token : ""],
        queryFn: () => profileView({ token: token || "" }),
        enabled: !!token,
        placeholderData: profile
    })
}

export default useProfile
