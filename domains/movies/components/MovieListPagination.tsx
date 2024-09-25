"use client";

import { useRouter } from "next/navigation";

export default function MovieListPagination({ currentPage }: { currentPage: number }) {
  const router = useRouter();

  const goToPage = (page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {currentPage > 1 && (
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
      )}
      <button
        onClick={() => goToPage(currentPage + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>
    </div>
  );
}
