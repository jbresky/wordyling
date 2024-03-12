'use server'

import { formSchema, sentenceFormSchema } from "@/lib/formSchema"
import { revalidatePath } from "next/cache"
import z from "zod"
import prisma from '@/lib/prisma'
import { getSession } from "../session"

type CreateWord = z.infer<typeof formSchema>
type CreateSentence = z.infer<typeof sentenceFormSchema>

export const createWord = async (values: CreateWord) => {
    const session = await getSession()

    const capsText = values.word;
    const capitalizedWord = capsText.charAt(0).toUpperCase() + capsText.slice(1);

    const capsNative = values.native;
    const capitalizedNativeWord = capsNative.charAt(0).toUpperCase() + capsNative.slice(1);

    const wordAlreadySaved = await prisma.word.findFirst({
        where: {
            word: capitalizedWord,
            language_id: values.language,
            user_id: session.user.id
        }
    })

    if (wordAlreadySaved) { return { error: 'Word already saved' } }

    const wordNew = await prisma.word.create({
        data: {
            word: capitalizedWord,
            nativeWord: capitalizedNativeWord,
            pronunciation: values.pronunciation,
            category: values.category,
            user_id: session.user.id,
            language_id: values.language
        }
    })
    revalidatePath('/')

    if (!wordNew) return { error: 'Could not create word' }

    return { wordNew }
}

export const fetchAllWords = async (query?: string, filter?: string, language?: number) => {
    const session = await getSession()

    const capitalizedQuery = query && query.charAt(0).toUpperCase() + query.slice(1);

    const data = await prisma.word.findMany({
        where: {
            user_id: session.user.id,
            word: {
                contains: capitalizedQuery
            },
            category: filter,
            language_id: language
        },
        include: {
            Sentence: true
        }
    })

    const sortedData = data.sort((a, b) => {
        // Compare lengths first
        if (a.word.length !== b.word.length) {
            return a.word.length - b.word.length; // Sort by length in ascending order
        } else {
            // If lengths are the same, sort alphabetically
            return a.word.localeCompare(b.word); // Sort alphabetically
        }
    });

    return sortedData;
}

export const fetchLastWords = async (language?: number): Promise<Word[]> => {
    const session = await getSession()

    const data = await prisma.word.findMany({
        where: {
            user_id: session.user.id,
            language_id: language
        },
        take: 10,
        orderBy: {
            createdAt: 'desc'
        }
    })

    return data
}

export const deleteWord = async ({ id }: { id: number }) => {
    try {
        await prisma.word.delete({ where: { id } })
        revalidatePath('/my-words')
        return { success: "Product deleted" }
    } catch (error) {
        return { error: "Something went wrong" }
    }
}

export const createSentence = async (values: CreateSentence) => {
    const session = await getSession()

    const capsText = values.sentence;
    const capitalizedSentence = capsText.charAt(0).toUpperCase() + capsText.slice(1);

    const sentenceAlreadySaved = await prisma.sentence.findFirst({
        where: {
            sentence: capitalizedSentence,
            category: values.category,
            language_id: values.language,
            userId: session.user.id,
            word_id: values.word_id
        }
    })

    if (sentenceAlreadySaved) { return { error: 'Sentence already saved' } }

    const newSentence = await prisma.sentence.create({
        data: {
            sentence: capitalizedSentence,
            category: values.category,
            userId: session.user.id,
            language_id: values.language,
            word_id: values.word_id
        }
    })

    revalidatePath('/')

    if (!newSentence) return { error: 'Could not create word' }

    return { newSentence }
}

export const fetchSentences = async (query?: string, language?: number) => {
    const session = await getSession()

    const capitalizedQuery = query && query.charAt(0).toUpperCase() + query.slice(1);

    const data = await prisma.sentence.findMany({
        where: {
            userId: session.user.id,
            language_id: language,
            sentence: {
                contains: capitalizedQuery
            }
        },
        include: {
            word: true,
            language: true
        }
    })

    return data;
}

export const deleteSentence = async (id: number) => {
    try {
        await prisma.sentence.delete({ where: { id } })
        revalidatePath('/sentences')
        return { success: "Product deleted" }

    } catch (error) {
        return { error: "Something went wrong" }
    }
}