"use client";
import { collection } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

export default function Home() {
  const firestore = useFirestore();
  const promptsRef = collection(firestore, "prompts"); //needs to be top level
  // subscribe to a document for realtime updates. just one line!
  const { status: allPromptsStatus, data: allPrompts } =
    useFirestoreCollectionData(promptsRef);
  console.log(`prompts: ${allPrompts}`);
  return (
    <>
      <main>Home</main>
      <p>{JSON.stringify(allPrompts)}</p>
    </>
  );
}
