import React, { useEffect, useState } from 'react';
import './FilterStyles.css';
const Filter = ({ data, onFilterChange }) => {
  console.log(data);
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedEpisode, setSelectedEpisode] = useState('');

  // ********************Keeping only unique values for each****************************
  const uniqueStatusValues = [...new Set(data?.map(item => item.status))];
  const uniqueLocationValues = [
    ...new Set(data?.map(item => item.location.name)),
  ];
  const uniqueGenderValues = [...new Set(data?.map(item => item.gender))];
  const uniqueSpeciesValues = [...new Set(data?.map(item => item.species))];
  const uniqueTypeValues = [...new Set(data?.map(item => item.type))];

  // ********************Keeping only unique values for each****************************

  // *********************************************Individual handlers**************************
  const handleStatusChange = event => {
    setSelectedStatus(event.target.value);
    setSelectedLocation('');
    setSelectedEpisode('');
    setSelectedGender('');
    setSelectedSpecies('');
    setSelectedType('');
  };
  const handleLocationChange = event => {
    setSelectedLocation(event.target.value);
    setSelectedStatus('');
    setSelectedEpisode('');
    setSelectedGender('');
    setSelectedSpecies('');
    setSelectedType('');
  };

  const handleGenderChange = event => {
    setSelectedGender(event.target.value);
    setSelectedStatus('');
    setSelectedLocation('');
    setSelectedEpisode('');
    setSelectedSpecies('');
    setSelectedType('');
  };
  const handleSpeciesChange = event => {
    setSelectedSpecies(event.target.value);
    setSelectedGender('');
    setSelectedStatus('');
    setSelectedLocation('');
    setSelectedEpisode('');
    setSelectedType('');
  };
  const handleTypeChange = event => {
    setSelectedType(event.target.value);
    setSelectedSpecies('');
    setSelectedGender('');
    setSelectedStatus('');
    setSelectedLocation('');
    setSelectedEpisode('');
  };
  // *******************************************************************************

  const handleApply = () => {
    const filteredData = data?.filter(item => {
      const statusFilter = selectedStatus
        ? item.status === selectedStatus
        : true;
      const locationFilter = selectedLocation
        ? item.location.name === selectedLocation
        : true;
      const episodeFilter = selectedEpisode
        ? item.episode.includes(selectedEpisode)
        : true;
      const genderFilter = selectedGender
        ? item.gender === selectedGender
        : true;
      const speciesFilter = selectedSpecies
        ? item.species === selectedSpecies
        : true;
      const typeFilter = selectedType ? item.type === selectedType : true;

      return (
        statusFilter &&
        locationFilter &&
        episodeFilter &&
        genderFilter &&
        speciesFilter &&
        typeFilter
      );
    });

    onFilterChange(filteredData);
  };
  const handleClear = () => {
    setSelectedStatus('');
    setSelectedLocation('');
    setSelectedEpisode('');
    setSelectedGender('');
    setSelectedSpecies('');
    setSelectedType('');
    window.location.reload();
  };

  return (
    <div id="filter">
      <h4>Filters</h4>
      <div className="status__dropdown">
        <label>Status:</label>
        <select onChange={handleStatusChange} value={selectedStatus}>
          <option value="">Select...</option>
          {uniqueStatusValues.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className="location__dropdown">
        <label>Location:</label>
        <select value={selectedLocation} onChange={handleLocationChange}>
          <option value="">Select...</option>
          {uniqueLocationValues.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="gender__dropdown">
        <label>Gender:</label>
        <select value={selectedGender} onChange={handleGenderChange}>
          <option value="">Select...</option>
          {uniqueGenderValues.map((episode, index) => (
            <option key={index} value={episode}>
              {episode}
            </option>
          ))}
        </select>
      </div>

      <div className="species__dropdown">
        <label>Species:</label>
        <select value={selectedSpecies} onChange={handleSpeciesChange}>
          <option value="">Select...</option>
          {uniqueSpeciesValues.map((episode, index) => (
            <option key={index} value={episode}>
              {episode}
            </option>
          ))}
        </select>
      </div>

      <div className="type__dropdown">
        <label>Type:</label>
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="">Select...</option>
          {uniqueTypeValues.map((episode, index) => (
            <option key={index} value={episode}>
              {episode}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleApply} className="applybtn">
        Apply
      </button>
      <button onClick={handleClear} className="clearbtn">
        Clear
      </button>
    </div>
  );
};

export default Filter;
