"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    SimplybookWidget: new (config: Record<string, unknown>) => void;
  }
}

const SIMPLYBOOK_URL = "https://calmnous.simplybook.it";
const CONTAINER_ID = "sbw-calmnous-booking";

// Colours from globals.css: --accent hsl(38 45% 58%), --primary hsl(215 50% 22%), --muted-foreground hsl(215 15% 45%)
const THEME = {
  base: "#c4a164",
  primary: "#1c3454",
  muted: "#697588",
} as const;

export function SimplyBookEmbed() {
  const [scriptReady, setScriptReady] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);
  const initialized = useRef(false);

  const initWidget = useCallback(() => {
    if (initialized.current || typeof window === "undefined" || !window.SimplybookWidget) return;
    initialized.current = true;

    new window.SimplybookWidget({
      widget_type: "iframe",
      url: SIMPLYBOOK_URL,
      container_id: CONTAINER_ID,
      theme: "default",
      theme_settings: {
        sb_base_color: THEME.base,
        btn_color_1: THEME.primary,
        link_color: THEME.primary,
        sb_text_color: THEME.primary,
        sb_text_color_2: THEME.muted,
        timeline_show_end_time: "0",
        hide_past_days: "0",
        timeline_hide_unavailable: "1",
        hide_login: "0",
        show_sidebar: "1",
      },
      timeline: "modern_iframe",
      datepicker: "top_calendar",
      is_rtl: false,
      app_config: {
        clear_session: 0,
        allow_switch_to_ada: 0,
        predefined: [],
      },
    });

    setWidgetReady(true);
  }, []);

  useEffect(() => {
    if (scriptReady) initWidget();
  }, [scriptReady, initWidget]);

  return (
    <div className="relative w-full">
      {!widgetReady && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 rounded-2xl overflow-hidden bg-secondary/40 min-h-[680px]"
        >
          <div className="flex h-full min-h-[680px] flex-col gap-6 p-8 md:flex-row">
            <div className="flex w-full flex-col gap-4 md:w-56">
              <div className="h-5 w-3/4 animate-pulse rounded-lg bg-border" />
              <div className="h-4 w-1/2 animate-pulse rounded-lg bg-border/70" />
              <div className="mt-2 h-px w-full bg-border/50" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-10 w-10 animate-pulse rounded-xl bg-border/60" style={{ animationDelay: `${i * 80}ms` }} />
                  <div className="flex flex-col gap-1.5">
                    <div className="h-3 w-20 animate-pulse rounded bg-border/60" style={{ animationDelay: `${i * 100}ms` }} />
                    <div className="h-2.5 w-14 animate-pulse rounded bg-border/40" style={{ animationDelay: `${i * 120}ms` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between">
                <div className="h-5 w-24 animate-pulse rounded-lg bg-border" />
                <div className="flex gap-2">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-border/70" />
                  <div className="h-8 w-8 animate-pulse rounded-full bg-border/70" />
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="aspect-square animate-pulse rounded-lg bg-border/50" style={{ animationDelay: `${i * 15}ms` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Script
        src="https://widget.simplybook.it/v2/widget/widget.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />

      <div
        id={CONTAINER_ID}
        className={`w-full rounded-2xl overflow-hidden transition-opacity duration-700 ${
          widgetReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
