import { useEffect, useState, useRef } from "react";

const AdsenseAd = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const adRef = useRef(null);

  useEffect(() => {
    let observer;

    // Delay initial load state
    const loaderTimer = setTimeout(() => {
      if (adRef.current) {
        observer = new MutationObserver((mutationsList) => {
          for (const mutation of mutationsList) {
            if (
              mutation.type === "childList" &&
              adRef.current.querySelector("iframe")
            ) {
              setIsLoaded(true);
              observer.disconnect();
              break;
            }
          }
        });

        observer.observe(adRef.current, {
          childList: true,
          subtree: true,
        });

        try {
          if (window.adsbygoogle && process.env.NODE_ENV === "production") {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (e) {
          console.error("AdSense error", e);
          setIsLoaded(true);
        }
      }
    }, 500); // start observing after slight delay

    return () => {
      clearTimeout(loaderTimer);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div className="my-8 flex justify-center">
      <div
        ref={adRef}
        className={`w-full h-[100px] rounded-md overflow-hidden ${
          isLoaded ? "" : "bg-slate-200 animate-pulse"
        }`}
      >
        {/* Render ad only once */}
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100px" }}
          data-ad-client="ca-pub-3149348169549998"
          data-ad-slot="4931964680"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
};

export default AdsenseAd;
