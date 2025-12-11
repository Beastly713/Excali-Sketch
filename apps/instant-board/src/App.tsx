import { useState, useEffect } from "react";
import { 
  Excalidraw, 
  MainMenu, 
  WelcomeScreen, 
  Footer 
} from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

// -----------------------------------------------------------------------------
// TYPE CONFLICT FIX (React 19 vs 18)
// -----------------------------------------------------------------------------
const ExcalidrawWrapper = Excalidraw as any;
const MainMenuWrapper = MainMenu as any;
const WelcomeScreenWrapper = WelcomeScreen as any;
const FooterWrapper = Footer as any;

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ExcalidrawWrapper
        theme="dark"
        isCollaborating={false}
        UIOptions={{
          canvasActions: {
            changeViewBackgroundColor: true,
            clearCanvas: true,
            loadScene: true,
            saveToActiveFile: true,
            toggleTheme: true,
            saveAsImage: true,
            export: { saveFileToDisk: true },
          },
        }}
      >
        <MainMenuWrapper>
          <MainMenuWrapper.DefaultItems.LoadScene />
          <MainMenuWrapper.DefaultItems.SaveToActiveFile />
          <MainMenuWrapper.DefaultItems.Export />
          <MainMenuWrapper.DefaultItems.SaveAsImage />
          <MainMenuWrapper.DefaultItems.Help />
          <MainMenuWrapper.DefaultItems.ClearCanvas />
          <MainMenuWrapper.Separator />
          <MainMenuWrapper.DefaultItems.ToggleTheme />
          <MainMenuWrapper.DefaultItems.ChangeCanvasBackground />
        </MainMenuWrapper>

        {/* --- CUSTOM WELCOME SCREEN --- */}
        <WelcomeScreenWrapper>
          {/* We intentionally do NOT render <WelcomeScreen.Hints> here to remove the arrows/hints */}
          
          <WelcomeScreenWrapper.Center>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontFamily: "system-ui, -apple-system, sans-serif",
                pointerEvents: "none", // Allows clicks to pass through if needed, though WelcomeScreen handles this
                userSelect: "none",
              }}
            >
              <h1
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "800",
                  letterSpacing: "-0.05em",
                  margin: "0",
                  background: "linear-gradient(135deg, #34d399 0%, #2dd4bf 100%)", // Emerald to Teal gradient
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
                }}
              >
                Excali-Sketch
              </h1>
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  color: "#94a3b8", // Slate-400
                  marginTop: "0.5rem",
                  opacity: 0.8,
                }}
              >
                your offline whiteboard
              </p>
            </div>
          </WelcomeScreenWrapper.Center>
        </WelcomeScreenWrapper>

        <FooterWrapper>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
             <p style={{ fontSize: "0.8rem", opacity: 0.5, color: "#94a3b8" }}>
               Local Mode • Data saved to browser
             </p>
          </div>
        </FooterWrapper>
      </ExcalidrawWrapper>
    </div>
  );
}

export default App;