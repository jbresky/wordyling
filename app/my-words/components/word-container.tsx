'use client'

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { PiDotsThreeBold } from "react-icons/pi";
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteWord } from "@/server/actions/create-word"
import { AnimatePresence, motion } from "framer-motion"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import SentenceDialogForm from "@/components/forms/sentence-form";

const WordContainer = ({ word, isSentence, language }: { word: Word, isSentence?: boolean, language: number }) => {
    return (
        <AnimatePresence presenceAffectsLayout>
            <motion.div
                layout
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                key={word.id}
            >
                {/* mobile popover */}
                {isSentence ? (
                    <SentenceDialogForm languageId={language} word={word} />
                ) : (
                    <>
                        <Popover key={word.id}>
                            <PopoverTrigger className="md:hidden text-center text-sm cursor-pointer w-[90px] py-1 font-medium border-b border-black">
                                {word.word}
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <p>{word.nativeWord}</p>
                                        <p className="italic tracking-wide text-[13px] text-gray-700">
                                            {word.pronunciation ? `[ ${word.pronunciation} ]` : null}
                                        </p>
                                    </div>
                                    <PiDotsThreeBold />
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-[13px] text-gray-400">{word.category}</p>
                                    <TrashIcon className="cursor-pointer" onClick={() => deleteWord({ id: word.id })} color="red" />
                                </div>
                            </PopoverContent>
                        </Popover>

                        <HoverCard key={word.id}>
                            <HoverCardTrigger>
                                <p key={word.id} className="hidden md:block text-center text-sm cursor-pointer w-[90px] py-1 font-medium border-b border-black"
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
                    </>
                )}


            </motion.div>
        </AnimatePresence>
    )
}

export default WordContainer;