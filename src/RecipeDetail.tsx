import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "./api/ApiProvider";
import { Recipe } from "./api/api";

interface RouteParams {
  recipeId: string;
}

export const RecipeDetail = () => {
  const { recipeId } = useParams<RouteParams>();
  const { actions } = useContext(ApiContext);
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    actions
      .getRecipes()
      .then((recipes) => recipes.find((recipe) => recipe.recipeId === recipeId))
      .then(setRecipe);
  }, []);

  if (!recipe) {
    return <div></div>;
  }

  return (
    <div>
      <h1 className="text-xl text-white bg-red-400 p-4 flex items-center mb-4">
        {recipe.title}
      </h1>

      <div className="mb-6">
        {recipe.ingredientSections.map((section, i) => (
          <div key={i}>
            <h2 className="text-lg font-bold px-4 py-2">{section.title}</h2>
            <ul className="divide-y divide-gray-200">
              {section.ingredients.map((ingredient, j) => (
                <li key={j} className="p-4">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div>
        {recipe.instructionSections.map((section, i) => (
          <div key={i}>
            <h2 className="text-lg font-bold p-4">{section.title}</h2>
            <ol className="divide-y divide-gray-200">
              {section.instructions.map((step, j) => (
                <li key={j} className="p-4 flex items-center">
                  <span className="font-bold text-lg mr-4">{j + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
};
