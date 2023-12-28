import React from "react";
import "./App.css";
import Header from "./components/Header";
import CommunityList from "./components/CommunityList";

function App() {
  return (
    <div
      className="App"
      style={{
        background:
          "linear-gradient(to bottom, #14625d, #14625d 3%, #08687d 36%, #0d8f8f 65%, #099 82%, #0ba4aa)",
        minHeight: "100vh",
      }}
    >
      <Header />
      <CommunityList />
    </div>
  );
}

export default App;
