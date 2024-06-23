import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  useFirestore,
  useFirestoreCollection,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from "reactfire";
import { Prompt } from "../utils/types";

export const usePrompts = () => {
  const GetPrompts = () => {
    const promptsRef = collection(useFirestore(), "prompts");

    // subscribe to a document for realtime updates. just one line!
    const { status, data: prompts } = useFirestoreCollectionData(promptsRef);

    // check the loading status
    if (status === "loading") {
      return "no data";
    }

    return prompts;
  };
  const GetPromptsByUid = (uid: string) => {
    const promptsRef = collection(useFirestore(), "prompts");
    console.log(`userId: ${uid}`);
    const promptsQuery = query(promptsRef, where("userCreatorId", "==", uid));

    const q = query(
      collection(useFirestore(), "prompts"),
      where("userCreatorId", "==", uid)
    );

    //onst promptsQuery = query(promptsRef);

    // subscribe to a document for realtime updates. just one line!
    const { status, data: prompts } = useFirestoreCollectionData(promptsQuery);
    // check the loading status
    if (status === "loading") {
      return "no data";
    }

    return prompts;
  };

  const CreatePrompt = async (prompt: Prompt) => {
    const promptsRef = collection(useFirestore(), "prompts");
    //addDoc(promptsRef, prompt);

    try {
      const docRef = await addDoc(promptsRef, {
        prompt: prompt,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return {
    GetPrompts,
    GetPromptsByUid,
    CreatePrompt,
  };
};
