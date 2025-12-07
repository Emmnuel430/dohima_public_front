import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

// Import des composants principaux
import LayoutPublic from "../components/public_layout/LayoutPublic";
import Loader from "../components/Layout/Loader";
import NotFound from "../components/NotFound";
import { RenderSection } from "./RenderSections";

// Composant pour affichage avec sidebar
import PageSidebarRDVLayout from "./PageSidebarRDVLayout";

const Page = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const LINK = process.env.REACT_APP_API_BASE_URL;
    const slugToUse = slug || "accueil";

    setLoading(true);

    const endpoint = `${LINK}/pages-public/${slugToUse}`;

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setPage(data);
        }
      })
      .catch((err) => {
        console.error("Erreur de chargement:", err);
        setNotFound(true);
      })
      .finally(() => {
        setLoading(false); // ✅ fin du chargement dans tous les cas
      });
  }, [slug, location.pathname]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (notFound) return <NotFound />;

  return (
    <LayoutPublic>
      {page.template === "avec_sidebar_rdv" ? (
        <PageSidebarRDVLayout page={page} />
      ) : (
        <>{page.sections.map((section) => RenderSection(section))}</>
      )}
    </LayoutPublic>
  );
};

export default Page;
