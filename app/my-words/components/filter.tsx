'use client'

import LanguageFilter from "@/components/language-filter";
import Search from "@/components/search";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filters = () => {
    const searchParams = useSearchParams()
    const path = usePathname()
    const { replace } = useRouter()

    const handleFilter = (term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('filter', term)
            if (term === "All") {
                params.delete('filter')
            }
        } else {
            params.delete('filter')
        }
        replace(`${path}?${params.toString()}`)
    }

    return (
        <div className="flex max-sm:flex-col max-sm:gap-3 justify-between sm:items-center">
            <section className="flex gap-4">
                <Select
                    onValueChange={handleFilter}
                    defaultValue={searchParams.get('filter')?.toString()}>
                    <SelectTrigger className="sm:w-[120px] h-10 border-2 rounded-lg border-slate-300 font-medium focus:bg-[#fcefef]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Noun">Noun</SelectItem>
                        <SelectItem value="Verb">Verb</SelectItem>
                        <SelectItem value="Adjective">Adjective</SelectItem>
                        <SelectItem value="Adverb">Adverb</SelectItem>
                        <SelectItem value="Pronoun">Pronoun</SelectItem>
                        <SelectItem value="Preposition">Preposition</SelectItem>
                        <SelectItem value="Conjuction">Conjuction</SelectItem>
                        <SelectItem value="Interjection">Interjection</SelectItem>
                    </SelectContent>
                </Select>
                <LanguageFilter />
            </section>
            <Search placeholder="Search" />
        </div>
    );
}

export default Filters;