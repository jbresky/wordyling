'use client'

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteWord } from "@/server/actions/create-word"
import { AnimatePresence, motion } from "framer-motion"

const WordContainer = ({ word }: { word: Word }) => {
    return (
        <AnimatePresence presenceAffectsLayout>
            <motion.div
                layout
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                key={word.id}
            >
                <HoverCard key={word.id}>
                    <HoverCardTrigger>
                        <p key={word.id} className="text-center text-sm cursor-pointer w-[90px] py-1 font-medium border-b border-black"
                        >
                            {word.word}
                        </p>
                        <HoverCardContent className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <p>{word.nativeWord}</p>
                                <p className="italic tracking-wide text-[13px] text-gray-700">
                                    {word.pronunciation ? `[ ${word.pronunciation} ]` : null}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-[13px] text-gray-400">{word.category}</p>
                                <TrashIcon className="cursor-pointer" onClick={() => deleteWord({ id: word.id })} color="red" />
                            </div>
                        </HoverCardContent>
                    </HoverCardTrigger>
                </HoverCard>
            </motion.div>
        </AnimatePresence>
    )
}

export default WordContainer;