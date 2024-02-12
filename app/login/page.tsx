import { getSession } from "@/server/session";
import { redirect } from "next/navigation";
import LoginForm from "@/components/forms/login-form";

export default async function Login() {
    const session = await getSession()

    if (session) redirect('/')

    return (
        <section className="my-8 sm:w-1/2">
            <LoginForm />
        </section>
    )
}
