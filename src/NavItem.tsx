import React from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  label: string;
}

export const NavItem = ({ to, label }: Props) => {
  return (
    <Link
      className="block rounded-md border border-gray-200 text-white bg-blue-400 shadow p-10 text-center font-semibold"
      to={to}
    >
      <span>{label}</span>
    </Link>
  );
};
