import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cleanHTML } from "../../utils/cleanHtml";
import decoJaune from "../../assets/img/decoJaune.png";
import { formatDateRelative } from "../../utils/formatDateRelative";
import { useMemo } from "react";
import { useRef } from "react";

export const GridColumns = ({ section }) => (
  <section className="py-20 bg-gradient-to-b from-white to-gray-100 px-6 md:px-12">
    <div className="max-w-6xl mx-auto text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
        {section.title}
      </h2>
      {section.subtitle && (
        <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {section.subsections.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition-all duration-300"
        >
          {item.image && (
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              <img src={item.image} alt={item.title} className="h-10 w-10" />
            </div>
          )}
          <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
          <div
            className="text-gray-600 mt-3 text-justify"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      ))}
    </div>
  </section>
);

export const GridBlogCards = ({ section }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const produitsPerPage = 6;
  const LINK = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const sectionRef = useRef(null);

  const isBlogPage = location.pathname === "/actualites";

  useEffect(() => {
    setLoading(true);
    fetch(`${LINK}/api/blogs-public`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement articles:", err);
        setLoading(false);
      });
  }, [LINK]);

  // 🔹 Pagination
  const totalPages = Math.ceil(articles.length / produitsPerPage);

  const currentArticles = useMemo(() => {
    if (!isBlogPage) return articles.slice(0, 3);
    const startIndex = (currentPage - 1) * produitsPerPage;
    return articles.slice(startIndex, startIndex + produitsPerPage);
  }, [articles, currentPage, isBlogPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);

      // 🔹 Scroll vers la section au lieu de toute la page
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="nos-services"
      className="py-20 px-6 md:px-12 w-full scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold mt-3 uppercase">
              {section.title}
            </h2>
            <hr className="w-24 h-2 bg-yellowCustom" />
            {section.subtitle && (
              <p className="montserrat text-gray-400">{section.subtitle}</p>
            )}
          </div>

          {!isBlogPage && (
            <div>
              <Link
                to="/actualites"
                className="text-white mt-5 inline-block px-3 py-2 bg-primary rounded 
                 hover:bg-primary/80 hover:text-white transition duration-300"
              >
                Voir plus →
              </Link>
            </div>
          )}
        </div>

        {/* 🦴 Skeleton loader */}
        {loading ? (
          <div className="flex flex-wrap justify-center gap-6 mx-auto animate-pulse">
            {Array.from({ length: isBlogPage ? 6 : 3 }).map((_, i) => (
              <div
                key={i}
                className="w-full md:w-[48%] xl:w-[30%] border rounded-xl bg-white overflow-hidden"
              >
                <div className="p-4">
                  <div className="w-full h-56 rounded-xl bg-gray-200"></div>
                </div>
                {/* <div className="px-6 pb-6">
                  <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-200 w-1/3 rounded"></div>
                </div> */}
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* CARTES */}
            <div className="flex flex-wrap justify-center gap-6 mx-auto">
              {currentArticles.map((item, index) => (
                <div
                  key={index}
                  className="w-full md:w-[48%] xl:w-[30%] max-w-[400px] border rounded-xl hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300 bg-white"
                >
                  <div className="p-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-56 rounded-xl object-cover border"
                      />
                    ) : (
                      <div className="w-full h-56 rounded-xl bg-slate-500 flex items-center justify-center text-gray-400">
                        <i className="fa fa-image text-4xl"></i>
                      </div>
                    )}
                  </div>

                  <div className="px-6 pb-6 flex flex-col flex-1">
                    <div>
                      <h3 className="text-xl font-medium">{item.title}</h3>
                      <p className="text-gray-400 text-sm my-3 text-right">
                        {formatDateRelative(item.created_at)}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <Link
                        to={`/subsection/${item.id}`}
                        state={{ type: "blog" }}
                        className="text-xs w-fit mt-2 inline-block p-2 bg-yellowCustom rounded 
     hover:bg-yellowCustom/50 text-primary font-semibold transition duration-300"
                      >
                        Lire plus →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔸 Bouton ou pagination selon la page */}
            {isBlogPage && (
              <nav className="mt-10 flex justify-center">
                <ul className="flex items-center gap-1">
                  {/* Précédent */}
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`montserrat px-3 py-1 rounded border text-sm ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Précédent
                    </button>
                  </li>

                  {/* Pages dynamiques */}
                  {[...Array(totalPages).keys()]
                    .map((_, i) => i + 1)
                    .filter(
                      (p) =>
                        p === 1 ||
                        p === totalPages ||
                        (p >= currentPage - 1 && p <= currentPage + 1)
                    )
                    .map((p, i, pages) => (
                      <React.Fragment key={p}>
                        {i > 0 && p !== pages[i - 1] + 1 && (
                          <li>
                            <span className="montserrat px-3 py-1 text-gray-500">
                              ...
                            </span>
                          </li>
                        )}
                        <li>
                          <button
                            onClick={() => handlePageChange(p)}
                            className={`montserrat px-3 py-1 rounded border text-sm ${
                              currentPage === p
                                ? "bg-yellow-500 text-white font-bold"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {p}
                          </button>
                        </li>
                      </React.Fragment>
                    ))}

                  {/* Suivant */}
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`montserrat px-3 py-1 rounded border text-sm ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Suivant
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export const GridVideo = ({ section }) => {
  // Fonction utilitaire pour extraire l'ID YouTube
  const extractYouTubeId = (url) => {
    if (!url) return null;
    const reg = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/))([^"&?/ ]{11})/;
    const match = url.match(reg);
    return match ? match[1] : null;
  };

  // Limite à 5 vidéos
  const videos = section.subsections.slice(0, 5);
  return (
    <section className="py-20 bg-white px-6 md:px-12">
      <div className="bg-primary p-10 rounded-lg max-w-6xl mx-auto">
        <div className="mb-10 flex justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl text-white font-bold mt-3 uppercase">
              {section.title}
            </h1>
            <hr className="w-24 h-2 bg-yellowCustom" />
            {section.subtitle && (
              <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
            )}
          </div>

          {section.button_text && section.button_link && (
            <div>
              <Link
                to={section.button_link}
                className="text-primary mt-5 inline-block px-3 py-2 bg-yellowCustom rounded font-semibold
                 hover:bg-yellowCustom/80 transition duration-300"
              >
                {section.button_text}
              </Link>
            </div>
          )}
        </div>

        <div className="w-full">
          {/* DESKTOP / TABLET */}
          <div className="hidden lg:flex w-full flex-col lg:flex-row gap-10">
            {/* Colonne gauche */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-center">
              {videos[0] && (
                <VideoCardLarge
                  item={videos[0]}
                  extractYouTubeId={extractYouTubeId}
                />
              )}
            </div>

            {/* Colonne droite */}
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 items-center">
              {videos.slice(1).map((item, index) => (
                <VideoCardSmall
                  key={index}
                  item={item}
                  extractYouTubeId={extractYouTubeId}
                />
              ))}
            </div>
          </div>

          {/* MOBILE */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((item, index) => (
              <VideoCardSmall
                key={index}
                item={item}
                extractYouTubeId={extractYouTubeId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------- CARTE LARGE (gauche PC) -------------------------- */
const VideoCardLarge = ({ item, extractYouTubeId }) => {
  const videoId = extractYouTubeId(item.subtitle);

  return (
    <a
      href={item.subtitle}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="flex flex-col rounded-xl border p-4">
        <div className="relative w-full h-full rounded-t-xl overflow-hidden shadow-lg">
          {videoId ? (
            <>
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt={item.title}
                className="w-full object-cover group-hover:scale-105 transition duration-300"
              />

              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fa fa-play text-white text-4xl opacity-80"></i>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-5xl">
              <i className="fa fa-image"></i>
            </div>
          )}
        </div>
        <div className="pl-2 bg-white rounded-b-xl py-2 lg:py-0">
          <p className="font-semibold text-primary capitalize">{item.title}</p>
        </div>
      </div>
    </a>
  );
};

/* -------------------------- PETITE CARTE (mise à niveau) -------------------------- */
const VideoCardSmall = ({ item, extractYouTubeId }) => {
  const videoId = extractYouTubeId(item.subtitle);

  return (
    <a
      href={item.subtitle}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center border p-2 rounded-lg shadow transition"
    >
      {/* Preview YouTube */}
      <div className="relative w-full rounded-lg overflow-hidden shrink-0">
        {videoId ? (
          <>
            <img
              src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />

            {/* Overlay hover */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition duration-300"></div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fa fa-play text-white text-xl opacity-80"></i>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <i className="fa fa-image text-gray-400 text-2xl"></i>
          </div>
        )}
      </div>

      {/* TEXT */}
      <div className="pl-2 py-2 lg:py-0 bg-white rounded-b-lg w-full">
        <p className="font-semibold text-primary capitalize">{item.title}</p>
      </div>
    </a>
  );
};

// ----------------------

export const GridCards = ({ section }) => (
  <section
    id="nos-services"
    className="py-20 bg-[#F8F3E7] px-6 md:px-12 w-full"
  >
    <div className="max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mt-3 merriweather">
          {section.title}
        </h1>{" "}
        {section.subtitle && (
          <h1 className="text-3xl md:text-4xl font-semibold text-primary">
            {section.subtitle}
          </h1>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-6 mx-auto">
        {section.subsections.map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-[48%] lg:w-[30%] border rounded-xl drop-shadow-xl overflow-hidden flex flex-col transition-all duration-300 bg-white"
          >
            <div className="p-4 flex justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-32 rounded-xl object-contain"
                />
              ) : (
                <div className="w-32 h-32 rounded-xl bg-slate-500 flex items-center justify-center text-gray-400">
                  <i className="fa fa-image text-2xl"></i>
                </div>
              )}
            </div>

            <div className="px-6 pb-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-2xl font-bold merriweather text-center">
                  {item.title}
                </h3>

                <div
                  className="my-4 text-sm"
                  dangerouslySetInnerHTML={{ __html: cleanHTML(item.content) }}
                />

                {item.button_text && item.button_link && (
                  <a
                    href={item.button_link}
                    className="rounded-full bg-yellowCustom text-white px-3 py-2 font-medium hover:opacity-70 transition"
                  >
                    {item.button_text}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const GridImages = ({ section }) => (
  <section className="py-20 bg-slate-100 px-6 md:px-12 w-full">
    <div className="max-w-7xl mx-auto">
      {/* Header section */}
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary">
          {section.title}
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {section.subsections.map((item, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden group h-72 flex items-end justify-center"
            style={{
              backgroundImage:
                "https://images.pexels.com/photos/271667/pexels-photo-271667.jpeg?_gl=1*15qtjbz*_ga*MTE4NDc5MTMxNi4xNzY1MTAxMzUz*_ga_8JE65Q40S6*czE3NjUxMDEzNTMkbzEkZzEkdDE3NjUxMDIwMTYkajUxJGwwJGgw"
                  .image
                  ? `url(${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Fallback si pas d'image */}
            {!item.image && (
              <div className="absolute inset-0 bg-slate-500 flex items-center justify-center text-gray-300 text-4xl">
                <i className="fa fa-image"></i>
              </div>
            )}

            {/* Backdrop */}
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition"></div>

            {/* Texte en bas */}
            <div className="relative z-10 p-6 text-center text-white w-full">
              {item.subtitle && (
                <p className="text-sm mb-1 opacity-90">{item.subtitle}</p>
              )}
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              {item.button_text && item.button_link && (
                <a
                  href={item.button_link}
                  className="inline-block rounded-full bg-yellowCustom text-white px-4 py-2 font-medium hover:opacity-80 transition"
                >
                  {item.button_text}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const GridCardsWithoutImage = ({ section }) => {
  const [rubriques, setRubriques] = useState([]);
  const LINK = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${LINK}/api/rubriques-public`)
      .then((res) => res.json())
      .then((data) => setRubriques(data))
      .catch((err) => console.error("Erreur chargement rubriques:", err));
  }, [LINK]);

  return (
    <section id="services" className="bg-background px-6 md:px-12 ">
      <div className="max-w-7xl mx-auto w-full">
        {/* Titre et sous-titre */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="mt-3 text-gray-600 text-sm">{section.subtitle}</p>
          )}
        </div>

        {/* Grid de cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {section.subsections.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white border border-slate-200 p-4 hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300"
            >
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-semibold text-primary">
                    {item.title}
                  </h3>
                  <div
                    className="text-gray-600 mt-2 text-sm text-justify"
                    dangerouslySetInnerHTML={{
                      __html: cleanHTML(item.content),
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tableau dynamique */}
        {rubriques.length > 0 && (
          <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="text-left pl-10">Rubrique</th>
                  {rubriques.map((r) => (
                    <th key={r.id} className="text-left p-3">
                      {r.titre}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-primary">
                <tr>
                  <td className="pl-10">Plage de support</td>
                  {rubriques.map((r) => (
                    <td key={r.id} className="p-3">
                      {r.plage_support}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="pl-10">TTI / TTR cibles</td>
                  {rubriques.map((r) => (
                    <td key={r.id} className="p-3">
                      {r.tti_ttr}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="pl-10">Préventif</td>
                  {rubriques.map((r) => (
                    <td key={r.id} className="p-3">
                      {r.preventif}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="pl-10">Pièces & consommables</td>
                  {rubriques.map((r) => (
                    <td key={r.id} className="p-3">
                      {r.pieces_conso}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="pl-10">Reporting</td>
                  {rubriques.map((r) => (
                    <td key={r.id} className="p-3">
                      {r.reporting}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export function GridWithoutTitle({ section }) {
  return (
    <section id="produits" className="py-20 px-6 md:px-12">
      {/* Titre + Sous-titre */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary">
          {section.title}
        </h1>
        {section.subtitle && (
          <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {(section.subsections || []).map((item, i) => (
          <Link
            key={i}
            to={item.button_link || "/"}
            className="relative rounded-xl overflow-hidden shadow-lg w-full md:w-[48%] lg:w-[22%] h-[370px] m-h-[360px] aspect-[3/4] flex items-center justify-center text-center bg-primary text-white hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-col items-center justify-center p-6">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-48 h-48 mb-4 object-contain"
                />
              )}
              <h3 className="text-lg font-bold mb-1 uppercase">GAMME</h3>
              <h1 className="text-3xl font-bold mb-1 uppercase">
                {item.title}
              </h1>
              {item.subtitle && (
                <p className="text-sm opacity-80">{item.subtitle}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export const GridRows = ({ section }) => {
  if (!section?.subsections?.length) return null;

  return (
    <section
      id="downloads"
      className="min-h-screen py-20 bg-white relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          {section.title}
        </h1>{" "}
        <ul className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
          {section.subsections.map((item, index) => (
            <li
              key={index}
              className="rounded-2xl border-2 border-slate-600 p-4 flex items-center justify-between"
            >
              <span>{item.title}</span>
              {item.button_text && item.button_link && (
                <a
                  href={item.button_link}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-force underline-offset-4"
                  onClick={() =>
                    window.gtag &&
                    window.gtag("event", "download_fiche", {
                      label: item.title,
                    })
                  }
                >
                  {item.button_text}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute top-0 right-0 h-full w-auto pointer-events-none flex flex-col">
        {Array.from({ length: 4 }).map((_, i) => (
          <img
            key={i}
            src={decoJaune}
            alt="decor"
            className="opacity-50 w-auto h-[200px] object-contain"
            style={{
              filter: "hue-rotate(180deg) saturate(200%) brightness(0.8)", // recoloration bleu
            }}
          />
        ))}
      </div>
    </section>
  );
};

export const GridThreeIcon = ({ section }) => {
  return (
    <section className="py-20 bg-white px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {section.subsections.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 border rounded-xl shadow-sm hover:shadow-lg transition"
          >
            {item.icon && (
              <div className="text-4xl text-orange-600 mb-4">
                <i className={item.icon}></i>
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-800">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
            )}
            {item.content && (
              <div
                className="mt-2 text-gray-600 text-sm"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export function CategoryGrid({ section }) {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const LINK = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setLoading(true);
    fetch(`${LINK}/api/menus-public`)
      .then((res) => res.json())
      .then((data) => {
        setMenus(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement menus:", err);
        setLoading(false);
      });
  }, [LINK]);

  // On regroupe les menus par type (clé = nom du type)
  const menusParType = useMemo(() => {
    const map = {};

    menus.forEach((menu) => {
      const type = menu.type;
      if (!type) return;

      if (!map[type]) {
        map[type] = [];
      }

      map[type].push(menu);
    });

    return map;
  }, [menus]);

  // On limite à 4 types max pour l'affichage
  const typesAffiches = useMemo(() => {
    return Object.keys(menusParType)
      .slice(0, 4)
      .map((type) => ({
        type: type,
        menus: menusParType[type],
      }));
  }, [menusParType]);

  return (
    <section id="menus" className="py-20 px-6 md:px-24">
      <div className="max-w-6xl mx-auto mb-14">
        <h2 className="text-3xl md:text-4xl font-semibold text-primary">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
        )}
      </div>

      {loading ? (
        // ✅ SKELETON
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto animate-pulse">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl p-8 shadow-md flex flex-col justify-between min-h-[200px]"
            >
              {/* Skeleton Header */}
              <div className="flex items-center justify-center mb-4 gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              </div>

              {/* Skeleton Produits */}
              <ul className="mt-4 space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="h-3 w-3/4 bg-gray-300 rounded"></li>
                ))}
              </ul>

              {/* Skeleton bouton */}
              <div className="mt-6 w-1/2 mx-auto h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {typesAffiches.map((cat, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-2xl shadow-lg p-8 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[100px]"
            >
              {/* HEADER */}
              <div className="">
                <h3 className="text-xl font-semibold text-gray-800">
                  {cat.type}
                </h3>
              </div>

              <ul className="text-left mt-2 text-gray-700">
                {cat.menus.slice(0, 5).map((menu) => (
                  <>
                    <li
                      key={menu.id}
                      className="mb-1 capitalize flex justify-between text-gray-800"
                    >
                      <p className="break-words max-w-[70%]">
                        •&nbsp;{menu.titre}
                      </p>
                      {menu.prix && (
                        <p className="shrink-0">{menu.prix} FCFA</p>
                      )}
                    </li>

                    <p className="text-sm text-gray-500 mb-3">
                      {menu.description}
                    </p>
                  </>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function GalerieGrid({ section }) {
  const [galeries, setGaleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionGaleryRef = useRef(null);

  const LINK = process.env.REACT_APP_API_URL;
  const perPage = 4;

  useEffect(() => {
    setLoading(true);
    fetch(`${LINK}/api/galeries-public`)
      .then((res) => res.json())
      .then((data) => {
        setGaleries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement galeries:", err);
        setLoading(false);
      });
  }, [LINK]);
  // console.log(galeries);

  // ✅ Regroupement par catégorie
  const galeriesParCategorie = useMemo(() => {
    const map = {};
    galeries.forEach((img) => {
      const cat = img.categorie?.trim() || "Autres";
      if (!map[cat]) map[cat] = [];
      map[cat].push(img);
    });

    // Trier les catégories + les éléments de chaque catégorie
    const sortedMap = {};

    Object.keys(map)
      .sort((a, b) => a.localeCompare(b)) // 🔥 tri alphabétique des catégories
      .forEach((cat) => {
        sortedMap[cat] = map[cat].sort((a, b) =>
          (a.titre || "").localeCompare(b.titre || "")
        ); // 🔥 tri interne des images
      });

    return sortedMap;
  }, [galeries]);

  // Liste des catégories triées
  const categories = Object.keys(galeriesParCategorie);

  const totalPages = Math.ceil(categories.length / perPage);

  const paginatedCategories = categories
    .slice((page - 1) * perPage, page * perPage)
    .map((cat) => ({
      categorie: cat,
      images: galeriesParCategorie[cat],
    }));

  return (
    <div
      id="galerie"
      ref={sectionGaleryRef}
      className="max-w-7xl mx-auto py-20"
    >
      <div className="max-w-6xl mx-auto mb-14 px-6 xl:px-0 text-center">
        <div className="mb-10 flex justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mt-3 merriweather">
              {section.title}
            </h2>
            {/*  <hr className="w-24 h-2 bg-yellowCustom" /> */}
            {section.subtitle && (
              <p className="montserrat text-gray-400">{section.subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        // ✅ Skeleton
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 animate-pulse">
          {Array.from({ length: galeriesParCategorie.length }).map(
            (_, index) => (
              <div
                key={index}
                className="rounded-2xl bg-gray-200 h-[250px]"
              ></div>
            )
          )}
        </div>
      ) : (
        <>
          {/* ✅ Cartes Catégories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
            {paginatedCategories.map(({ categorie, images }, idx) => {
              const cover = images[0];
              const previews = images.slice(0, 2);

              return (
                <div
                  key={idx}
                  className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-[250px] md:h-[350px] flex items-end justify-between"
                  onClick={() => setSelectedCategory({ categorie, images })}
                >
                  {/* ✅ Image principale ou fallback */}
                  {cover?.image ? (
                    <img
                      src={cover.image}
                      alt={categorie}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-500 flex items-center justify-center text-gray-300">
                      <i className="fa fa-image text-5xl"></i>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>

                  {/* ✅ Infos Catégorie */}
                  <div className="relative z-10 text-white p-6 flex flex-col lg:flex-row gap-3 justify-between w-full">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold">
                        {categorie}
                      </h3>
                      <p className="montserrat text-xs text-gray-200">
                        {images.length} image{images.length > 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      {previews.length > 0 ? (
                        previews.map((img, i) =>
                          img.image ? (
                            <img
                              key={i}
                              src={img.image}
                              alt={img.titre}
                              className="w-12 h-12 rounded-xl border-2 border-white object-cover shadow"
                              onError={(e) =>
                                (e.currentTarget.style.display = "none")
                              }
                            />
                          ) : (
                            <div
                              key={i}
                              className="w-12 h-12 rounded-xl bg-slate-500 flex items-center justify-center text-gray-300 border-2 border-white shadow"
                            >
                              <i className="fa fa-image text-xs"></i>
                            </div>
                          )
                        )
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-500 flex items-center justify-center text-gray-300 border-2 border-white shadow">
                          <i className="fa fa-image text-xs"></i>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ✅ Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPage(i + 1);
                    // 🔹 Scroll vers la section au lieu de toute la page
                    sectionGaleryRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={`montserrat px-4 py-2 rounded-full border transition ${
                    page === i + 1
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* ✅ MODAL CATÉGORIE */}
      {selectedCategory && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-[999]"
          onClick={() => setSelectedCategory(null)}
        >
          <div
            className="bg-white rounded-lg max-w-5xl w-[90%] max-h-[90vh] relative p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton de fermeture */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full h-10 w-10 font-bold shadow opacity-70 hover:opacity-100 transition"
            >
              ✕
            </button>

            {/* Titre */}
            <h3 className="text-2xl font-bold mb-6 text-center">
              {selectedCategory.categorie}
            </h3>

            {/* ✅ Grille d'images scrollable uniquement */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 overflow-y-auto pr-2"
              style={{ maxHeight: "65vh" }}
            >
              {selectedCategory.images.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square cursor-pointer hover:opacity-80 transition"
                  onClick={() => setSelectedImage(img)}
                >
                  {img.image ? (
                    <img
                      src={img.image}
                      alt={img.titre}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-500 rounded text-gray-300">
                      <i className="fa fa-image text-2xl"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ✅ MODAL IMAGE */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-[1000] flex justify-center items-center"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="montserrat absolute top-6 left-6 bg-white/90 text-black rounded-full h-12 w-12 shadow-md opacity-70 hover:opacity-100 transition"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <i className="fa fa-arrow-left text-xl"></i>
          </button>
          {selectedImage.image ? (
            <img
              src={selectedImage.image}
              alt={selectedImage.titre}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <div className="w-80 h-80 bg-slate-500 rounded flex items-center justify-center text-gray-300">
              <i className="fa fa-image text-5xl"></i>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function GridProjets({ section }) {
  // --------------------------
  // Fake data (3 projets)
  // --------------------------
  const projets = [
    {
      title: "Projet Eau Potable",
      description:
        "Installation d'un système de purification d'eau dans 3 villages.",
      start_date: "2025-01-10",
      end_date: "2025-03-15",
      progression: 65,
      statut: "en_cours",
      lien_donation: "/don/projet-eau",
      image:
        "https://images.pexels.com/photos/271667/pexels-photo-271667.jpeg?_gl=1*15qtjbz*_ga*MTE4NDc5MTMxNi4xNzY1MTAxMzUz*_ga_8JE65Q40S6*czE3NjUxMDEzNTMkbzEkZzEkdDE3NjUxMDIwMTYkajUxJGwwJGgw",
    },
    {
      title: "Construction d'une école",
      description: "Création d'un bâtiment scolaire pour 200 enfants.",
      start_date: "2025-02-01",
      end_date: "2025-10-30",
      progression: 40,
      statut: "en_cours",
      lien_donation: "/don/ecole",
      image:
        "https://images.pexels.com/photos/271667/pexels-photo-271667.jpeg?_gl=1*15qtjbz*_ga*MTE4NDc5MTMxNi4xNzY1MTAxMzUz*_ga_8JE65Q40S6*czE3NjUxMDEzNTMkbzEkZzEkdDE3NjUxMDIwMTYkajUxJGwwJGgw",
    },
    {
      title: "Projet Santé",
      description:
        "Financement d’un dispensaire de soins de première nécessité.",
      start_date: "2024-11-05",
      end_date: "2025-01-20",
      progression: 100,
      statut: "terminee",
      lien_donation: "/don/sante",
      image:
        "https://images.pexels.com/photos/271667/pexels-photo-271667.jpeg?_gl=1*15qtjbz*_ga*MTE4NDc5MTMxNi4xNzY1MTAxMzUz*_ga_8JE65Q40S6*czE3NjUxMDEzNTMkbzEkZzEkdDE3NjUxMDIwMTYkajUxJGwwJGgw",
    },
  ];

  // Petit helper (format date FR)
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <section className="py-20 bg-white px-6 md:px-12">
      {/* -------------------- */}
      {/*   HEADER CENTRÉ     */}
      {/* -------------------- */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="text-3xl md:text-4xl font-bold merriweather">
          {section.title}
        </h1>

        {section.subtitle && (
          <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
        )}

        {section.content && (
          <div
            className="mt-6 text-gray-700 leading-relaxed text-center"
            dangerouslySetInnerHTML={{
              __html: section.content,
            }}
          />
        )}
      </div>

      {/* -------------------------- */}
      {/*      GRID DES PROJETS      */}
      {/* -------------------------- */}
      <div className="flex flex-wrap justify-center gap-6 mx-auto">
        {projets.map((item, index) => (
          <div
            key={index}
            className="w-full min-w-[360px] sm:w-[48%] lg:w-[30%] border rounded-xl drop-shadow-xl overflow-hidden flex flex-col transition-all duration-300 bg-white"
          >
            {/* IMAGE */}
            <div className="p-4 flex justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 rounded-xl object-contain"
                />
              ) : (
                <div className="w-full h-56 rounded-xl bg-slate-500 flex items-center justify-center text-gray-400">
                  <i className="fa fa-image text-2xl"></i>
                </div>
              )}
            </div>

            {/* CONTENU */}
            <div className="px-6 pb-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-2xl font-bold merriweather text-center">
                  {item.title}
                </h3>

                <p className="text-gray-700 text-sm mt-3">{item.description}</p>

                {/* DATES */}
                <p className="text-xs text-gray-500 mt-3">
                  📅 <strong>{formatDate(item.start_date)}</strong> →{" "}
                  <strong>{formatDate(item.end_date)}</strong>
                </p>

                {/* PROGRESSION */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellowCustom"
                      style={{ width: `${item.progression}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Progression : {item.progression}%
                  </p>
                </div>

                {/* STATUT */}
                <span
                  className={`inline-block mt-3 px-3 py-1 text-xs rounded-full text-white ${
                    item.statut === "en_cours" ? "bg-blue-600" : "bg-green-600"
                  }`}
                >
                  {item.statut === "en_cours" ? "En cours" : "Terminé"}
                </span>

                {/* BOUTON DON */}
                {item.lien_donation && (
                  <a
                    href={item.lien_donation}
                    className="block mt-4 text-center rounded-full bg-yellowCustom text-white px-3 py-2 font-medium hover:opacity-80 transition"
                  >
                    Faire un don →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* -------------------------- */}
      {/*   BOUTON BAS /PROJETS      */}
      {/* -------------------------- */}
      <div className="mt-12 flex justify-center">
        <a
          href="/projets"
          className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:opacity-80 transition merriweather"
        >
          Voir tous les projets →
        </a>
      </div>
    </section>
  );
}
