import { render, screen } from '@testing-library/react';
import App from './App';

test('renders chat input', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/type a text/i);
  expect(inputElement).toBeInTheDocument();
});
