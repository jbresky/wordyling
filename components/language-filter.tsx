'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FlagContainer from "./flags-container";
import { HoverCard } from "./ui/hover-card";

const LanguageFilter = () => {
    const searchParams = useSearchParams()
    const path = usePathname()
    const { replace } = useRouter()

    const handleLanguage = (id: "1" | "2" | "3") => {
        const params = new URLSearchParams(searchParams)
        params.set('language', id)

        if (path === "/my-words") {
            replace(`${path}?${params.toString()}`)
        } else {
            // this reload the page, which is necessary for the post word to work properly .
            window.location.assign(`${path}?${params.toString()}`)
        }
    }

    return (
        <HoverCard>
            <Select
                onValueChange={handleLanguage}
                defaultValue={searchParams.get('language')?.toString()}>
                <HoverCardTrigger>
                    <SelectTrigger className="w-fit px-0 h-10 border-2 rounded-lg hover:bg-slate-100 transition duration-200 border-slate-300 font-medium focus:bg-[#fcefef]">
                        <SelectValue placeholder={<FlagContainer code="DK" />} />
                    </SelectTrigger>
                </HoverCardTrigger>
                <HoverCardContent>
                    <SelectContent>
                        <SelectItem value="1" className="hover:bg-slate-100">
                            <FlagContainer code="DK" />
                        </SelectItem>
                        <SelectItem value="2" className="hover:bg-slate-100">
                            <FlagContainer code="DE" />
                        </SelectItem>
                        <SelectItem value="3" className="hover:bg-slate-100">
                            <FlagContainer code="FR" />
                        </SelectItem>
                    </SelectContent>
                </HoverCardContent>
            </Select>
        </HoverCard>
    );
}

export default LanguageFilter;