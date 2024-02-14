'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce"

const WAIT_BETWEEN_CHANGE = 500 

const Search = ({ placeholder }: { placeholder: string }) => {
    const searchParams = useSearchParams()
    const path = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if(term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }

        replace(`${path}?${params.toString()}`)
    }, WAIT_BETWEEN_CHANGE)

    return ( 
        <div>
            <Input
                className="border-2 rounded-lg border-slate-300"
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={placeholder}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
     );
}

export default Search;