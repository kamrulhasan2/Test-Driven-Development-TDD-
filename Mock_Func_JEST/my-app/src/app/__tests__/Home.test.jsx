import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Test main page',()=>{
    it('should be render main page',()=>{
        render(<Home />);

        expect(screen.getByRole('heading',{
            name: /mock function/i
        })).toBeInTheDocument();
    });
});