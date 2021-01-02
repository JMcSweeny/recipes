import { get, post } from "./http";

export interface LoginResponse {
  token: string;
}

export interface IngredientSection {
  title: string;
  ingredients: string[];
}

export interface InstructionSection {
  title: string;
  instructions: string[];
}

export interface Recipe {
  userId: string;
  recipeId: string;
  createdTimestamp: number;
  title: string;
  ingredientSections: IngredientSection[];
  instructionSections: InstructionSection[];
  tags: string[];
}

export interface RecipesResponse {
  recipes: Recipe[];
}

export interface SupportedDomainsResponse {
  supportedDomains: string[];
}

export const login = (email: string, password: string) => {
  const url = `${process.env.API_ROOT}/auth/login`;
  const options = {
    body: { email, password },
  };
  return post<LoginResponse>(url, options);
};

export const refresh = () => {
  const url = `${process.env.API_ROOT}/auth/refresh`;
  return post<LoginResponse>(url);
};

export const getRecipes = (bearerToken: string) => {
  const url = `${process.env.API_ROOT}/recipes`;
  return get<RecipesResponse>(url, { bearerToken });
};

export const getSupportedDomains = (bearerToken: string) => {
  const url = `${process.env.API_ROOT}/recipes/supported-domains`;
  return get<SupportedDomainsResponse>(url, { bearerToken });
};

export const importRecipe = (uri: string, bearerToken: string) => {
  const url = `${process.env.API_ROOT}/recipes/scrape`;
  return post<Recipe>(url, { bearerToken, body: { uri } });
};
