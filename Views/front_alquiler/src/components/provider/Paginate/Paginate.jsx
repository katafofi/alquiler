import React, { useState} from 'react';
import ReactPaginate from 'react-paginate';
import "./paginate.css"


const PaginateCataComponente = ({
   data, PerPage, handlePageChange
  }) => {
    const [currentPage, setCurrentPage]  = useState(0)
  
    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
        handlePageChange(selectedPage);
    };

    return (
       <div className='pagination-container'>
            <ReactPaginate
                previousLabel={'Anterior'}
                nextLabel={'Siguiente'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(data.length / PerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                breakLinkClassName={'page-link'}
                />
       </div>
    );
  };
  

export default PaginateCataComponente;