'use server'

import { formSchema } from "@/lib/formSchema"
import { revalidatePath } from "next/cache"
import z from "zod"
import prisma from '@/lib/prisma'
import { getSession } from "../session"

type CreateWord = z.infer<typeof formSchema>

export const createWord = async (values: CreateWord) => {
    const session = await getSession()

    const capsText = values.word;
    const capitalizedWord = capsText.charAt(0).toUpperCase() + capsText.slice(1);

    const capsNative = values.native;
    const capitalizedNativeWord = capsNative.charAt(0).toUpperCase() + capsNative.slice(1);

    const wordAlreadySaved = await prisma.word.findFirst({
        where: { 
            word: capitalizedWord,
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

    const capsText = query;
    const capitalizeQuery = capsText && capsText.charAt(0).toUpperCase() + capsText.slice(1);

    const data = await prisma.word.findMany({
        where: {
            user_id: session.user.id,
            word: capitalizeQuery,
            category: filter,
            language_id: language
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