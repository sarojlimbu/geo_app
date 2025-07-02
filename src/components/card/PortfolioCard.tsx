import React from "react";

import { getRandomColorTemplate } from "@/helpers";
import type { PortfolioProject } from "@/types/portfolio.types";

interface PortfolioCardProps {
  project: PortfolioProject;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project }) => {
  const colorPalette = getRandomColorTemplate();
  return (
    <div
      style={colorPalette}
      className="cursor-pointer item-col flex flex-col h-full transition-all duration-300 transform hover:-translate-y-4 hover:shadow-lg animate-slide-up-smooth py-4 md:py-0"
    >
      <div className="px-6 py-8 item-col gap-6">
        <span className="text-semibold">{project?.title}</span>
        <p className="text-xs">{project?.subtitle}</p>

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-secondary font-semibold">Client</p>
            <p className="font-semibold">{project?.clients}</p>
          </div>
          <div>
            <p className="text-secondary font-semibold">Time Duration</p>
            <p className="font-semibold">
              {project?.start_date} - {project?.end_date}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <img
          src={project?.photo}
          alt={project?.title}
          className="h-100 w-full object-cover"
        />
      </div>
    </div>
  );
};

export default PortfolioCard;
