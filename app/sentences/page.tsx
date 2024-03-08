import LanguageFilter from "@/components/language-filter";
import { fetchSentences } from "@/server/actions/create-word";
import { getSession } from "@/server/session";
import { TrashIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";

const SentencesPage = async ({searchParams} : {
    searchParams?: {
        language: number
    }
}) => {
    const session = await getSession()
    if (!session) redirect('/login')

    const sentences = await fetchSentences(Number(searchParams?.language) || 1)

    return (
        <section className="my-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl">Sentences</h1>
                <LanguageFilter />
            </div>
            <div className="flex items-center gap-4">

                {sentences.length > 0 ?
                sentences.map(sentence => (
                    <div key={sentence.id} className="rounded-lg p-2 text-sm w-full space-y-2 bg-slate-100">
                        <div className="flex items-center justify-between">
                            <p className="border-b pb-1"><span className="font-semibold"> {sentence.word.word}</span> as <span> {sentence.category}</span></p>
                            <TrashIcon color="red" />
                        </div>
                        <p>{sentence.sentence}</p>
                    </div>
                )) : (
                    <p>No sentences found!</p>
                )}
            </div>
        </section>
    )
}

export default SentencesPage;