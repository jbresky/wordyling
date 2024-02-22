import Link from "next/link";
import { GiAbstract013 } from "react-icons/gi";
import Logout from "./forms/logout-form";

interface HeaderProps {
    session: any,
    searchParams?: {
        language: string
    }
}

const Header = ({ session, searchParams }: HeaderProps) => {
    const language = searchParams?.language
    // console.log(language);
    

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
                        <Link href={`/my-words?${language}`} className="hover:underline">
                            My words
                        </Link>
                        <Logout />
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