'use client'

import { deleteSentence } from "@/server/actions/create-word";
import { TrashIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";

const Sentences = ({ sentences }: { sentences: Sentence[] }) => {
    return (
        <div className="flex flex-col sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {sentences.length > 0 ?
                sentences.map(sentence => (
                    <AnimatePresence presenceAffectsLayout>
                        <motion.div
                            layout
                            animate={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            key={sentence.id}
                            className="rounded-lg p-2 text-sm w-full space-y-2 bg-slate-100"
                        >
                            <div className="flex items-center justify-between">
                                <p className="border-b pb-1"><span className="font-semibold"> {sentence.word.word}</span> as <span> {sentence.category}</span></p>
                                <TrashIcon className="cursor-pointer" onClick={() => deleteSentence(sentence.id)} color="red" />
                            </div>
                            <p>{sentence.sentence}</p>
                        </motion.div>
                    </AnimatePresence>
                )) : (
                    <p>No sentences found!</p>
                )}
        </div>
    );
}

export default Sentences;