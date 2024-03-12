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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <h1 className="text-xl">Sentences</h1>
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