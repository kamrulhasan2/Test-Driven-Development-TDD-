const {screen,render } = require("@testing-library/react")
import Navbar from "../Navbar";

describe('Navbar',()=>{
   it('should render navigation links correctly',()=>{
     render(<Navbar />);

     const homeLink = screen.getByRole('link', {name: /home/i});
     const aboutLink = screen.getByRole('link', {name: /about/i});

     expect(homeLink).toBeInTheDocument();
     expect(aboutLink).toBeInTheDocument();

     expect(homeLink).toHaveAttribute('href', '/');
     expect(aboutLink).toHaveAttribute('href', '/about');
   })
})