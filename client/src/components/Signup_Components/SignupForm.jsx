import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import api from "../../utils/api";

const SignupForm = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateGmail = (emailValue) => {
    return emailValue.endsWith("@gmail.com");
  };

  const validateAppPassword = (passwordValue) => {
    // Min 8 chars, at least 1 capital letter, at least 1 symbol
    const regex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(passwordValue);
  };

  const validateName = (nameValue) => {
    if (nameValue.trim() === "") return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateName(name)) {
      setError("Invalid Name");
      return;
    }
    if (!validateGmail(email)) {
      setError("Invalid Gmail");
      return;
    }
    if (!validateAppPassword(password)) {
      setError("Invalid Password");
      return;
    }
    try {
      const response = await api.post("/signup", {
        name: name,
        email: email,
        password: password,
      });
      if (response.data.error) {
        setError("Registration failed: " + response.data.error);
        return;
      } else {
        setError("");
        setName("");
        setEmail("");
        setPassword("");
        localStorage.setItem('token', response.data.token)
        window.location.href = "/"
      }
    } catch (error) {
      setError("Registration failed: " + error.message);
    }
  };
  return (
    <div className="w-1/3 h-full border-[0.5px] bg-blue-200 flex flex-col items-center justify-start gap-1">
      <div className="h-65/100 flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          <div className="w-8/10 pb-0.5 mt-12">
            <h4 className="mx-1 font-mono text-sm">Enter your Name:</h4>
            <input
              type="text"
              className="w-[20vw] border mx-1 font-mono text-[0.9vw] py-[0.5vh] pl-[0.5vw] bg-white"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-8/10 pb-0.5 mt-3">
            <h4 className="mx-1 font-mono text-sm">Enter your Gmail:</h4>
            <input
              type="email"
              className="w-[20vw] border mx-1 font-mono text-[0.9vw] py-[0.5vh] pl-[0.5vw] bg-white"
              placeholder="forExample123@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-8/10 pb-0.5 mt-3">
            <h4 className="mx-1 font-mono text-sm">Enter your Password:</h4>
            <input
              type="password"
              className="w-[20vw] border mx-1 font-mono text-[0.9vw] py-[0.5vh] pl-[0.5vw] bg-white"
              placeholder="Min 8 chars, 1 capital, 1 symbol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="text-red-500 font-thin flex flex-col justify-center items-center ">
              {error}
            </div>
          )}
          <div className="flex justify-center mt-2.5">
            <button
              type="submit"
              className="text-base rounded-3xl px-[2vw] py-[1vh] bg-black text-white font-thin "
            >
              Register
            </button>
          </div>
        </form>
        <div className="w-8/10 pb-0.5 mt-3 flex justify-center items-center">
          <h5 className="font-mono text-[0.9vw]">
            Already a user?{" "}
            <span className="text-blue-800 hover:underline">
              <Link to="/login">Login</Link>
            </span>
          </h5>
        </div>
      </div>
      <div className="w-8/10">
        <hr />
      </div>
      <div className="w-8/10 font-mono text-[0.7vw]">
        <h3 className="text-center">
          We can't acess you'r App password or send emails from our side, you'r
          Password is safe and end-to-end encrypted
        </h3>
      </div>
    </div>
  );
};

export default SignupForm;
