import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import LeagueStandings from './LeagueStandings';

const League = () => {
  const [leagueData, setLeagueData] = useState(null);

  let params = useParams();
  console.log(params);

  let getLeague = (id) => {
    const options = {
      method: 'GET',
      url: '/leagues',
      params: {
        id: id,
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setLeagueData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getLeague(params.leagueid);
  }, []);

  var league = leagueData?.[0]['league'];
  var seasons = leagueData?.[0]['seasons'];
  var currentSeason = seasons?.find((season) => season.current);
  var country = leagueData?.[0]['country'];
  console.log('League: ', league);
  console.log('Season: ', seasons);
  console.log('Current Season: ', currentSeason);
  console.log('Country: ', country);

  return !leagueData ? (
    <></>
  ) : (
    <>
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        minWidth: 800,
        flexGrow: 1,
        padding: 0,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          backgroundColor: '#f5f5f5',
          paddingLeft: 2,
        }}
      >
        <Stack direction='row'>
          <Avatar
            src={league?.logo}
            alt={league?.name}
            sx={{ width: 24, height: 24 }}
          />

          <Typography variant='overline' component='div' sx={{ marginLeft: 2 }}>
            {country?.name} - {league?.name}
          </Typography>
        </Stack>
      </Box>
    </Paper>
    {currentSeason?.coverage.standings ? <LeagueStandings leagueId={league.id} season={currentSeason.year} /> : <div><p>No Standings Available</p></div>}
    <Paper>
      <Box>
        <Grid></Grid>
      </Box>
    </Paper>
    </>
  );
};

export default League;
