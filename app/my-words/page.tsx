import { getSession } from "@/server/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Filters from "./components/filter";
import Words from "./components/words";
import WordsSkeleton from "./components/words-skeleton";

export default async function MyWords({
  searchParams
}: {
  searchParams?: { query?: string, filter?: string, language?: string }
}) {
  const session = await getSession()
  if (!session) redirect('/login')

  const query = searchParams?.query || ''

  const language = Number(searchParams?.language)

  return (
    <div className="my-8 flex flex-col gap-4">
      <Filters />
      <Suspense key={query + 1} fallback={<WordsSkeleton />}>
        {/* @ts-ignore */} 
        <Words language={language ? language : 1} query={searchParams?.query} filter={searchParams?.filter} />
      </Suspense>
    </div>
  )
}
