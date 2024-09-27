"use client";

import { useRouter } from "next/navigation";

interface MovieListPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function MovieListPagination({ currentPage, totalPages }: MovieListPaginationProps) {
  const router = useRouter();
  const maxButtonsToShow = 5;
  const pageCount = Math.min(totalPages, 500);
  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(maxButtonsToShow / 2), pageCount - maxButtonsToShow + 1)
  );
  const endPage = Math.min(startPage + maxButtonsToShow - 1, pageCount);
  const pageButtons = [...Array(endPage - startPage + 1).keys()].map((index) => startPage + index);

  const navigateToPage = (page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <div className="flex flex-wrap justify-center mt-8 space-x-2 space-y-2">
      {currentPage > 1 && (
        <>
          <button
            onClick={() => navigateToPage(1)}
            className="px-3 py-2 bg-blue-500 text-white rounded text-sm md:text-base"
          >
            First
          </button>
          <button
            onClick={() => navigateToPage(currentPage - 1)}
            className="px-3 py-2 bg-blue-500 text-white rounded text-sm md:text-base"
          >
            Prev
          </button>
        </>
      )}
      {pageButtons.map((page) => (
        <button
          key={page}
          onClick={() => navigateToPage(page)}
          className={`px-3 py-2 rounded text-sm md:text-base ${
            currentPage === page ? "bg-blue-700 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {page}
        </button>
      ))}
      {currentPage < pageCount && (
        <>
          <button
            onClick={() => navigateToPage(currentPage + 1)}
            className="px-3 py-2 bg-blue-500 text-white rounded text-sm md:text-base"
          >
            Next
          </button>
          <button
            onClick={() => navigateToPage(pageCount)}
            className="px-3 py-2 bg-blue-500 text-white rounded text-sm md:text-base"
          >
            Last
          </button>
        </>
      )}
    </div>
  );
}
