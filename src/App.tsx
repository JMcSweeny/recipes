import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { ImportRecipe } from "./ImportRecipe";
import { Login } from "./Login";
import { MyRecipes } from "./MyRecipes";
import { ProtectedRoute } from "./ProtectedRoute";
import { RecipeDetail } from "./RecipeDetail";

export const App = () => {
  return (
    <div>
      <div className="max-w-xl mx-auto shadow-lg">
        <Switch>
          <ProtectedRoute path="/" exact>
            <Home />
          </ProtectedRoute>
          <ProtectedRoute path="/recipes" exact>
            <MyRecipes />
          </ProtectedRoute>
          <ProtectedRoute path="/recipes/:recipeId">
            <RecipeDetail />
          </ProtectedRoute>
          <ProtectedRoute path="/import">
            <ImportRecipe />
          </ProtectedRoute>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
