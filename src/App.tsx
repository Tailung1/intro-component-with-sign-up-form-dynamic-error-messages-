import React, { useState } from "react";
import "./App.css";

function App() {
  type TUserProps = {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
  };
  const [userInfo, setUserInfo] = useState<TUserProps>({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    userInfo &&
      setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };
  console.log(userInfo);

  return (
    <>
      <form className="flex flex-col w-[250px] h-[250px] gap-2">
        <input
          onChange={handleChange}
          type="text"
          name="FirstName"
          className="border-[5px] border-solid border-red-500"
        />
        <input
          onChange={handleChange}
          type="text"
          name="LastName"
          className="border-[5px] border-solid border-red-500"
        />
        <input
          onChange={handleChange}
          type="text"
          name="Email"
          className="border-[5px] border-solid border-red-500"
        />
        <input
          onChange={handleChange}
          type="text"
          name="Password"
          className="border-[5px] border-solid border-red-500"
        />
      </form>
    </>
  );
}

export default App;
