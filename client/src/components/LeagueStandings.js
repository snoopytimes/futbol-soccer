import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const LeagueStandings = ({ leagueId, season }) => {
  const [leagueStandingsData, setLeagueStandingsData] = useState(null);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  let getLeagueStandings = (leagueId, season) => {
    const options = {
      method: 'GET',
      url: '/standings',
      params: {
        league: leagueId,
        season: season,
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setLeagueStandingsData(response.data[0].league);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getLeagueStandings(leagueId, season);
  }, [leagueId, season]);

  var leagueName = leagueStandingsData?.name;
  var standings = leagueStandingsData?.standings[0];

  let renderStandingsData = standings?.map((res, _index) => {
    var teamRank = res.rank;
    var teamName = res.team.name;
    var teamTotalPlayedGames = res.all.played;
    var teamTotalWins = res.all.win;
    var teamTotalDraws = res.all.draw;
    var teamTotalLose = res.all.lose;
    var teamTotalGoalPlusMinus = `${res.all.goals.for}/${res.all.goals.against}`;
    var teamGoalsDiff = res.goalsDiff;
    var teamPoints = res.points;
    var teamForm = res.form;

    return (
      <>
        <TableRow>
          <TableCell>{teamRank}</TableCell>
          <TableCell>{teamName}</TableCell>
          <TableCell>{teamTotalPlayedGames}</TableCell>
          <TableCell>{teamTotalWins}</TableCell>
          <TableCell>{teamTotalDraws}</TableCell>
          <TableCell>{teamTotalLose}</TableCell>
          <TableCell>{teamTotalGoalPlusMinus}</TableCell>
          <TableCell>{teamGoalsDiff}</TableCell>
          <TableCell>{teamPoints}</TableCell>
          <TableCell>{teamForm}</TableCell>
        </TableRow>
      </>
    );
  });

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 800,
        flexGrow: 1,
        padding: 0,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography>{leagueName}</Typography>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>G</TableCell>
                <TableCell>W</TableCell>
                <TableCell>D</TableCell>
                <TableCell>L</TableCell>
                <TableCell>+/-</TableCell>
                <TableCell>GD</TableCell>
                <TableCell>Pts</TableCell>
                <TableCell>Form</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderStandingsData}</TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Paper>
  );
};

export default LeagueStandings;
