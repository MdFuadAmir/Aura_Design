import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // পেজ নাম্বার জেনারেট করার লজিক
  const getPageNumbers = () => {
    const pages = [];
    // const showMax = 5;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
      else if (currentPage > totalPages - 4) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      }
      else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-10">
      {/* Prev Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="p-3 rounded-xl border border-emerald-500/10 bg-white dark:bg-[#071c13] text-emerald-500 disabled:opacity-30 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
      >
        <FaChevronLeft size={12} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            disabled={page === "..."}
            onClick={() => page !== "..." && setCurrentPage(page)}
            className={`w-10 h-10 rounded-xl font-bold text-[11px] transition-all ${
              currentPage === page
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                : page === "..."
                  ? "bg-transparent text-gray-400 cursor-default"
                  : "bg-white dark:bg-[#071c13] text-gray-500 dark:text-emerald-100/40 border border-emerald-500/5 hover:border-emerald-500/30"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-3 rounded-xl border border-emerald-500/10 bg-white dark:bg-[#071c13] text-emerald-500 disabled:opacity-30 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
      >
        <FaChevronRight size={12} />
      </button>
    </div>
  );
};

export default Pagination;
