"use client"
import { useState } from "react"

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();

        console.log(`Name: ${name}, Email: ${email}`);
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />

            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default UserForm