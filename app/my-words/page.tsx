import { fetchAllWords } from "@/server/actions/create-word";
import { Suspense } from "react";
import Filters from "./components/filter";
import Words from "./components/words";

export default async function MyWords() {
  const words = await fetchAllWords()

  return (
    <div className="my-8 flex flex-col gap-4">
      <Filters />
      <Suspense fallback={'Loading...'}>
        {/* @ts-expect-error */}
        <Words words={words} />
      </Suspense>
    </div>
  )
}
