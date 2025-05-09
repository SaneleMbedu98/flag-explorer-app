import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import FlagGrid from '../src/components/FlagGrid';

describe('App Component', () => {
  test('renders Flag Explorer title', () => {
    act(() => {
      render(<App />);
    });

    const titleElement = screen.getByText(/Flag Explorer/i);
    expect(titleElement).toBeInTheDocument();
  });
});

describe('FlagGrid Component', () => {
  const countries = [
    { name: 'France', flag: 'france.png' },
    { name: 'Germany', flag: 'germany.png' }
  ];

  test('renders country flags', () => {
    render(
      <MemoryRouter future={{ v7_relativeSplatPath: true }}>
        <FlagGrid countries={countries} />
      </MemoryRouter>
    );

    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.getByAltText('France flag')).toHaveAttribute('src', 'france.png');
  });
});
