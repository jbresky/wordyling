import { login } from "@/server/session";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const LoginForm = () => {
    return (
        <form className="space-y-8" action={async (formData) => {
            'use server';
            await login(formData)
            redirect('/')
        }}
        >
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

    );
}

export default LoginForm;