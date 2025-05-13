import { useEffect, useState } from 'react';
import FlagGrid from '../components/FlagGrid';

function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch('https://flag-explorer-app.onrender.com/')
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const formattedCountries = data.map(country => ({
          name: country.name.common,
          flag: country.flags.png
        }));
        setCountries(formattedCountries);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Flag Explorer</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <FlagGrid countries={countries} />
      )}
    </div>
  );
}

export default Home;
