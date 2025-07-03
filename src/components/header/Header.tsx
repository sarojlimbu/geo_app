import React from "react";
import { useNavigate } from "react-router-dom";

import routes from "@/routes/routeConfig";

import bgPicture from "../../assets/headerbg.svg";
import logo from "../../assets/logo.png";
import Navbar from "../navbar/Navbar";
import { Button } from "../ui/button";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="item-row justify-between px-2 md:px-0 py-1.5 responsive-view bg-transparent overflow-hidden">
      <img
        src={bgPicture}
        alt="icon1"
        className="absolute top-0 left-0 w-full -z-1 md:w-fit max-w-none object-cover overflow-hidden"
      />
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
