import LastWords from "@/components/words/last-words";
import PostForm from "@/components/forms/post-form";
import { getSession } from "@/server/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Words from "./my-words/components/words";

export default async function Home({
  searchParams
}: {
  searchParams: { language: string, query?: string }
}) {
  const session = await getSession()

  if (!session) redirect('/login')
  const showModal = searchParams?.query

  const language = Number(searchParams?.language)

  return (
    <>
      <main className="my-4">
        <Suspense fallback={'Loading...'} >
           {/* @ts-ignore Async Server Component */}
          <LastWords language={language || 1} />
        </Suspense>
        <PostForm languageId={language || 1} />
        {showModal && (
          // @ts-ignore Async Server Component
          <Words query={showModal} language={language || 1} isSentence={true} />
        )}
      </main>
    </>
  );
}
