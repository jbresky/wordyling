import { fetchLastWords } from "@/server/actions/create-word"
import Link from "next/link"
import { Suspense } from "react"
import LastsContainer from "./last-container"
import LastWordsSkeleton from "./last-words-skeleton"

export default async function LastWords() {
    const words = await fetchLastWords()
    return (
        <>
            {words.length > 0 ? (
                <Link href='/my-words'>
                    <section className="p-4 rounded-2xl bg-indigo-100/90 hover:bg-indigo-100/60 transition duration-300">
                        <div className="flex flex-col w-full gap-4">
                            <h1 className="text-xl">Last Words</h1>
                            <Suspense fallback={<LastWordsSkeleton />}>
                                <LastsContainer words={words} />
                            </Suspense>
                        </div>
                    </section>
                </Link>
            ) : (
                null
            )}
        </>
    )
}
