import axios from "axios";
import { fetchUser } from "../userService";

jest.mock('axios');

describe('fetchUser',()=>{
    let userId = 1;
    const url = `https://api.example.com/users/${userId}`

    it('should fetch a user and return their data',async ()=>{
        const mockUserData = {id : 1 , name : 'kamrul'};
        
        axios.get.mockResolvedValue({data: mockUserData});

        const user = await fetchUser(userId);

        expect(axios.get).toHaveBeenCalledWith(url);
        expect(user).toEqual(mockUserData);
    });

    it('should return null if the API call fails', async ()=>{
       userId = 2;

       axios.get.mockRejectedValue(new Error('Api Error'));

       const user = await fetchUser(userId);
       expect(user).toBeNull();

    });
});