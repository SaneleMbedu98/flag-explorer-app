import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CountryDetails from '../components/CountryDetails';

function Details() {
  const { name } = useParams();
  const [state, setState] = useState({ country: null, loading: true, error: null });

  useEffect(() => {
    console.log('Country name:', name); // Debug the name parameter
    if (!name) {
      setState({ country: null, loading: false, error: 'Invalid country name' });
      return;
    }

    fetch(`https://flag-explorer-app.onrender.com/countries/${name}`)
      .then(response => {
        if (!response.ok) throw new Error('Country not found');
        return response.json();
      })
      .then(data => setState({ country: data, loading: false, error: null }))
      .catch(error => {
        setState({
          country: null,
          loading: false,
          error: error.message.includes('Failed to fetch')
            ? 'Network error. Please try again later.'
            : error.message,
        });
      });
  }, [name]);

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 block">
        ← Back to Home
      </Link>
      {state.loading && <p className="text-center">Loading...</p>}
      {state.error && <p className="text-center text-red-500">{state.error}</p>}
      {!state.loading && !state.error && <CountryDetails country={state.country} />}
    </div>
  );
}

export default Details;