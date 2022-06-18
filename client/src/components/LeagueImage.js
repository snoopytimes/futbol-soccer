const LeagueImage = ({ imgSrc, league }) => {
  return (
    <img
      src={imgSrc}
      alt={`${league}-logo`}
      height={30}
      width={25}
      style={{ style: 'vertical-align:middle' }}
    />
  );
};

export default LeagueImage;
