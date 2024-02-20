import WordContainer from "./word-container";
import { fetchAllWords } from "@/server/actions/create-word";

interface Filters {
    query: string,
    filter: string,
    language: number
}

const Words = async ({ query, filter, language }: Filters) => {
    const words = await fetchAllWords(query, filter, language)

    return (
        <>
            <div className="flex items-center justify-between">
                {/* mobile heading - only "tap" change*/}
                <h3 className="md:hidden text-gray-700 max-sm:text-sm">
                    {words.length < 1 ? 'No words found' : 'Tap to see translations and more'}
                </h3>

                <h3 className="hidden md:block text-gray-700 max-sm:text-sm">
                    {words.length < 1 ? 'No words found' : 'Hover to see translations and more'}
                </h3>
            </div>
            <section className="flex flex-wrap max-lg:justify-between justify-center lg:grid grid-cols-8 items-center gap-4 sm:gap-8">
                {words?.map((word: Word) => (
                    <WordContainer key={word.id} word={word} />
                ))}
            </section>
        </>
    );
}

export default Words;