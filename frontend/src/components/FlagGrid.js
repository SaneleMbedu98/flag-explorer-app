import { Link } from 'react-router-dom';

function FlagGrid({ countries }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {countries.map(country => (
        <Link key={country.name} to={`/country/${country.name}`} className="block">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <img
              src={country.flag}
              alt={`${country.name} flag`}
              className="w-full h-32 object-cover mb-2"
            />
            <p className="text-center font-semibold">{country.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default FlagGrid;
