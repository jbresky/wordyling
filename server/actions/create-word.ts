'use server'

import { formSchema } from "@/lib/formSchema"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import z from "zod"

type CreateWord = z.infer<typeof formSchema>

export const createWord = async (values: CreateWord) => {
    const capsText = values.word;
    const capitalizedWord = capsText.charAt(0).toUpperCase() + capsText.slice(1);

    const wordAlreadySaved = await prisma.word.findFirst({
        where: { text: capitalizedWord }
    })

    if(wordAlreadySaved) { return { error: 'Word already saved' } }
    
    const wordNew = await prisma.word.create({
        data: {
            text: capitalizedWord,
            nativeText: values.native,
            classification: values.category,
            userId: 1,
            languageId: 1
        }
    })
    revalidatePath('/')

    if (!wordNew) return { error: 'Could not create word' }

    return { wordNew }
}

export const fetchAllWords = async () => {
    const data = await prisma.word.findMany()
    const sortedData = data.sort((a, b) => {
        // Compare lengths first
        if (a.text.length !== b.text.length) {
            return a.text.length - b.text.length; // Sort by length in ascending order
        } else {
            // If lengths are the same, sort alphabetically
            return a.text.localeCompare(b.text); // Sort alphabetically
        }
    });

    return sortedData;
}

export const fetchLastWords = async () => {
    const data = await prisma.word.findMany({
        take: 10,
        orderBy: {
            
        }
    })

    return data
}
