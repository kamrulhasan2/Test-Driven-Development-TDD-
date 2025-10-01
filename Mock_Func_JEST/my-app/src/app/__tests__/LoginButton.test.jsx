import userEvent from "@testing-library/user-event";
import LoginButton from "../components/LoginButton";
import { render, screen } from "@testing-library/react";

const mockPush = jest.fn();

jest.mock('next/navigation',()=>({
    useRouter: () =>({
        push: mockPush,
    }),
}));

describe('LoginButton',()=>{
    beforeEach(()=>{
        mockPush.mockClear();
    });

    it('should redirect to /dashboard when the button is clicked', async ()=>{
        const user = userEvent.setup();
        render(<LoginButton />);

        const button = screen.getByRole('button',{name: /login/i});

        await user.click(button);

        expect(mockPush).toHaveBeenCalledTimes(1);
        expect(mockPush).toHaveBeenLastCalledWith('/dashboard');
    });
});