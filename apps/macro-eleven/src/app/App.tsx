import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DeviceProvider, useDevice } from "./providers";
import { NavBar } from "../shared/ui/NavBar";
import { StatusBadge } from "../shared/ui/StatusBadge";
import { KeyTesterPage } from "../pages/KeyTesterPage";
import { LayerViewerPage } from "../pages/LayerViewerPage";
import { PotMonitorPage } from "../pages/PotMonitorPage";
import "./App.css";

function AppHeader() {
  const { status, connect, disconnect } = useDevice();

  return (
    <header className="app-header">
      <h1>Macro Eleven</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <StatusBadge status={status} />
        <button
          className={`connect-btn ${status === "connected" ? "connected" : ""}`}
          onClick={status === "connected" ? disconnect : connect}
        >
          {status === "connected" ? "Disconnect" : "Connect"}
        </button>
      </div>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <DeviceProvider>
        <NavBar />
        <div className="app-content">
          <AppHeader />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<KeyTesterPage />} />
              <Route path="/layers" element={<LayerViewerPage />} />
              <Route path="/pot" element={<PotMonitorPage />} />
            </Routes>
          </div>
        </div>
      </DeviceProvider>
    </BrowserRouter>
  );
}

export default App;
