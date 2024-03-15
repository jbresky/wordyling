import { fetchLastWords } from "@/server/actions/create-word"
import Link from "next/link"
import LastsContainer from "./last-container"

export default async function LastWords({ language }: { language: number }) {
    const words = await fetchLastWords(language)
    let languageName
    switch (language) {
        case 1: 
            languageName = "Danish"
            break;
        case 2:
            languageName = "German"
            break
        case 3: 
            languageName = "French"
            break;
        case 4:
            languageName = "Spanish"
            break;
        case 5:
            languageName = "Italian"
            break;
        case 6:
            languageName = "Portuguese"
            break;
        default:
            languageName = "Danish"
    }
    return (
        <>
            {words.length > 0 ? (
                <Link href={`/my-words?language=${language}`}>
                    <section className={`${language === 2 ? 'bg-amber-100' : "bg-rose-100"} ${language === 3 && 'bg-sky-100'} ${language === 4 && 'bg-gradient-to-r from-yellow-100 to-red-200'} ${language === 5 && 'bg-green-100'} ${language === 6 && 'bg-gradient-to-r from-green-200 to-red-200 to-b'} p-4 rounded-2xl hover:opacity-70 transition duration-300`}>
                        <div className="flex flex-col w-full gap-4">
                            <h1 className="text-xl">Last Words</h1>
                                <LastsContainer words={words} />
                        </div>
                    </section>
                </Link>
            ) : (
                <section className="p-4 rounded-2xl bg-slate-100 hover:bg-indigo-100/60 transition duration-300">
                    <p>No words saved in {languageName} </p>
                </section>
            )}
        </>
    )
}
