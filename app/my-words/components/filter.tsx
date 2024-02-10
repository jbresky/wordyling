import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const Filters = () => {
    return (
        <section className="flex gap-4 items-center">
            <Button className="w-1/5 text-black border-2 rounded-lg shadow-none border-slate-300 hover:bg-[#f8f8f8] bg-white">
                All
            </Button>

            <Select>
                <SelectTrigger className="w-1/5 border-2 rounded-lg border-slate-300 font-medium">
                    <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
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
        </section>
    );
}

export default Filters;