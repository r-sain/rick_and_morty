import { useEffect, useState } from 'react';
import axios from 'axios';
import './HomepageStyles.css';
import Pagination from '../../components/pagination/Pagination';
import SearchBox from '../../components/searchbox/SearchBox';
import Cards from '../../components/cards/Cards';
import Filter from '../../components/filters/Filter';

function Homepage() {
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]); // New state for filtered results
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [apiData, setApiData] = useState([]);
  console.log(apiData);
  let { info, results } = apiData;
  console.log('page', pageNumber);

  const handleFilterChange = filteredData => {
    setFilteredResults(filteredData); // Update the state with filtered data
    setPageNumber(1);
    setFiltersApplied(true);
  };

  let apiEndPoint = `https://rickandmortyapi.com/api/character?page=${pageNumber}&name=${searchTerm}`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(apiEndPoint)
      .then(response => {
        setApiData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error, 'no results');
        setApiData([]);
      });
  }, [apiEndPoint]);

  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm);
  };

  return (
    <div id="homepage">
      <div className="filterbar">
        <Filter data={results} onFilterChange={handleFilterChange} />
      </div>
      <div className="content">
        <div className="topbar">
          <div className="logo">
            <img
              src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
              alt="Rick_Logo"
            />
          </div>
          <div className="search__bar">
            <SearchBox onSearch={handleSearch} />
          </div>
          <div className="logo">
            <img
              src="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
              alt="Rick_Logo"
            />
          </div>
        </div>
        <div className="body">
          {loading ? (
            <div className="body__loading">Loading...</div>
          ) : (
            <Cards
              results={filteredResults.length > 0 ? filteredResults : results}
            />
          )}
        </div>
        <div className="bottombar">
          <div className="pagination">
            {!filtersApplied && (
              <Pagination
                info={info}
                filteredCount={filteredResults.length}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            )}
          </div>
        </div>{' '}
      </div>
    </div>
  );
}

export default Homepage;
