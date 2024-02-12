import RegisterForm from "@/components/register-form";
import { getSession } from "@/server/session";
import { redirect } from "next/navigation";

export default async function Register() {
    const session = await getSession()

    if (session) redirect('/')

    return (
        <section className="my-8 sm:w-1/2">
            <RegisterForm />
        </section>
    )
}
