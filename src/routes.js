// Importation des dépendances React et des composants nécessaires de React Router
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NotFound from "./components/NotFound";
// ---------------
import Page from "./pages/Page";
import ScrollToTop from "./components/ScrollToTop";
import SubsectionDetail from "./pages/SubsectionDetail";
import InfosDetails from "./pages/InfosDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* 1️⃣ Route pour la page d'accueil */}
        <Route path="/" element={<Navigate to="/accueil" replace />} />
        <Route path="/subsection/:id" element={<SubsectionDetail />} />
        <Route path="/infos/:id" element={<InfosDetails />} />

        {/* 2️⃣ Route dynamique pour toutes les pages CMS via slug */}
        <Route path="/:slug" element={<Page />} />
        {/* 404 si la page n'est pas reconnue */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
