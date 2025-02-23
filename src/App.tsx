import React, { useState } from "react";
import "./App.css";

function App() {
  type TUserProps = {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
  };
  const [isFirstNameValid, setIsFirstNameValid] = useState<boolean | null>(
    null
  );
  const [isLastNameValid, setIsLastNameValid] = useState<boolean | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isPasswordValid, setPasswordValid] = useState<boolean | null>(null);

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
    setErrors((prevErrors) => ({
      ...prevErrors,
      FirstName:
        updatedUserInfo.FirstName === ""
          ? "Input Can't be empty"
          : updatedUserInfo.FirstName.split("").length < 5
          ? "Enter at least 5 chars"
          : "",
    }));
    {
      setIsFirstNameValid(
        updatedUserInfo.FirstName !== "" &&
          updatedUserInfo.FirstName.length >= 5
      );
    }
  }

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault();
    if (Object.values(userInfo).some((value) => !value)) return;
    setLager([userInfo]);
    setUserInfo({ FirstName: "", LastName: "", Email: "", Password: "" });
  };

  const handleFirstErrorMessage = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    if (userInfo.FirstName === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [target.name]: "Input Can't be empty",
      }));
    }
    setIsFirstNameValid(false)
    setIsLastNameValid(false)
    setIsEmailValid(false)
    setPasswordValid(false);
  };

  

  return (
    <>
      <form
        onSubmit={handleSubmission}
        className="flex flex-col w-[250px] h-[250px] gap-2"
      >
        <span>FirstName</span>
        <input
          onChange={handleChange}
          onClick={handleFirstErrorMessage}
          type="text"
          name="FirstName"
          value={userInfo.FirstName}
          className={`border-[2px] rounded-lg p-[3px] border-solid ${
            isFirstNameValid === null
              ? "border-gray-500"
              : isFirstNameValid === true
              ? "border-green-600"
              : "border-red-600"
          }`}
        />
        {errors.FirstName ? (
          <p className="text-red-600 text-sm">{errors.FirstName}</p>
        ) : null}

        <span>LastName</span>
        <input
          onChange={handleChange}
          onClick={handleFirstErrorMessage}
          type="text"
          name="LastName"
          value={userInfo.LastName}
          className={`border-[2px] rounded-lg p-[3px] border-solid ${
            isLastNameValid === null
              ? "border-gray-500"
              : isLastNameValid === true
              ? "border-green-600"
              : "border-red-600"
          }`}
        />
        {errors.LastName ? (
          <p className="text-red-600 text-sm">{errors.LastName}</p>
        ) : null}

        <span>Email</span>
        <input
          onChange={handleChange}
          onClick={handleFirstErrorMessage}
          type="text"
          name="Email"
          value={userInfo.Email}
          className={`border-[2px] rounded-lg p-[3px] border-solid ${
            isEmailValid === null
              ? "border-gray-500"
              : isEmailValid === true
              ? "border-green-600"
              : "border-red-600"
          }`}
        />
        {errors.Email ? (
          <p className="text-red-600 text-sm">{errors.Email}</p>
        ) : null}

        <span>Password</span>
        <input
          onChange={handleChange}
          onClick={handleFirstErrorMessage}
          type="password"
          name="Password"
          value={userInfo.Password}
          className={`border-[2px] rounded-lg p-[3px] border-solid ${
            isPasswordValid === null
              ? "border-gray-500"
              : isPasswordValid === true
              ? "border-green-600"
              : "border-red-600"
          }`}
        />
        {errors.Password ? (
          <p className="text-red-600 text-sm">{errors.Password}</p>
        ) : null}

        <button type="submit" className="p-[10px] rounded-lg bg-green-500">
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
