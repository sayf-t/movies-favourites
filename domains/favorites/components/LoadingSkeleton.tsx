export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="border rounded p-4 animate-pulse">
          <div className="h-96 bg-gray-200 rounded mb-4"></div>{" "}
          {/* Adjusted height to match MovieCard */}
        </div>
      ))}
    </div>
  );
}
