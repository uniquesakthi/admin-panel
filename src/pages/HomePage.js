// src/pages/HomePage.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">
        <h2 className="text-xl font-semibold">Home Page</h2>
        <p>This is the home page of the app.</p>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
