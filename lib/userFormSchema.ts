import z from "zod";

export const userLoginSchema = z.object({
    username: z
        .string().trim().toLowerCase()
        .min(4, {
            message: "Username must be 4 or more characters long"
        })
        .max(20, {
            message: "Username cannot exceed 20 characters" 
        }),
    password: z.string()
})

export const userRegistrationSchema = userLoginSchema.extend({
    email: z
        .string().email().toLowerCase(),
})