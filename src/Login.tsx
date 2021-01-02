import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { ApiContext } from "./api/ApiProvider";

export const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const { state, actions } = useContext(ApiContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formState;
    actions.login(email, password);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  if (state.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="h-screen flex items-center">
      <div className="rounded mb-6 w-full">
        <form className="p-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="input mb-2"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input mb-2"
            value={formState.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full p-2 rounded text-white bg-blue-400 hover:bg-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
