"use client"
import { useRouter } from "next/navigation";

const LoginButton = () => {
    const router = useRouter();

    const handleClick = ()=>{
        router.push('/dashboard')
    }

  return (
        <button onClick={handleClick}>Login</button>
  );
}

export default LoginButton;