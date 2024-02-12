import z from "zod";

const categories = ["Noun", "Verb", "Adjective", "Adverb", "Pronoun", "Preposition", "Conjuction", "Interjection"] as const

export type Categories = (typeof categories)[number]

export const mappedCategories: {[key in Categories]: string} = {
    Noun: "Noun",
    Verb: "Verb",
    Adjective: "Adjective",
    Adverb: "Adverb",
    Pronoun: "Pronoun",
    Preposition: "Preposition",
    Conjuction: "Conjuction",
    Interjection: "Interjection"
}

export const formSchema = z.object({
    word: z.string().max(20, {
        message: "Word cannot contain more than 20 words"
    }),
    native: z.string().max(20, {
        message: "Word cannot contain more than 20 words"
    }),
    pronunciation: z.string().max(20, {
        message: "Word cannot contain more than 20 words"
    }),
    category: z.enum(categories, {
        errorMap: () => ({ message: "Please select a category" })
    })
})