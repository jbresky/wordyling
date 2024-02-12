'use client'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { userRegistrationSchema } from "@/lib/userFormSchema"
import { createUser } from "@/server/actions/create-user"
import { useRouter } from "next/navigation"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import z from "zod"

export default function RegisterForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof userRegistrationSchema>>({
        resolver: zodResolver(userRegistrationSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        }
    })

    async function onSubmit(values: z.infer<typeof userRegistrationSchema>) {
        await createUser(values)
        router.push('/login')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="*****" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
