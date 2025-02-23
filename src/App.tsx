import React, { useState } from "react";
import "./App.css";

function App() {
  type TUserProps = {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
  };
  const [lager, setLager] = useState<TUserProps[]>([]);
  const [userInfo, setUserInfo] = useState<TUserProps>({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });

  const [errors, setErrors] = useState<TUserProps>({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUserInfo = {
      ...userInfo,
      [event.target.name]: event.target.value,
    };
    setUserInfo(newUserInfo);
    checkErrors(newUserInfo);
  };

  function checkErrors(updatedUserInfo: TUserProps) {
    setErrors(prevErrors => ({
      ...prevErrors,
      FirstName: updatedUserInfo.FirstName === "" ? "Input Can't be empty" : "",
    }));
  }

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault();
    if (Object.values(userInfo).some((value) => !value)) return;
    setLager([userInfo]);
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
          className="border-[5px] border-solid border-blue-500"
        />
        {errors.FirstName ? (
          <p className="text-red-600 text-sm">{errors.FirstName}</p>
        ) : null}
        <input
          onChange={handleChange}
          type="text"
          name="LastName"
          value={userInfo.LastName}
          className="border-[5px] border-solid border-blue-500"
        />
        <input
          onChange={handleChange}
          type="text"
          name="Email"
          value={userInfo.Email}
          className="border-[5px] border-solid border-blue-500"
        />
        <input
          onChange={handleChange}
          type="password"
          name="Password"
          value={userInfo.Password}
          className="border-[5px] border-solid border-blue-500"
        />
        <button type="submit" className="p-[10px] bg-green-500">
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
