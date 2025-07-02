import React from "react";
import { useNavigate } from "react-router-dom";

import routes from "@/routes/routeConfig";

import logo from "../../assets/logo.png";
import Navbar from "../navbar/Navbar";
import { Button } from "../ui/button";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="item-row justify-between py-1.5 responsive-view">
      <a href={routes.MAP}>
        <img src={logo} alt="Naxa Logo" className="h-6 w-auto" />
      </a>

      <Navbar />
      <Button
        size={"sm"}
        onClick={() => navigate(routes.CONNECT)}
        className="px-6 cursor-pointer rounded-none bg-primary hover:bg-[var(--color-secondary)]  transition-colors duration-200 text-xs font-semibold text-primary"
      >
        Connect
      </Button>
    </header>
  );
};

export default Header;
