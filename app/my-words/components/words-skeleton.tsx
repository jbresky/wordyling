import { Skeleton } from "@/components/ui/skeleton";

const WordsSkeleton = () => {
    return (
        <div className="grid grid-cols-7 gap-6 mt-8">
            {/* @ts-ignore */}
              {[...Array(20).keys()].map((_, index) => ( 
                  <Skeleton key={index} className="h-2 w-[90px]" />
              ))}
              
        </div>
    );
}

export default WordsSkeleton;