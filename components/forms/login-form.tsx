'use client'

import { login } from "@/server/session";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Toaster, toast } from 'sonner'

const LoginForm = () => {

    async function clientAction(formData: FormData) {
        const result = await login(formData)

        if (result?.error) {
            toast.error(result.error)
        }
    }

    return (
        <>
            <Toaster richColors />
            <form className="space-y-8" action={clientAction}>
                <div className="space-y-2">
                    <label htmlFor="username" className="font-medium text-sm">Username</label>
                    <Input id="username" name="username" placeholder="shadcn" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="font-medium text-sm">Password</label>
                    <Input id="password" name="password" type="password" placeholder="*****" />
                </div>
                <Button>Submit</Button>
            </form>
        </>
    );
}

export default LoginForm;