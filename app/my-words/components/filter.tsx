import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const Filters = () => {
    return (
        <section className="flex gap-4">
            <Select> 
                <SelectTrigger className="sm:w-[150px] border-2 rounded-lg border-slate-300 font-medium focus:bg-[#fcefef]">
                    <SelectValue placeholder="Filter" />
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
        </section>
    );
}

export default Filters;