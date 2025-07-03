import type React from "react";

import { ConnectForm } from "@/components";

const Connect: React.FC = () => {
  return (
    <div className="w-full bg-header md:py-12 py-4">
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
  );
};

export default Connect;
