'use client'

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import {
    Form,
    FormControl,
    FormDescription,
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
import { mappedCategories, sentenceFormSchema } from "@/lib/formSchema"
import { createSentence } from "@/server/actions/create-word"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Button } from "../ui/button"

const SentenceDialogForm = ({ word, languageId }: { word: Word, languageId: number }) => {

    const sentenceForm = useForm<z.infer<typeof sentenceFormSchema>>({
        resolver: zodResolver(sentenceFormSchema),
        defaultValues: {
            sentence: "",
            category: "Noun",
            language: languageId,
            word_id: word.id
        }
    })

    const categoriesOptions = Object.entries(mappedCategories).map(([key, value]) => (
        <SelectItem value={key} key={key}>{value}</SelectItem>
    ))

    function submitSentence(values: z.infer<typeof sentenceFormSchema>) {
        createSentence(values)
        sentenceForm.reset()
    }

    return (
        <Dialog>
            <DialogTrigger>
                <p className="text-center text-sm cursor-pointer w-[90px] py-1 font-medium border-b border-black">
                    {word.word}
                </p>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="text-base">Word: <span className="text-red-400">{word.word}</span></DialogTitle>
                <Form {...sentenceForm}>
                    <form onSubmit={sentenceForm.handleSubmit(submitSentence)} className="flex flex-col gap-2 xsm:gap-4 w-full">
                        <FormField
                            control={sentenceForm.control}
                            name="sentence"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Sentence</FormLabel>
                                    <FormControl>
                                        <Input required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={sentenceForm.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Category</FormLabel>
                                    <FormDescription>Select a category to provide a specific context</FormDescription>
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
                        <Button disabled={sentenceForm.formState.isSubmitting} className="max-lg:mt-4" type="submit">{sentenceForm.formState.isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    );
}

export default SentenceDialogForm;