import React, { Suspense } from "react";
import { useInView } from "react-intersection-observer";
import CandlestickLoader from "./Common/CandleStickLoader";
import Loader from "./Loader/Loader";

const LazyComponent = ({ Component }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100%", // preload early
  });

  return (
    <div ref={ref}>
      {inView && (
        <Suspense fallback={<Loader />}>
          <Component />
        </Suspense>
      )}
    </div>
  );
};

export default LazyComponent;
