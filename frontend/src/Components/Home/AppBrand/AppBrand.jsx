import "./AppBrand.scss";
import BrandName from "./BrandName";
import { useState } from "react";
import { useTheme } from "./../../../hooks/useTheme";

export default function AppTitle() {
  const { isDarkMode } = useTheme();
  return (
    <>
      <div
        className={`cc-logo-container ${
          isDarkMode ? "bg-dark dark-mode" : "light-mode bg-white"
        }`}
      >
        <img className="cc-logo-img" />
      </div>
    </>
  );
}
