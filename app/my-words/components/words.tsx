import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

const Words = ({ words }: { words: Word[] }) => {
    return (
        <>
            <h3 className="text-gray-700">Hover to see its translation and category</h3>
            <section className="grid grid-cols-6 gap-5 mt-1">
                {words?.map((word: Word) => (
                    <HoverCard key={word.id}>
                        <HoverCardTrigger>
                            <p key={word.id} className="text-center text-sm cursor-pointer py-1 font-medium px-6 bg-indigo-100/50 rounded-lg"
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