import React, { useState } from "react";
import "./App.css";

function App() {
  type TUserProps = {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
  };
  const [lager, setLager] = useState<TUserProps | null>(null);
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
  const handleSubmission = (event:React.FormEvent) => {
    event.preventDefault()
    if (Object.values(userInfo).some(value => !value)) return;
    setLager(userInfo);
    setUserInfo({ FirstName: "", LastName: "", Email: "", Password: "" });
  };

  return (
    <>
      <form
        onSubmit={handleSubmission}
        className="flex flex-col w-[250px] h-[250px] gap-2"
      >
        <input
          onChange={handleChange}
          type="text"
          name="FirstName"
          value={userInfo.FirstName}
          className="border-[5px] border-solid border-red-500"
        />
        <input
          onChange={handleChange}
          type="text"
          name="LastName"
          value={userInfo.LastName}
          className="border-[5px] border-solid border-red-500"
        />
        <input
          onChange={handleChange}
          type="text"
          name="Email"
          value={userInfo.Email}
          className="border-[5px] border-solid border-red-500"
        />
        <input
          onChange={handleChange}
          type="password"
          name="Password"
          value={userInfo.Password}
          className="border-[5px] border-solid border-red-500"
        />
        <button type="submit" className="p-[10px] bg-blue-500">
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
