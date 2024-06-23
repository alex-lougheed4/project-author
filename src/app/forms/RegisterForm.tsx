import {
  FormControl,
  FormLabel,
  Button,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "reactfire";

const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  const handleSignUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user?.user.uid && user.user.email) {
        // create user in firestore here if you want
        //toast({ title: "Account created!" });
      }
    } catch (err: any) {
      if ("code" in err && err.code.includes("already")) {
        //toast({ title: "User already exists" });
      } else {
        //toast({ title: "Error signing up", description: `${err}` });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
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
          {...register("password", {
            required: "This is required",
            minLength: {
              value: 4,
              message: "Minimum length should be 4",
            },
          })}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};

export default RegisterForm;
