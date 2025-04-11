const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'border border-gray-300'}`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;