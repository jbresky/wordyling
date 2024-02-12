import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

const Words = ({ words }: { words: Word[] }) => {
    return (
        <>
            <h3 className="text-gray-700 max-sm:text-sm">{words.length < 1 ? 'You have no words saved yet!' : 'Hover to see its translation and category'}</h3>
            <section className="flex flex-wrap justify-center md:grid grid-cols-7 gap-6">
                   
                {words?.map((word: Word) => (
                    <HoverCard key={word.id}>
                        <HoverCardTrigger>
                            <p key={word.id} className="text-center text-sm cursor-pointer w-[90px] py-1 font-medium border-b border-black"
                            >
                                {word.text}
                            </p>
                            <HoverCardContent className="flex flex-col gap-2">
                                <p>{word.nativeText}</p>
                                <p className="text-[13px] text-gray-400">{word.classification}</p>
                            </HoverCardContent>
                        </HoverCardTrigger>
                    </HoverCard>
                ))}
            </section>
        </>
    );
}

export default Words;