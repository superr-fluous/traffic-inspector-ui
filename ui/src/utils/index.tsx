import ReactCountryFlag from 'react-country-flag';

const renderFlag = (countryCode: string) => {
        if (countryCode === "local") {
          return <span title={countryCode}>{'🌐'}</span>;
        }

        if (countryCode === "unknown") {
          return <span title={countryCode}>{'❓'}</span>;
        }

        return (
          <ReactCountryFlag
            countryCode={countryCode}
            svg
            style={{ width: '1.5em', height: '1.5em', marginRight: '0.5em' }}
            title={countryCode}
          />
        );
};

export default renderFlag;