import axios from "axios";
import UserProfile from "../components/UserProfile";
import { render , screen } from "@testing-library/react";

jest.mock('axios');

describe('UserProfile Component',()=>{
    const mockUser = [
        {
        name: 'kamrul Hasan',
        email: 'kamrulhasan20656@gmail.com'
        },
    ];

    it('should show loading state initially',()=>{
        render(<UserProfile userId={10} />);

        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    it('should display user data after successful API call', async ()=>{
        axios.get.mockResolvedValue({ data: mockUser});

        render(<UserProfile userId={10} />);

        const userName = await screen.findByText(mockUser[0].name);
        const email = await screen.findByText(mockUser[0].email);

        expect(userName).toBeInTheDocument();
        expect(email).toBeInTheDocument();

        expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    it('should display an error message on API failure', async ()=>{
        axios.get.mockRejectedValue(new Error('Api Error'));

        render(<UserProfile userId={10} />);

        const errorMessage = await screen.findByText(/failed to fetch user/i);
        expect(errorMessage).toBeInTheDocument();
    });
});