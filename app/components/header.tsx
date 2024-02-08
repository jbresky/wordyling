import Image from "next/image";

const Header = () => {
    return (
        <header className="flex m-auto items-center justify-between">
            <h1 className="text-4xl">
                Wordyling
            </h1>
            <Image alt="belgium" width={50} height={50} src="https://flagsapi.com/DK/shiny/64.png" />
        </header>
    );
}

export default Header;