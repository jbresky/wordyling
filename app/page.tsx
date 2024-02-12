import LastWords from "@/components/words/last-words";
import LastWordsSkeleton from "@/components/words/last-words-skeleton";
import PostForm from "@/components/forms/post-form";
import { getSession } from "@/server/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home() {
  const session = await getSession()

  if(!session) redirect('/login') 

  return (
    <>
      <main className="my-4 space-y-8">
        {/* <Suspense fallback={<LastWordsSkeleton />} > */}
          {}
          {/* @ts-expect-error */}
          <LastWords />
        {/* </Suspense> */}
        <PostForm />
      </main>
    </>
  );
}
