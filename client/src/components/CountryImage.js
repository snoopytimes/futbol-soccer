const CountryImage = ({ imgSrc, country }) => {
  return (
    <img
      src={imgSrc}
      alt={`${country}-flag`}
      height={25}
      width={25}
      style={{ style: 'vertical-align:middle' }}
    />
  );
};

export default CountryImage;
