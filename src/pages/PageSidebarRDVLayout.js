import FormRDV from "../components/rdv_form/FormRDV";
import { RenderSection } from "./RenderSections";
import React, { useState } from "react";
import ToastMessage from "../components/Layout/ToastMessage";

export default function PageSidebarRDVLayout({ page }) {
  const hero = page.sections[0];
  const otherSections = page.sections.slice(1); // Toutes les sections sauf la première

  const [toast, setToast] = useState({ message: "", success: true });

  const showToast = (message, success = true) => {
    setToast({ message, success });
    setTimeout(() => setToast({ message: "", success: true }), 4000);
  };

  const handleCloseToast = () => {
    setToast({ message: "", success: true });
  };

  return (
    <>
      {/* Hero */}
      {toast.message && (
        <ToastMessage
          message={toast.message}
          success={toast.success}
          onClose={handleCloseToast}
        />
      )}
      {RenderSection(hero)}

      {/* Section prise de RDV */}
      <div className="px-6 py-16 bg-white">
        {/* Partie droite : formulaire (40%) */}
        <div className="max-w-6xl mx-auto lg:w-full">
          <FormRDV showToast={showToast} />
        </div>
      </div>

      {/* Autres sections rendues normalement */}
      {otherSections.map((section) => RenderSection(section))}
    </>
  );
}
