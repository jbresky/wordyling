import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Image from "next/image";

const Flags = () => {
    return ( 
        <HoverCard>
        <HoverCardTrigger>
            <Image alt="denmark" width={50} height={50} src="https://flagsapi.com/DK/shiny/64.png" />
        </HoverCardTrigger>
        <HoverCardContent className="w-fit p-0">
            <div className="px-8 py-4 hover:bg-slate-100">
                <Image alt="german" width={50} height={50} src="https://flagsapi.com/DE/shiny/64.png" />
            </div>
            <div className="px-8 py-4 hover:bg-slate-100">
                <Image alt="german" width={50} height={50} src="https://flagsapi.com/FR/shiny/64.png" />
            </div>
        </HoverCardContent>
    </HoverCard>
     );
}
 
export default Flags;