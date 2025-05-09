import { render, screen } from '@testing-library/react';
import CountryDetails from '../src/components/CountryDetails';

describe('CountryDetails', () => {
  const country = {
    name: 'France',
    population: 67391582,
    capital: 'Paris',
    flag: 'france.png'
  };

  test('renders country details', () => {
    render(<CountryDetails country={country} />);

    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText(/Population: 67,391,582/)).toBeInTheDocument();
    expect(screen.getByText('Capital: Paris')).toBeInTheDocument();
    expect(screen.getByAltText('France flag')).toHaveAttribute('src', 'france.png');
  });
});
