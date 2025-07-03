import type React from "react";

import { ConnectForm } from "@/components";

const Connect: React.FC = () => {
  return (
    <>
      <div className="w-full bg-header pl-2 md:pl-0  md:pb-14 md:pt-12 relative">
        <div
          className="item-col lg:gap-6 md:gap-4 gap-2
         responsive-view  md:py-12 pt-4 md:pt-10 "
        >
          <span className="text-secondary text-sm font-bold">CONNECT</span>
          <div className="text-4xl text-primary">Reach Out With Our Team</div>
        </div>
      </div>
      <div className="w-full bg-header md:py-12 py-4 md:px-0 px-2">
        <div className="responsive-view grid md:grid-cols-[1fr_2fr] grid-cols-1 md:gap-8 gap-4">
          <div className="item-col gap-2">
            <span className="text-2xl md:mt-12">Contact</span>
            <span className="contact-style">
              Omkareshwor Mandir Road, Shantinagar, Kathmandu,Nepal
            </span>
            <span className="contact-style">
              +014-516543, +977-9802372160, +977-9802355093
            </span>
            <span className="contact-style">info@naxa.com.np</span>
            <span className="contact-style">hr@naxa.com.np</span>
          </div>
          <ConnectForm />
        </div>
      </div>
    </>
  );
};

export default Connect;
