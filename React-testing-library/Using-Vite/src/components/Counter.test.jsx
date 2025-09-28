import { render, screen } from "@testing-library/react";
import Counter from "./Counter";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe('Counter Component',()=>{
    // Test 1:
    it('Should render the initial counter',()=>{
        render(<Counter />);

        expect(screen.getByRole('heading', { name: /counter/i })).toBeInTheDocument();
        expect(screen.getByText('Current count: 0')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /increment/i}));
    });

    // Test 2:

    it('Should increment the count when the button is clicked',async ()=>{
        const user = userEvent.setup()
        render(<Counter />);

        const incrementBtn = screen.getByRole('button', {name: /increment/i});
        await user.click(incrementBtn);


        expect(screen.getByText('Current count: 1')).toBeInTheDocument();

    })
    
})