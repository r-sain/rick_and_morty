import { Link } from 'react-router-dom';
import './CardsStyles.css';

const Cards = ({ results }) => {
  console.log('cards', results);
  return (
    <div id="cards-container">
      {results && results.length > 0 ? (
        results.map((result, index) => (
          <Link to={`/profile/${result.id}`} key={index}>
            <div className="card" key={index}>
              <div className="card__image">
                <img src={result.image} alt="image" />
              </div>
              <div className="card__name">{result.name}</div>
            </div>
          </Link>
        ))
      ) : (
        <div className="no-results">No characters found...</div>
      )}
    </div>
  );
};

export default Cards;
