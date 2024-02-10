import { fetchAllWords } from "@/server/actions/create-word";
import Filters from "./components/filter";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


export default async function MyWords() {
  const words = await fetchAllWords()

  return (
    <div className="my-8 flex flex-col gap-4">
      <Filters />
      <h3>Hover to see translations</h3>
      <section className="grid grid-cols-6 gap-5">
        {words?.map((word: any) => (
          <HoverCard key={word.id}>
            <HoverCardTrigger>
              <p key={word.id} className="text-center text-sm cursor-pointer py-1 font-semibold px-6 border-2 bg-indigo-100/50 border-rose-100 rounded-xl"
              >
                {word.text}
              </p>
              <HoverCardContent>
                {word.nativeText}
              </HoverCardContent>
            </HoverCardTrigger>
          </HoverCard>
        ))}
      </section>
    </div>
  )
}
