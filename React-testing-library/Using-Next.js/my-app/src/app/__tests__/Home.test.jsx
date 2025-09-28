import { render, screen } from '@testing-library/react';
import Home from '../page'; 

describe('Home Page', () => {
  it('should render the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: /Testing using Next Js/i,
    });

    expect(heading).toBeInTheDocument();
  });
});