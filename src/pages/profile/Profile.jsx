import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './ProfileStyles.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Profile = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCharacterData = async () => {
        try {
          const response = await axios.get(
            `https://rickandmortyapi.com/api/character/${id}`
          );
          setCharacter(response.data);

          const episodesData = await Promise.all(
            response.data.episode.map(async episodeUrl => {
              const episodeResponse = await axios.get(episodeUrl);
              return episodeResponse.data;
            })
          );
          setEpisodes(episodesData);

          const locationResponse = await axios.get(response.data.location.url);
          setLocation(locationResponse.data);
        } catch (error) {
          console.error('Error fetching character data:', error);
        }
      };
      fetchCharacterData();
    }
  }, [id]);

  return (
    <div id="profile">
      {character ? (
        <div className="character__details">
          <div className="left__div">
            <div className="display">
              <img src={character.image} alt={character.name} />
              <h2>{character.name}</h2>
              <p>
                Species: <b>{character.species}</b>
              </p>
              <p>
                Gender: <b>{character.gender}</b>
              </p>
              <p>
                Status: <b>{character.status}</b>
              </p>
            </div>
            <div className="return__btn">
              <Link to="/">Return Home</Link>
            </div>
          </div>

          <div className="right__div">
            <Tabs>
              <TabList>
                <Tab>Origin & Location Details</Tab>
                <Tab>Episodes Appreared In</Tab>
              </TabList>

              <TabPanel>
                {location && (
                  <div className="location__details">
                    <p>
                      Location Name: <b>{location.name}</b>
                    </p>
                    <p>
                      Dimension: <b>{location.dimension}</b>
                    </p>
                    <p>
                      Amount of Residents:
                      <b> {location.residents.length}</b>
                    </p>
                  </div>
                )}
              </TabPanel>
              <TabPanel>
                <ul className="episode__list">
                  {episodes.map(episode => (
                    <li key={episode.id} className="episode">
                      <p>
                        Episode: <b>{episode.episode}</b>
                      </p>{' '}
                      <p>
                        Name: <b>{episode.name}</b>
                      </p>
                      <p>
                        Air Date: <b>{episode.air_date}</b>
                      </p>
                    </li>
                  ))}
                </ul>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;
