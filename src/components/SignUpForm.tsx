import React, { useEffect, useState } from "react";
import "./SignInCard.css";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { apiResponse } from "@/types/apiResponse";
import { Form } from "./ui/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 300);
  const { toast } = useToast();
  const router = useRouter();

  const formup = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!username) return;

    const checkUsernameUnique = async () => {
      setIsCheckingUsername(true);
      setUsernameMessage("");
      try {
        const response = await axios.get(
          `/api/checkusername?username=${username}`
        );
        setUsernameMessage(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<apiResponse>;
        setUsernameMessage(
          axiosError.response?.data.message ?? "Error Checking username"
        );
      } finally {
        setIsCheckingUsername(false);
      }
    };

    checkUsernameUnique();
  }, [username]);

  const onSubmitUp = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<apiResponse>("/api/sign-up", data);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace(`/verify/${username}`);
      formup.reset();
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      toast({
        title: "Sign up failed",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...formup}>
      <form onSubmit={formup.handleSubmit(onSubmitUp)} className="space-y-3">
        <FormField
          control={formup.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="username"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    debounced(e.target.value);
                  }}
                />
              </FormControl>
              {isCheckingUsername && <Loader2 className="animate-spin" />}
              <p
                className={`text-sm stay ${
                  usernameMessage === "Username is unique"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {usernameMessage}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formup.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formup.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="button email" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
