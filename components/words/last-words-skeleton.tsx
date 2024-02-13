import { Skeleton } from "../ui/skeleton";

const LastWordsSkeleton = () => {
    return (
        <div className="grid grid-cols-7 gap-6 mt-8">
                {/* @ts-expect-error */}
              {[...Array(20).keys()].map((_, index) => ( 
                  <Skeleton key={index} className="h-2 w-[90px]" />
              ))}
              
        </div>
    );
}

export default LastWordsSkeleton;