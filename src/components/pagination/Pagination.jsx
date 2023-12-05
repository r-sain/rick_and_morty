import ReactPaginate from 'react-paginate';
import './PaginationStyles.css';

const Pagination = ({ pageNumber, setPageNumber, info, filteredCount }) => {
  return (
    <ReactPaginate
      pageCount={filteredCount ? Math.ceil(filteredCount / 20) : info?.pages}
      containerClassName={'pagination'}
      activeClassName={'active'}
      previousClassName={'previous'}
      nextClassName={'next'}
      onPageChange={data => {
        setPageNumber(data.selected + 1);
      }}
    />
  );
};

export default Pagination;
