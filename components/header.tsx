import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className="flex m-auto items-center justify-between">
            <Link href='/' className="text-lg sm:text-4xl font-mono">
                Wordyling
            </Link>
            <ul className="flex items-center gap-6">
                <Link href='/my-words' className="hidden sm:block font-medium hover:underline">
                    My words
                </Link>
                <Image alt="belgium" width={50} height={50} src="https://flagsapi.com/DK/shiny/64.png" />
            </ul>
        </header>
    );
}

export default Header;