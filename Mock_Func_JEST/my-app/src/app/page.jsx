import UserProfile from "./components/UserProfile";

export default function Home() {
  return (
    <div>
      <h1>Hello! welcome to the mock function </h1>
      <UserProfile userId={10}/>
    </div>
  );
}
