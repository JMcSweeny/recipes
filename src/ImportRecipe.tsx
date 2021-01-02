import { stat } from "fs";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Redirect } from "react-router-dom";
import { Recipe } from "./api/api";
import { ApiContext } from "./api/ApiProvider";

export const ImportRecipe = () => {
  const [formState, setFormState] = useState({ uri: "" });
  const [recipe, setRecipe] = useState<Recipe>();
  const { actions, state } = useContext(ApiContext);

  useEffect(() => {
    actions.getSupportedDomains();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { uri } = formState;

    actions.importRecipe(uri).then(setRecipe);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  if (recipe) {
    return <Redirect to={`/recipes/${recipe.recipeId}`} />;
  }

  const supportedDomains = state.supportedDomains ? state.supportedDomains : [];

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-xl text-white bg-red-400 p-4 flex items-center mb-4">
        Import Recipe
      </h1>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="text-center">
          <h2 className="font-semibold">Supported Domains</h2>
          <ul className="text-gray-500">
            {supportedDomains.map((domain, i) => {
              return <li key={i}>{domain}</li>;
            })}
          </ul>
        </div>
        <form className="w-full p-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="uri"
            placeholder="Recipe Url"
            className="input mb-2"
            value={formState.uri}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full p-2 rounded text-white bg-blue-400 hover:bg-blue-500"
          >
            Import
          </button>
        </form>
      </div>
    </div>
  );
};
