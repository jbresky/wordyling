import { fetchAllWords } from "@/server/actions/create-word";
import { getSession } from "@/server/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Filters from "./components/filter";
import Words from "./components/words";

export default async function MyWords() {
  const session = await getSession()
  if (!session) redirect('/login')
  
  const words = await fetchAllWords()

  return (
    <div className="my-8 flex flex-col gap-4">
      <Filters />
      <Suspense fallback={'Loading...'}>
        <Words words={words} />
      </Suspense>
    </div>
  )
}
