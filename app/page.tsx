import LastWords from "@/components/last-words";
import PostForm from "@/components/post-form";

export default async function Home() {

  return (
    <>
      <main className="my-4">
        {/* @ts-expect-error */}
        <LastWords />
        <PostForm />
      </main>
    </>
  );
}
