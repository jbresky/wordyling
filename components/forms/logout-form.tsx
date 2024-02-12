import { logout } from "@/server/session";
import { redirect } from "next/navigation";

const Logout = () => {
    return (
        <form action={async () => {
            'use server';
            await logout()
            redirect('/login')
        }}
        >
            <button type="submit" className="hover:underline">Logout</button>
        </form>
    );
}

export default Logout;