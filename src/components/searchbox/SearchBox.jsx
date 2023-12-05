import { useEffect, useState } from 'react';
import './SearchBoxStyles.css';

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };
  return (
    <div id="Searchbox">
      <input
        type="text"
        placeholder="Search Character"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBox;
