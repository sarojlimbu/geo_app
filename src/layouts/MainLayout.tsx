import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import { Footer, Header, Subscribe } from "@/components";

const MainLayout: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col  w-full max-w-full">
      <section className="z-2 bg-header">
        <Header />
      </section>
      <section className="flex-1 md:m-0 m-4 h-full pb-4 md:pb-10">
        <Outlet />
      </section>
      <section className="pt-10 md:pt-50 bg-white  w-full">
        <Subscribe />
      </section>
      <section className="h-120 md:h-80 bg-header">
        <Footer />
      </section>
      <Toaster position="top-right" richColors />
    </main>
  );
};

export default MainLayout;
