const TeamImage = ({ imgSrc, team }) => {
  return (
    <img
      src={imgSrc}
      alt={`${team}-logo`}
      height={30}
      width={25}
      style={{ style: 'vertical-align:middle' }}
    />
  );
};

export default TeamImage;
