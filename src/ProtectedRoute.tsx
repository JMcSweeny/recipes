import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ApiContext } from './api/ApiProvider';

export const ProtectedRoute = (props: RouteProps) => {
  const { state } = useContext(ApiContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
}