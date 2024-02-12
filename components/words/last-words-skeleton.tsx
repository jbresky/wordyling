import { Skeleton } from "../ui/skeleton";

const LastWordsSkeleton = () => {
    return (
        <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[150px]" />
        </div>
    );
}

export default LastWordsSkeleton;