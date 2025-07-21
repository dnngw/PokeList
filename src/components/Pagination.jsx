const Pagination = ({
  currentPage,  
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  maxVisiblePages = 5
}) => {

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pageNumbers = [];

    const isMobile = window.innerWidth < 640;
    const visiblePages = isMobile ? 3 : maxVisiblePages;
    
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);
    
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);

    }
    
    return pageNumbers;
  };

     const handlePageClick = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
        onPageChange(pageNumber);
    }
  };

  return ( 
    <div className="flex flex-col items-center space-y-4">
      {/* Info Results */}
      <div className="text-sm text-black">
        Showing {startIndex}-{endIndex} of {totalItems} results
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 text-sm rounded-md transition-colors ${
            currentPage === 1
              ? 'bg-gray-200 text-black cursor-not-allowed'
              : 'bg-white border border-gray-300 text-black hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          Previous
        </button>

        {/* First page + ellipsis */}
        {getPageNumbers()[0] > 1 && (
          <>
            <button
              onClick={() => handlePageClick(1)}
              className="px-3 py-2 text-sm rounded-md bg-white border border-gray-300 text-black hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              1
            </button>
            {getPageNumbers()[0] > 2 && (
              <span className="px-2 py-2 text-black">...</span>
            )}
          </>
        )}

        {/* Page Numbers */}
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`px-3 py-2 text-sm rounded-md transition-colors ${
              currentPage === pageNumber
                ? 'bg-blue-500 text-white border border-blue-500'
                : 'bg-white border border-gray-300 text-black hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Last page + ellipsis */}
        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
              <span className="px-2 py-2 text-black">...</span>
            )}
            <button
              onClick={() => handlePageClick(totalPages)}
              className="px-3 py-2 text-sm rounded-md bg-white border border-gray-300 text-black hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 text-sm rounded-md transition-colors ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white border border-gray-300 text-gray-700   hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          Next
        </button>
      </div>

      {/* Page Info */}
      <div className="text-xs text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
    </div>
    
   );
}
 
export default Pagination;