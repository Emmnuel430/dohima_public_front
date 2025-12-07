import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Ne scroll qu'en cas de navigation PUSH ou POP
    // Tu peux choisir si tu veux scroll aussi quand c’est un BACK (POP)
    if (navigationType === "PUSH" || navigationType === "POP") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;
