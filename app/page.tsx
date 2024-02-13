import LastWords from "@/components/words/last-words";
import PostForm from "@/components/forms/post-form";
import { getSession } from "@/server/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home({
  searchParams
}: {
  searchParams: { language: string }
}) {
  const session = await getSession()

  if (!session) redirect('/login')

  const language = Number(searchParams?.language)

  return (
    <>
      <main className="my-4 space-y-8">
        <Suspense fallback={'Loading...'} >
          {/* @ts-expect-error Async Server Component */}
          <LastWords language={language || 1} />
        </Suspense>
        <PostForm languageId={language || 1} />
      </main>
    </>
  );
}
