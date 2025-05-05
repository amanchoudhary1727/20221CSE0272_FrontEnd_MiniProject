
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen waffle-bg flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bangers text-waffle-purple mb-4">404</h1>
        <div className="text-8xl mb-6 animate-bounce">🙃</div>
        <p className="text-xl font-comic text-gray-700 mb-6">
          Oops! Looks like Waffles accidentally ate this page. Not even digital chaos can explain where it went.
        </p>
        <a 
          href="/" 
          className="waffle-btn-primary inline-block"
        >
          Return to the Hub of Mild Chaos™
        </a>
      </div>
    </div>
  );
};

export default NotFound;
