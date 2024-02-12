'use server'

import { userRegistrationSchema } from "@/lib/userFormSchema"
import bcrypt from 'bcrypt'
import prisma from "@/lib/prisma"
import z from "zod"

type RegistrationSchema = z.infer<typeof userRegistrationSchema>

export const createUser = async (values: RegistrationSchema) => {

    const hashedPassword = await bcrypt.hash(values.password, 10);

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email: values.email },
                { username: values.username }
            ]
        }
    });

    if (existingUser) {
        if (existingUser.email === values.email) {
            return { error: 'Email already exists' };
        } else {
            return { error: 'Username already exists' };
        }
    }

    const newUser = await prisma.user.create({
        data: {
            email: values.email,
            username: values.username,
            password: hashedPassword
        }
    })

    if (!newUser) return { error: 'Could not create user' }
    
    return {
        newUser
     }
}