import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { cleanHTML } from "../utils/cleanHtml";
import LayoutPublic from "../components/public_layout/LayoutPublic";
import Loader from "../components/Layout/Loader";

export default function SubsectionDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { type } = location.state || { type: "subsection" }; // 🔹 défaut : sous-section
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const LINK = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setLoading(true);
    const endpoint =
      type === "blog"
        ? `${LINK}/api/blogs-public/${id}`
        : `${LINK}/api/subsections/${id}`;

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id, LINK, type]);

  return (
    <LayoutPublic>
      <div className="max-w-4xl mt-[7rem] md:mt-[10rem] mb-3 mx-auto px-4">
        {/* Lien "Retour" stylé */}
        <div className="mb-6">
          <Link
            to="/actualites"
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full  bg-primary shadow-lg hover:bg-yellowCustom hover:text-primary text-yellowCustom transition transform hover:-translate-y-0.5 focus:ring-2 duration-500"
            aria-label="Retour aux actualités"
          >
            <i className="fa fa-chevron-left"></i>
            <span className="font-medium">Retour</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader />
          </div>
        ) : !item ? (
          <p className="text-center text-red-500">Contenu introuvable.</p>
        ) : (
          <div className="border mx-4 bg-white rounded-2xl shadow-md space-y-6 p-6">
            {/* 🔹 Titre */}
            <h2 className="text-3xl font-semibold text-gray-800">
              {item.title}
            </h2>

            {/* 🔹 Date */}
            {(item.publish_at || item.date || item.created_at) && (
              <p className="text-sm text-gray-500">
                📅{" "}
                {new Date(
                  item.publish_at || item.date || item.created_at
                ).toLocaleDateString()}
              </p>
            )}

            {/* 🔹 Image */}
            {item.image && (
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full max-h-[60vh] object-cover"
                />
              </div>
            )}

            {/* 🔹 Contenu HTML */}
            <div
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html: item.content ? cleanHTML(item.content) : "",
              }}
            />
          </div>
        )}
      </div>
    </LayoutPublic>
  );
}
