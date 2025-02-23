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
  type TErrorsProps = {
    FirstName: string | undefined;
    LastName: string | undefined;
    Email: string | undefined;
    Password: string | undefined;
  };

  //   const [lager, setLager] = useState<TUserProps[]>([]);
  const [userInfo, setUserInfo] = useState<TUserProps>({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });

  const [errors, setErrors] = useState<TErrorsProps>({
    FirstName: undefined,
    LastName: undefined,
    Email: undefined,
    Password: undefined,
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
    const target = event.target as HTMLInputElement;

    if (target.name === "FirstName") {
      if (errors.FirstName === undefined) {
        setIsValid((prev) => ({ ...prev, FirstName: false }));
        errors.FirstName = "Input Can't be empty";
      } else if (errors.FirstName) {
        setIsValid((prev) => ({ ...prev, FirstName: true }));
      } else {
        setIsValid((prev) => ({ ...prev, FirstName: false }));
      }
    } else if (target.name === "LastName") {
      if (errors.LastName === undefined) {
        setIsValid((prev) => ({ ...prev, LastName: false }));
      } else if (errors.LastName) {
        setIsValid((prev) => ({ ...prev, LastName: true }));
      } else {
        setIsValid((prev) => ({ ...prev, LastName: false }));
      }
    } else if (target.name === "Email") {
      if (errors.Email === undefined) {
        setIsValid((prev) => ({ ...prev, Email: false }));
      } else if (errors.Email) {
        setIsValid((prev) => ({ ...prev, Email: true }));
      } else {
        setIsValid((prev) => ({ ...prev, Email: false }));
      }
    } else if (target.name === "Password") {
      if (errors.Password === undefined) {
        setIsValid((prev) => ({ ...prev, Password: false }));
      } else if (errors.Password) {
        setIsValid((prev) => ({ ...prev, Password: true }));
      } else {
        setIsValid((prev) => ({ ...prev, Password: false }));
      }
    }
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


  return (
    <>
      <form
        onSubmit={handleSubmission}
        className="flex flex-col w-[250px] h-[250px] gap-2"
      >
        <span>FirstName</span>
        <input
          onChange={handleChange}
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
