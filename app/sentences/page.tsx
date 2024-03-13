import LanguageFilter from "@/components/language-filter";
import Search from "@/components/search";
import Sentences from "@/components/sentences";
import { fetchSentences } from "@/server/actions/create-word";
import { getSession } from "@/server/session";
import { redirect } from "next/navigation";

const SentencesPage = async ({ searchParams }: {
    searchParams?: {
        language: number,
        query: string
    }
}) => {
    const session = await getSession()
    if (!session) redirect('/login')

    const sentences = await fetchSentences(searchParams?.query, Number(searchParams?.language) || 1)

    return (
        <section className="my-8 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">

                <div className="flex flex-col gap-2">
                    <h1 className="text-xl">Sentences</h1>
                    <h3 className="md:hidden text-sm">Tap the sentence to see its translation</h3>
                    <h3 className="hidden md:block text-sm">Hover the sentence to see its translation</h3>
                </div>

                <div className="flex items-center gap-4">
                    <Search placeholder="Search by content" />
                    <LanguageFilter />
                </div>
            </div>
            <Sentences sentences={sentences} />
        </section>
    )
}

export default SentencesPage;