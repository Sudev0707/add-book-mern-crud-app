import React from "react";
import Navbar from "./component/Navbar";
import Home from "./component/Home";

const App = () => {
  return (
    <>
      {/* <h4 className="text-4xl text-red-300">This is App comoponent</h4> */}
      <div className="min-h-screen w-full px-10">
        <Navbar />
        <div className="mt-24">
          <Home />
        </div>
      </div>
    </>
  );
};

export default App;
