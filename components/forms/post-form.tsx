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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { useState } from "react"
import z from "zod"
import { AnimatePresence, motion } from 'framer-motion'
import LanguageFilter from "../language-filter"
import Search from "../search"
import { createWord } from "@/server/actions/create-word"
import { useSearchParams } from "next/navigation"
import { Toaster, toast } from "sonner"

export default function PostForm({ languageId }: { languageId: number }) {
    const [showWordForm, setWordForm] = useState(false)
    const [showSentenceForm, setSentenceForm] = useState(false)

    const searchParams = useSearchParams()

    const form: any = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            word: "",
            native: "",
            pronunciation: "",
            category: "Noun",
            language: languageId
        }
    })

    const categoriesOptions = Object.entries(mappedCategories).map(([key, value]) => (
        <SelectItem value={key} key={key}>{value}</SelectItem>
    ))

    async function submitWord(values: z.infer<typeof formSchema>) {
        const result = await createWord(values)
        if (result?.error) {
            return toast.error(result.error)
        }
        form.reset()
    }

    return (
        <>
            <Toaster richColors />
            <section className="flex flex-col gap-8 my-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button onClick={() => setWordForm(!showWordForm)} className="w-fit text-black border-2 rounded-lg border-slate-300 hover:bg-[#f8f8f8] bg-white">Add word</Button>
                        {searchParams.has("query") ? (
                            null
                        ) : (
                            <Button onClick={() => setSentenceForm(!showSentenceForm)} className="w-fit text-black border-2 rounded-lg border-slate-300 hover:bg-[#f8f8f8] bg-white">Add sentence</Button>
                        )}
                    </div>
                    <LanguageFilter />
                </div>
                {showWordForm ? (
                    <AnimatePresence presenceAffectsLayout>
                        <motion.div
                            layout
                            animate={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(submitWord)} className="flex max-lg:flex-col lg:items-end gap-2 xsm:gap-4 lg:gap-10 w-full">
                                    <FormField
                                        control={form.control}
                                        name="word"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Word</FormLabel>
                                                <FormControl>
                                                    <Input required {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="native"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Native word</FormLabel>
                                                <FormControl>
                                                    <Input required {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="pronunciation"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
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
                                            <FormItem className="w-full">
                                                <FormLabel>Category</FormLabel>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Noun" />
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
                                    <Button disabled={form.formState.isSubmitting} className="max-lg:mt-4" type="submit">{form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
                                    </Button>

                                </form>
                            </Form>
                        </motion.div>
                    </AnimatePresence>
                ) : null}

                {showSentenceForm ? (
                    <AnimatePresence presenceAffectsLayout>
                        <motion.div
                            layout
                            animate={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            className="space-y-2"
                        >
                            <h3 className="font-semibold text-sm">Select word and provide a context</h3>
                            <Search placeholder="Search..." />
                        </motion.div>
                    </AnimatePresence>
                ) : null}
            </section>
        </>
    )
}
