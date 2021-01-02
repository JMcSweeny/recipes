import React from "react";
import { NavItem } from "./NavItem";

export const Home = () => {
  return (
    <div className="relative h-screen flex justify-center items-center">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <li>
          <NavItem to="/recipes" label="My Recipes" />
        </li>
        <li>
          <NavItem to="/import" label="Import" />
        </li>
        <li>
          <NavItem to="/create" label="Create" />
        </li>
      </ul>
    </div>
  );
};
