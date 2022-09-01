import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

type SideAdsenseProps = {
  currentPath: string;
}

export default function SideAdsense({ currentPath }: SideAdsenseProps) {

  const loadAds = () => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error: any) {
      console.log("adsense error", error.message);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  return (
    <div key={currentPath}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4905108546886726"
        data-ad-slot="6152059660"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}