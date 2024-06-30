"use client";

import { collection, query, where } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

const Page = () => {
  const { data: user } = useUser();
  if (!user) {
    redirect("/");
  }
  const firestore = useFirestore();
  const promptsRef = collection(firestore, "prompts"); //needs to be top level
  console.log(`uid ${user.uid}`);
  const promptsQuery = query(
    promptsRef,
    where("userCreatorId", "==", user.uid)
  );

  console.log(`userId ${user?.uid}`);
  const { status: allPromptsByUidStatus, data: promptsByUid } =
    useFirestoreCollectionData(promptsQuery); //needs to be top level
  if (allPromptsByUidStatus === "success") {
    console.log(`allPrompts: ${JSON.stringify(promptsByUid)}`);
  }
  if (!user?.uid) {
    return <p>Not logged in</p>;
  }
  return (
    <>
      <div>Your Prompts</div>
      <div>{JSON.stringify(promptsByUid)}</div>
    </>
  );
};

export default Page;
