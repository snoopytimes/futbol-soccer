import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Link, Outlet } from 'react-router-dom';

const LeagueFixtures = ({ allFixtures, league }) => {
  //console.log(allFixtures);
  //console.log(league);
  const results = allFixtures.filter((obj) => {
    return obj['league'].id === league.id;
  });

  console.log(`${league.name} fixtures`, results);

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 700,
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
        <Link to={`/league/${league.id}`} key={league.id}>
          <Stack direction='row'>
            <Avatar
              src={league.flag}
              alt={league.country}
              sx={{ width: 24, height: 24 }}
            />

            <Typography
              variant='overline'
              component='div'
              sx={{ marginLeft: 2 }}
            >
              {league.country} - {league.name}
            </Typography>
          </Stack>
        </Link>
      </Box>

      {results?.map((res, _index) => (
        <Grid
          container
          sx={{
            padding: 1,
            margin: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key={_index}
        >
          <Grid
            justifyContent='flex-end'
            item
            xs={4}
            style={{ display: 'flex' }}
          >
            <Typography sx={{ marginRight: 1 }}>
              {res['teams']['away'].name}
            </Typography>
            <Avatar
              src={res['teams']['away'].logo}
              alt={res['teams']['away'].id}
              sx={{ width: 25, height: 25 }}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              textAlign: 'center',
            }}
          >
            <Typography variant='caption'>
              {res['goals']['away']} - {res['goals']['home']}
            </Typography>
            <Typography
              variant='caption'
              sx={{ display: 'inline-block', width: '100%' }}
            >
              {res['fixture']['status'].short}
            </Typography>
          </Grid>
          <Grid item xs={4} style={{ display: 'flex' }}>
            <Avatar
              src={res['teams']['home'].logo}
              alt={res['teams']['home'].id}
              sx={{ width: 25, height: 25 }}
            />
            <Typography sx={{ marginLeft: 1 }}>
              {res['teams']['home'].name}
            </Typography>
          </Grid>
        </Grid>
      ))}
      <Outlet />
    </Paper>
  );
};

export default LeagueFixtures;
