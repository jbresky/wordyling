import { fetchLastWords } from "@/server/actions/create-word"
import Link from "next/link"
import LastsContainer from "./last-container"

export default async function LastWords({ language }: { language: number }) {
    const words = await fetchLastWords(language)
    
    return (
        <>
            {words.length > 0 ? (
                <Link href='/my-words'>
                    <section className={`${language === 2 ? 'bg-amber-100' : "bg-rose-100"} ${language === 3 && 'bg-sky-100'} p-4 rounded-2xl hover:bg-slate-100 transition duration-300`}>
                        <div className="flex flex-col w-full gap-4">
                            <h1 className="text-xl">Last Words</h1>
                                <LastsContainer words={words} />
                        </div>
                    </section>
                </Link>
            ) : (
                <section className="p-4 rounded-2xl bg-sky-100/90 hover:bg-indigo-100/60 transition duration-300">
                    <p className="font-medium">No words found</p>
                </section>
            )}
        </>
    )
}
