import {
  FormControl,
  FormLabel,
  Button,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";

type RegistrationType = {
  email: string;
  password: string;
};

const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [data, setData] = useState<RegistrationType>({
    email: "",
    password: "",
  });

  // Use the signUp method from the AuthContext
  const { signUp } = useAuth();

  const handleRegistration = async (e: any) => {
    e.preventDefault();
    try {
      await signUp(data.email, data.password);
    } catch (error: any) {
      console.log(error.message);
    }
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(handleRegistration)}>
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
          onChange={(e: any) => {
            setData({
              ...data,
              email: e.target.value,
            });
          }}
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
          onChange={(e: any) => {
            setData({
              ...data,
              email: e.target.value,
            });
          }}
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
