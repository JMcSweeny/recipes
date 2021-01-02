import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "./api/ApiProvider";

export const MyRecipes = () => {
  const { actions, state } = useContext(ApiContext);

  useEffect(() => {
    actions.getRecipes();
  }, []);

  const recipes = state.recipes ? state.recipes : [];

  return (
    <div>
      <h1 className="text-xl text-white bg-red-400 p-4 flex items-center">
        My Recipes
      </h1>
      <ul className="divide-y divide-gray-200">
        {recipes.map((recipe) => (
          <li key={recipe.recipeId}>
            <Link
              to={`/recipes/${recipe.recipeId}`}
              className="p-4 flex justify-between items-center"
            >
              <p>{recipe.title}</p>
              <i className="border-gray-300 border-r-2 border-b-2 p-1 transform -rotate-45"></i>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
