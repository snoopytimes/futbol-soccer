import { useEffect, useState } from 'react';
import axios from 'axios';
import LeagueFixtures from './LeagueFixtures';

const Fixtures = () => {
  const [fixtures, setFixtures] = useState(null);

  let requestFixtures = () => {
    var today = new Date().toISOString().split('T')[0];
    console.log(today);

    const options = {
      method: 'GET',
      url: '/fixtures',
      params: {
        date: today,
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setFixtures(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    requestFixtures();
  }, []);

  var leagueIds = [];
  fixtures?.forEach((fixture) => {
    if (
      leagueIds.findIndex((league) => league.id === fixture.league.id) === -1
    ) {
      leagueIds.push(fixture['league']);
    }
  });
  console.log(leagueIds);

  return (
    <div className='fixtures-wrapper'>
      {!fixtures
        ? 'Loading Fixtures...'
        : leagueIds.map((league) => (
            <LeagueFixtures
              id={league.id}
              allFixtures={fixtures}
              league={league}
            />
          ))}
    </div>
  );
};

export default Fixtures;
