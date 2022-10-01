import React from "react";

function getWindowWidth() {
  const { innerWidth: width } = window;
  return { width }
}

export default function useWindowWidth() {
  const [ windowWidth, setWindowWidth ] = React.useState(getWindowWidth());

  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
}