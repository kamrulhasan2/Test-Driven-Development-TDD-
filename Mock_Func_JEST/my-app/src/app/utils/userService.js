import axios from "axios";

export const fetchUser = async (userId) => {
    try {
        const result = await axios.get(`https://api.example.com/users/${userId}`);
        return result.data;
    } catch (error) {
        return null;
    }
}