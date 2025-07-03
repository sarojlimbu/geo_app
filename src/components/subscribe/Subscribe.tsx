import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Subscribe: React.FC = () => {
  return (
    <div className="relative bg-white">
      <div
        className="z-2 h-fit item-row absolute  md:-top-35 left-1/2 
                    transform -translate-x-1/2 responsive-view w-full"
      >
        <div className="w-full rounded-3xl bg-gradient-to-br from-[#0a2a6c] to-[#092f70] text-white py-12 px-4 md:px-0">
          <div className="w-full max-w-3xl mx-auto text-center px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Subscribe to our Newsletter!
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-8">
              Join our subscriber list to receive latest news & updates.
            </p>

            <form className="w-full flex flex-col gap-4 sm:flex-row items-center justify-center">
              <Input
                type="email"
                placeholder="Enter your mail address"
                className="w-full sm:w-[60%] bg-white text-black placeholder:text-gray-500"
              />
              <Button
                type="submit"
                className="w-full sm:w-auto bg-yellow-400 text-blue-900 font-semibold hover:bg-yellow-500 transition-colors"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
