"use client";
import { useAuth } from "@/app/firebase/AuthContextProvider";
import { getUserPrompts } from "@/app/firebase/firestore";

const Page = () => {
  const { authUser, loading } = useAuth();

  const prompts = getUserPrompts(authUser.uid);
  return (
    <>
      <div>Your Prompts</div>
      <div>{JSON.stringify(prompts)}</div>
    </>
  );
};

export default Page;
