import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import { Footer, Header } from "@/components";

const MainLayout: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col  w-full max-w-full">
      <section className="z-2 bg-header">
        <Header />
      </section>
      <section className="flex-1 md:m-0 m-4 h-full">
        <Outlet />
      </section>
      <Footer />
      <Toaster position="top-right" richColors />
    </main>
  );
};

export default MainLayout;
