import { fetchLastWords } from "@/server/actions/create-word"
import Link from "next/link"
import LastsContainer from "./last-container"

export default async function LastWords() {
    const words = await fetchLastWords()
    return (
        <Link href='/my-words'>
            <section className="border-2 border-slate-200 p-4 rounded-2xl bg-indigo-100/90 hover:bg-indigo-100/60 transition duration-300">
                <div className="flex flex-col w-full gap-2">
                    <h1 className="text-xl font-semibold">Last Words</h1>
                    <LastsContainer words={words} />
                </div>
            </section>
        </Link>
    )
}
