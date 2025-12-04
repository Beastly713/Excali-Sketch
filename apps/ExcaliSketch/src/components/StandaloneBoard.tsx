"use client";
import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

const StandaloneBoard = () => {
  const [mounted, setMounted] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // We only care about elements.length, so a generic type is fine
  const onChange = (elements: readonly unknown[]) => {
    if (!hasDrawn && elements.length > 0) {
      setHasDrawn(true);
    }
  };

  if (!mounted) return <div className="h-screen w-screen bg-[#121212]" />;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <style>{`
        /* Only hiding the Help/Shortcuts button now (Bottom Right) */
        .layer-ui__wrapper .help-icon,
        button[aria-label="Help"] {
          display: none !important;
        }
        
        /* Hiding encryption shield */
        .encrypted-icon {
          display: none !important;
        }
      `}</style>

      {/* Custom Overlay - Fades out when you start drawing */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center justify-center transition-opacity duration-500 ${
          hasDrawn ? "opacity-0" : "opacity-40"
        }`}
      >
        <h1 className="text-5xl font-extrabold text-slate-300 tracking-tighter">
          Excali-Sketch
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Your offline whiteboard
        </p>
      </div>

      <Excalidraw
        theme="dark" // Forces Dark Mode by default
        initialData={{
          appState: {
            // viewBackgroundColor: "#ffffff", // Uncomment this if you want Dark UI but White Canvas
            currentItemStrokeColor: "#ffffff", // Default stroke color white for dark mode
            currentItemBackgroundColor: "transparent",
          },
        }}
        onChange={onChange}
        UIOptions={{
          canvasActions: {
            saveToActiveFile: false,
            loadScene: true,
            export: { saveFileToDisk: true },
            toggleTheme: true, // Allows user to switch back to light if they want
          },
        }}
      >
        <MainMenu>
          <MainMenu.DefaultItems.Export />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
          <MainMenu.DefaultItems.ToggleTheme />
        </MainMenu>
      </Excalidraw>
    </div>
  );
};

export default StandaloneBoard;
