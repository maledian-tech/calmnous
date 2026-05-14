"use client";

import { useState } from "react";

type Props = {
  url: string;
};

export function SimplyBookEmbed({ url }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-[650px] w-full md:min-h-[820px]">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse rounded-2xl bg-secondary/60" />
      )}
      <iframe
        src={url}
        title="Book a session with Sotirios Batsos"
        className={`absolute inset-0 h-full w-full rounded-2xl border-0 transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        scrolling="yes"
      />
    </div>
  );
}
