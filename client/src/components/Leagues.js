import { useEffect, useState } from 'react';
import axios from 'axios';
import League from './League';

const Leagues = () => {
  const [leagues, setLeagues] = useState(null);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: '/leagues',
      params: {
        id: 39,
        season: 2021,
        code: 'GB',
        current: true,
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setLeagues(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Leagues</h1>
      {leagues?.map((league, _index) => (
        <League
          key={league.league.id}
          country={league.country}
          league={league.league}
          seasons={league.seasons}
        />
      ))}
    </div>
  );
};

export default Leagues;
