import {
  FormControl,
  FormLabel,
  Button,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";

type LoginType = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [data, setData] = useState<LoginType>({
    email: "",
    password: "",
  });
  const { logIn } = useAuth();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await logIn(data.email, data.password);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
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
              password: e.target.value,
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
          name="password"
          onChange={(e: any) => {
            setData({
              ...data,
              password: e.target.value,
            });
          }}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
