import SkeletonGrid from "@/components/skeletongrid";

const Loading = () => {
  let amountOfComponents: number[] = [0, 1, 2, 3];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: amountOfComponents.length }).map((_, index) => (
        <SkeletonGrid index={index} />
      ))}
    </div>
  );
};

export default Loading;
