import React from "react";
import { Outlet } from "react-router-dom";

import { Footer, Header } from "@/components";

const MainLayout: React.FC = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
