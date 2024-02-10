'use client'

import { AnimatePresence, motion } from 'framer-motion'

const LastsContainer = ({ words }: { words: any }) => {
    return (
        <div className="grid grid-cols-2 xsm:flex items-center flex-wrap gap-1 xsm:gap-4">
            <AnimatePresence presenceAffectsLayout>
                {words?.map((word: any) => (
                    <motion.div
                        layout
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        key={word.id}
                        className="w-fit text-center text-sm cursor-pointer py-1 font-semibold px-6 border border-[#d6d9e4] rounded-xl bg-[#3261fa]/50 text-[#ffffff]"
                    >
                        {word.text}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

export default LastsContainer;