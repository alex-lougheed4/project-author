import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { useFirestore, useUser } from "reactfire";
import { Prompt } from "../utils/types";

const CreatePromptForm = () => {
  const { data: user } = useUser();
  const firestore = useFirestore();
  const promptsRef = collection(firestore, "prompts");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  const onCreateSubmit = async (values: any) => {
    const prompt: Prompt = {
      title: values.title,
      summary: values.summary,
      userCreatorId: user?.uid,
      createdAt: new Date(),
      deadline: values.deadline,
      length: values.length,
      kudos: 0,
    };
    console.log(`createPrompt: ${JSON.stringify(prompt)}`);
    try {
      const docRef = await addDoc(promptsRef, {
        title: values.title,
        summary: values.summary,
        userCreatorId: user?.uid,
        createdAt: new Date(),
        deadline: values.deadline,
        length: values.length,
        kudos: 0,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <form onSubmit={handleSubmit(onCreateSubmit)}>
      <ModalHeader>Create Prompt</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl>
          <FormHelperText>Name your Prompt!</FormHelperText>
          <FormLabel>Title</FormLabel>
          <Input id="title" {...register("title")} />
          <FormHelperText>Write Your Prompt!</FormHelperText>
          <FormLabel>Summary</FormLabel>
          <Input id="summary" {...register("summary")} />
          <FormLabel>Story Length</FormLabel>
          <Select
            placeholder="Select length"
            id="length"
            {...register("length")}
          >
            <option value="SHORT">Short</option>
            <option value="MEDIUM">Medium</option>
            <option value="LONG">Long</option>
          </Select>
          <FormLabel>Deadline</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            id="deadline"
            {...register("deadline")}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button type="submit">Submit</Button>
        <Button onClick={onCreateClose}>Close</Button>
      </ModalFooter>
    </form>
  );
};

export default CreatePromptForm;
