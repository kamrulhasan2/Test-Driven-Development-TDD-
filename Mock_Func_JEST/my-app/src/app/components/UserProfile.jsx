"use client"
import axios from "axios"
import { useEffect, useState } from "react"
const userUrl = `https://jsonplaceholder.typicode.com/users`;


const UserProfile = ({userId}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    

    useEffect(()=>{
        const fetchUserData = async () =>{
            try {
                const response = await axios.get(userUrl);
                setUser(response.data);
            } catch (error) {
                setError('Failed to fetch user');
            }
        };

        fetchUserData();
    },[userId]);

    if(error){
        return <p>{error}</p>
    }

    if(!user){
        return <p>Loading...</p>
    }

  return (
    <div>
        <h1>{user[0].name}</h1>
        <p>{user[0].email}</p>
    </div>
  )
}

export default UserProfile