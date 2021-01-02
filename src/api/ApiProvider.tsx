import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getRecipes,
  login,
  Recipe,
  refresh,
  LoginResponse,
  importRecipe,
  getSupportedDomains,
} from "./api";

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  bearerToken?: string;
  recipes?: Recipe[];
  supportedDomains?: string[];
}

interface Actions {
  login: (email: string, password: string) => Promise<string>;
  refresh: () => Promise<string>;
  getRecipes: () => Promise<Recipe[]>;
  importRecipe: (uri: string) => Promise<Recipe>;
  getSupportedDomains: () => Promise<string[]>;
}

interface Api {
  state: State;
  actions: Actions;
}

export const ApiContext = createContext<Api>(undefined);

interface Props {
  children: ReactNode;
}

export const ApiProvider = ({ children }: Props) => {
  const [state, setState] = useState<State>({
    isInitialized: false,
    isAuthenticated: false,
  });

  const handleError = (e: Response) => {
    if (e.status === 401) {
      setState({
        ...state,
        bearerToken: undefined,
        isAuthenticated: false,
        isInitialized: true,
      });
    } else {
      return Promise.reject(e);
    }
  };

  const setToken = ({ token }: LoginResponse) => {
    setState({
      ...state,
      bearerToken: token,
      isAuthenticated: true,
      isInitialized: true,
    });
    return token;
  };

  const loginAction = (email: string, password: string) => {
    return login(email, password).then(setToken);
  };

  const refreshAction = () => {
    return refresh().then(setToken).catch(handleError);
  };

  const getBearerToken = () => {
    const payload = JSON.parse(atob(state.bearerToken.split(".")[1]));
    const isExpired = Date.now() >= payload.exp * 1000;

    if (isExpired) {
      return refreshAction();
    }

    return Promise.resolve(state.bearerToken);
  };

  const getRecipesAction = () => {
    if (state.recipes) {
      return Promise.resolve(state.recipes);
    }

    return getBearerToken()
      .then(getRecipes)
      .then((response) => {
        setState({ ...state, recipes: response.recipes });
        return response.recipes;
      })
      .catch(handleError);
  };

  const getSupportedDomainsAction = () => {
    if (state.supportedDomains) {
      return Promise.resolve(state.supportedDomains);
    }

    return getBearerToken()
      .then(getSupportedDomains)
      .then((response) => {
        setState({ ...state, supportedDomains: response.supportedDomains });
        return response.supportedDomains;
      })
      .catch(handleError);
  };

  const importRecipeAction = (uri: string) => {
    return getBearerToken()
      .then((token) =>
        Promise.all([importRecipe(uri, token), getRecipesAction()]).then(
          ([recipe, existingRecipes]) => {
            setState({ ...state, recipes: [recipe, ...existingRecipes] });
            return recipe;
          }
        )
      )
      .catch(handleError);
  };

  const api: Api = {
    state,
    actions: {
      login: loginAction,
      refresh: refreshAction,
      getRecipes: getRecipesAction,
      importRecipe: importRecipeAction,
      getSupportedDomains: getSupportedDomainsAction,
    },
  };

  const value = useMemo(() => api, [state]);

  useEffect(() => {
    refreshAction();
  }, []);

  if (!state.isInitialized) {
    return <div></div>;
  }

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
