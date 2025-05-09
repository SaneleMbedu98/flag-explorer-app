function CountryDetails({ country }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        className="w-full h-48 object-cover mb-4"
      />
      <h2 className="text-2xl font-bold mb-4">{country.name}</h2>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Capital:</strong> {country.capital}</p>
    </div>
  );
}

export default CountryDetails;
