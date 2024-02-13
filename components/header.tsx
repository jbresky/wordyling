import Link from "next/link";
import { GiAbstract013 } from "react-icons/gi";
import Flags from "./flags";
import Logout from "./forms/logout-form";

const Header = async ({ session }: { session?: any }) => {

    return (
        <header className="flex m-auto items-center justify-between">
            <Link href='/' className="text-lg flex items-center sm:text-3xl">
                W
                <GiAbstract013 />
                RDYLING
            </Link>
            <ul className="flex items-center gap-2 sm:gap-6 max-sm:text-sm">
                {session ? (
                    <>
                        <Link href='/my-words' className="hidden sm:block hover:underline">
                            My words
                        </Link>
                        <Logout />
                        <Flags />
                    </>
                ) : (
                    <>
                        <Link className="hover:underline" href='/login'>Login</Link>
                        <Link className="hover:underline" href='/register'>Register</Link>
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header;