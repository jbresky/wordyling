'use client'

import { deleteSentence } from "@/server/actions/create-word";
import { TrashIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Sentences = ({ sentences }: { sentences: Sentence[] }) => {
    return (
        <div className="flex flex-col sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {sentences.length > 0 ?
                sentences.map(sentence => (
                    <AnimatePresence key={sentence.id} presenceAffectsLayout>
                        <motion.div
                            layout
                            animate={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            className="rounded-lg text-sm w-full border-2 bg-slate-100 border-slate-200"
                        >
                            <div className="flex items-center justify-between border-b p-[7px]">
                                <p><span className="font-semibold"> {sentence.word.word}</span> as <span> {sentence.category}</span></p>
                                <TrashIcon className="cursor-pointer" onClick={() => deleteSentence(sentence.id)} color="red" />
                            </div>

                            <HoverCard key={sentence.id}>
                                <HoverCardTrigger className="hidden md:block w-full">
                                    <p className="bg-white p-2 rounded-bl-lg rounded-br-lg">{sentence.sentence}</p>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <p>{sentence.translation}</p>
                                </HoverCardContent>
                            </HoverCard>

                            <Popover key={sentence.id}>
                                <PopoverTrigger className="md:hidden w-full text-left">
                                    <p className="bg-white p-2 rounded-bl-lg rounded-br-lg">{sentence.sentence}</p>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <p>{sentence.translation}</p>
                                </PopoverContent>
                            </Popover>
                        </motion.div>
                    </AnimatePresence>
                )) : (
                    <p>No sentences found!</p>
                )}
        </div>
    );
}

export default Sentences;