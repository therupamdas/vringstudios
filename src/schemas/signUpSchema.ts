import {z} from 'zod';
export const usernameValidation = z
    .string()
    .min(2, "Username must be 2 characters")
    .max(20, "Username must less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special characters")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"Invalid Email address"}),
    passwoed: z.string().min(6,{message:"Invalid Password"})
    })