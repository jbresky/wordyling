'use client'

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
import { mappedCategories, sentenceFormSchema } from "@/lib/formSchema"
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
            language: languageId
        }
    })

    const categoriesOptions = Object.entries(mappedCategories).map(([key, value]) => (
        <SelectItem value={key} key={key}>{value}</SelectItem>
    ))

    function submitSentence(values: z.infer<typeof sentenceFormSchema>) {
        // createSentence(values)
        console.log(values)
        sentenceForm.reset()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {/* <Button className="w-[120px] text-black border-2 rounded-lg border-slate-300 hover:bg-[#f8f8f8] bg-white"> */}
                <p className="text-center text-sm cursor-pointer w-[90px] py-1 font-medium border-b border-black">
                    {word.nativeWord}
                </p>
                {/* </Button> */}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle>Create a sentence using <span className="text-red-400">{word.nativeWord}</span></AlertDialogTitle>
                {/* <AlertDialogHeader className="text-start"> */}
                {/* <AlertDialogDescription> */}
                <Form {...sentenceForm}>
                    <form onSubmit={sentenceForm.handleSubmit(submitSentence)} className="flex max-lg:flex-col lg:items-end gap-2 xsm:gap-4 lg:gap-10 w-full">
                        <FormField
                            control={sentenceForm.control}
                            name="sentence"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Sentence</FormLabel>
                                    <FormControl>
                                        <Input required placeholder="Un homme mange et un chat manges" {...field} />
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

                        <AlertDialogCancel>
                            Close
                        </AlertDialogCancel>
                    </form>
                </Form>
                {/* </AlertDialogDescription> */}
                {/* </AlertDialogHeader> */}

            </AlertDialogContent>
        </AlertDialog>

    );
}

export default SentenceDialogForm;