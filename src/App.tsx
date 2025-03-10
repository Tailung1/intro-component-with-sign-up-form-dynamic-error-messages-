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
    const currentInput = event.target.name;
    const target = event.target as HTMLInputElement;

    if (target.name === "FirstName") {
      setIsValid((prev) => ({
        ...prev,
        FirstName: !errors.FirstName, // If errors.FirstName is falsy (undefined, "", false), it's valid
      }));
    } else if (target.name === "LastName") {
      setIsValid((prev) => ({ ...prev, LastName: !errors.LastName }));
    } else if (target.name === "Email") {
     setIsValid(prev => ({...prev,Email:!errors.Email}))

    } else if (target.name === "Password") {
      setIsValid(prev =>({...prev, Password:!errors.Password}))
    }
    setUserInfo(updatedUserInfo);

    if (target.name === "FirstName") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        FirstName:
          updatedUserInfo.FirstName === ""
            ? "Input Can't be empty"
            : updatedUserInfo.FirstName.split("").length < 5
            ? "FirstName must include min  5 chars"
            : "",
      }));
    }
    if (target.name === "LastName") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        LastName:
          updatedUserInfo.LastName === ""
            ? "Input Can't be empty"
            : updatedUserInfo.LastName.split("").length < 5
            ? "LastName must include min  5 chars"
            : "",
      }));
    }
    if (target.name === "Email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Email:
          updatedUserInfo.Email === ""
            ? "Input Can't be empty"
            : updatedUserInfo.Email.split("").length < 5
            ? "Email must include min  5 chars"
            : "",
      }));
    }

    if (target.name === "Password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Password:
          updatedUserInfo.Password === ""
            ? "Input Can't be empty"
            : updatedUserInfo.Password.split("").length < 5
            ? "Password must include min  5 chars"
            : "",
      }));
    }
    setIsValid((prevErrors) => ({
      ...prevErrors,
      [currentInput]:
        updatedUserInfo[currentInput] !== "" &&
        updatedUserInfo[currentInput].length >= 5,
    }));
  };

  const [shake, setShake] = useState<Record<string, boolean>>({
    FirstName: false,
    LastName: false,
    Email: false,
    Password: false,
  });

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedShake: Record<string, boolean> = {};
    const updatedIsValid: TIsValidProps = { ...isValid };
    const updatedErrors = { ...errors };
    Object.entries(isValid).forEach(([key, value]) => {
      const typedKey = key as keyof TIsValidProps;
      if (!value) updatedShake[key] = true;
      if (!value && !errors[typedKey])
        updatedErrors[typedKey] = "Input can not be empty";
      if (value === null) updatedIsValid[typedKey] = false;
    });
    setShake(updatedShake);
    setIsValid(updatedIsValid);
    setErrors(updatedErrors);
    setTimeout(() => {
      setShake({});
    }, 500);

    if (Object.values(isValid).some((value) => !value)) return;

    setUserInfo({ FirstName: "", LastName: "", Email: "", Password: "" });

    setIsValid({
      FirstName: null,
      LastName: null,
      Email: null,
      Password: null,
    });
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
          } ${shake.FirstName ? "shake" : null}`}
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
          } ${shake.LastName ? "shake" : null}`}
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
          } ${shake.Email ? "shake" : null}`}
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
          } ${shake.Password ? "shake" : null}`}
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
