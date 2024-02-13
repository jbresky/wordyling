import Image from "next/image";

const FlagContainer = ({ code }: { code: string }) => {
    return (
        <Image className="mx-2" alt="denmark" width={40} height={40} src={`https://flagsapi.com/${code}/shiny/64.png`} />
    );
}

export default FlagContainer;