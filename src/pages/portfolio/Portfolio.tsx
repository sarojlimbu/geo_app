import React, { useEffect, useState, useRef, useCallback } from "react";

import { LoadingCard, PortfolioCard } from "@/components";
import { KEY_HIGHLIGHTS } from "@/constants/keys";
import { usePortfolioStore } from "@/stores/portfolio/portfolio.store";

const BATCH_SIZE = 4;
const LOAD_MORE_STEP = 2;

const Portfolio: React.FC = () => {
  const { loading, projects, fetchProjects } = usePortfolioStore();
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchProjects(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisibleCount((prev) =>
          Math.min(prev + LOAD_MORE_STEP, projects.length),
        );
      }
    },
    [projects.length],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: 1.0,
    });
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => observer.disconnect();
  }, [onIntersect]);

  const isLoading = loading && projects.length === 0;

  return (
    <>
      <div className="w-full bg-header pb-20 md:pb-14 md:pt-12 relative">
        <div
          className="item-col items-center lg:gap-6 md:gap-4 gap-2
         responsive-view py-30 md:py-12 pt-10 "
        >
          <span className="text-secondary text-sm font-bold"> PORTFOLIO</span>
          <div className="text-4xl text-center">
            Diverse, <span className="text-primary">Impactful</span>, and
            Reliable.
          </div>
        </div>
        <div
          className="z-2 h-fit item-row absolute lg:-bottom-12 md:-bottom-16 -bottom-34 left-1/2 
        transform -translate-x-1/2 responsive-view w-full"
        >
          <div
            className="px-6 py-2 bg-white shadow-xl h-full 
           w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1"
          >
            {KEY_HIGHLIGHTS?.map((data) => (
              <span
                key={data}
                className="hover:bg-[var(--color-secondary)] hover:text-[var(--text-primary)] 
              ease-in-out  transition-colors duration-400 text-xs font-bold text-gray-600 
              item-row p-2 cursor-pointer md:w-50 w-full"
              >
                {data}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:gap-12 mt-50 md:mt-30 gap-6">
        {isLoading ? (
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-10 responsive-view">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-10 responsive-view">
            {projects.slice(0, visibleCount).map((project) => (
              <div
                key={project.id}
                className="transition-all duration-300 ease-in-out animate-slide-up"
              >
                <PortfolioCard project={project} />
              </div>
            ))}
            {visibleCount < projects.length && (
              <div ref={loadMoreRef} className="h-10 col-span-full"></div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolio;
