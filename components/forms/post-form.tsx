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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { formSchema, mappedCategories } from "@/lib/formSchema"
import { createWord } from "@/server/actions/create-word"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { useState } from "react"
import z from "zod"
import { AnimatePresence, motion } from 'framer-motion'

export default function PostForm() {
    const [isShown, setShow] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            word: "",
            native: "",
            pronunciation: "",
            category: "Noun"
        }
    })

    const categoriesOptions = Object.entries(mappedCategories).map(([key, value]) => (
        <SelectItem value={key}>{value}</SelectItem>
    ))

    function onSubmit(values: z.infer<typeof formSchema>) {
        createWord(values)
    }

    return (
        <section className="flex flex-col gap-8 my-6">
            <Button onClick={() => setShow(!isShown)} className="w-fit text-black border-2 rounded-lg border-slate-300 hover:bg-[#f8f8f8] bg-white">Add new</Button>

            {isShown ? (
                <AnimatePresence presenceAffectsLayout>
                    <motion.div
                        layout
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-lg:flex-col lg:items-end gap-4 lg:gap-10 w-full">
                                <FormField
                                    control={form.control}
                                    name="word"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Word</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Billigt" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="native"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Native word</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Cheap" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="pronunciation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pronunciation</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem className="md:w-1/4">
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categoriesOptions}
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button>Submit</Button>
                            </form>
                        </Form>
                    </motion.div>
                </AnimatePresence>
            ) : null}
        </section>
    )
}
