import React, { useState } from "react";
import "./App.css";

function App() {
  type TUserProps = {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    [key: string]: string;
  };
  type TIsValidProps = {
    FirstName: boolean | null;
    LastName: boolean | null;
    Email: boolean | null;
    Password: boolean | null;
  };

  //   const [lager, setLager] = useState<TUserProps[]>([]);
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

  const [isValid, setIsValid] = useState<TIsValidProps>({
    FirstName: null,
    LastName: null,
    Email: null,
    Password: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedUserInfo = {
      ...userInfo,
      [event.target.name]: event.target.value,
    };
    const currectInput = event.target.name;
    setUserInfo(updatedUserInfo);
    checkErrors(updatedUserInfo, currectInput);
  };

  function checkErrors(updatedUserInfo: TUserProps, currectInput: string) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [currectInput]:
        updatedUserInfo[currectInput] === ""
          ? "Input Can't be empty"
          : updatedUserInfo[currectInput].split("").length < 5
          ? "Enter at least 5 chars"
          : "",
    }));
    setIsValid((prevErrors) => ({
      ...prevErrors,
      [currectInput]:
        updatedUserInfo[currectInput] !== "" &&
        updatedUserInfo[currectInput].length >= 5,
    }));
  }

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault();
    if (Object.values(userInfo).some((value) => !value)) return;
    // setLager([userInfo]);
    setUserInfo({ FirstName: "", LastName: "", Email: "", Password: "" });
  };

  const handleFirstErrorMessage = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    if (userInfo[target.name] === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [target.name]: "Input Can't be empty",
      }));
    }

    {
      errors.FirstName
        ? setIsValid((prev) => ({ ...prev, FirstName: false }))
        : null;
    }

    {
      errors.LastName
        ? setIsValid((prev) => ({ ...prev, LastName: false }))
        : null;
    }
    {
      errors.Email
        ? setIsValid((prev) => ({ ...prev, Email: false }))
        : null;
    }
    {
      errors.Password
        ? setIsValid((prev) => ({ ...prev, Password: false }))
        : null;
    }
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
            isValid.FirstName === null
              ? "border-gray-500"
              : isValid.FirstName === true
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
            isValid.LastName === null
              ? "border-gray-500"
              : isValid.LastName === true
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
            isValid.Email === null
              ? "border-gray-500"
              : isValid.Email === true
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
            isValid.Password === null
              ? "border-gray-500"
              : isValid.Password === true
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
