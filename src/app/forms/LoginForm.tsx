import {
  FormControl,
  FormLabel,
  Button,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useAuth } from "reactfire";

const LoginForm = () => {
  const auth = useAuth();
  const doProviderSignIn = async (provider: GoogleAuthProvider) => {
    try {
      await signInWithPopup(auth, provider);
      // create user in your database here
      //toast({ title: "Signed in!" });
      //onSignIn?.();
    } catch (err: any) {
      console.error(err);
      //toast({ title: "Error signing in", description: `${err}` });
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // toast({
      //   title: "Success!",
      //   description: "You have been signed in.",
      // });
    } catch (error) {
      //toast({ title: "Error Signing In", description: `${error}` });
    }
  };
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          {...register("email", {
            required: "This is required",
            minLength: {
              value: 4,
              message: "Minimum length should be 4",
            },
          })}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
      <Button
        className="w-full"
        onClick={async () => {
          const provider = new GoogleAuthProvider();
          doProviderSignIn(provider);
          //toast({
          //  title: "Oops!",
          //  description: "Provider not configured, yet.",
          //});
          // await doProviderSignIn(provider);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 488 512"
          fill="currentColor"
          className="mr-2"
        >
          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
        </svg>
      </Button>
    </form>
  );
};

export default LoginForm;
