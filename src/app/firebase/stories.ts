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
import { Prompt, Story } from "../utils/types";

export const GetStoriesByCreatorUid = (uid: string) => {
  //const storiesRef = collection(useFirestore(), "stories");
  const q = query(
    collection(useFirestore(), "stories"),
    where("creatorId", "==", uid)
  );

  //onst promptsQuery = query(promptsRef);

  // subscribe to a document for realtime updates. just one line!
  const { status, data: stories } = useFirestoreCollectionData(q);
  // check the loading status
  if (status === "loading") {
    return "no data";
  }

  return stories;
};

export const CreateStory = (story: Story) => {
  const storiesRef = collection(useFirestore(), "stories");

  addDoc(storiesRef, story);
};
