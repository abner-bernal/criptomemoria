import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export default function SideAdsense() {

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
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-4905108546886726"
      data-ad-slot="6152059660"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}