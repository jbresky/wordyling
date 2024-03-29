'use client'

import { AnimatePresence, motion } from 'framer-motion'

const LastsContainer = ({ words }: { words: Word[] }) => {
    return (
        <div className="flex items-center flex-wrap gap-2 xsm:gap-4">
                <AnimatePresence presenceAffectsLayout>
                    {words?.map((word: any) => (
                        <motion.div
                            layout
                            animate={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            key={word.id}
                            className="w-[120px] lg:w-fit text-center text-sm cursor-pointer py-1 font-medium px-6 rounded-xl bg-white"
                        >
                            {word.word}
                        </motion.div>
                    ))}
                </AnimatePresence>
        </div>
    );
}

export default LastsContainer;