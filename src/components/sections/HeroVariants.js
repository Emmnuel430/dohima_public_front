import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cleanHTML } from "../../utils/cleanHtml";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import frLocale from "@fullcalendar/core/locales/fr";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// -----------

export function HeroDefault({ section }) {
  const [zones, setZones] = useState([]);
  const LINK = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${LINK}/api/zones-public`)
      .then((res) => res.json())
      .then((data) => setZones(data))
      .catch((err) => console.error("Erreur chargement zones :", err));
  }, [LINK]);

  return (
    <section
      id="zones"
      className="relative bg-white flex items-center px-6 md:px-12 overflow-hidden"
    >
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="mt-3 text-gray-600 text-sm">{section.subtitle}</p>
          )}
        </div>

        {/* Tableau dynamique */}
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 text-black">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Zones, équipes et délais d’intervention
            </caption>
            <thead className="bg-yellowCustom text-white">
              <tr>
                <th scope="col" className="pl-10 text-left">
                  Ville / Département
                </th>
                <th scope="col" className="p-3 text-left">
                  Pays
                </th>
                <th scope="col" className="p-3 text-left">
                  Techniciens
                </th>
                <th scope="col" className="p-3 text-left">
                  Délai moyen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-primary text-white">
              {zones.length > 0 ? (
                zones.map((pos) => (
                  <tr key={pos.id}>
                    <td className="pl-10">{pos.ville}</td>
                    <td className="p-3">{pos.pays}</td>
                    <td className="p-3">{pos.techniciens}</td>
                    <td className="p-3">{pos.delai_moyen}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 text-center">
                    Chargement des zones...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
export function HeroCarousel({ section }) {
  const slides = section.subsections || [];
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const API = process.env.REACT_APP_API_BASE_URL;

    fetch(`${API}/settings-public`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = {};
        data.forEach((item) => {
          mapped[item.key] = item.value;
        });
        setSettings(mapped);
      });
  }, []);

  return (
    <div className="relative text-gray-700 min-h-[80vh] bg-black">
      {/* ------------------------ */}
      {/*    Texte + Marquee       */}
      {/* ------------------------ */}
      {/* Marquee */}
      <div className="absolute top-8 left-0 w-full z-30 flex justify-center md:justify-start px-8 rounded-xl">
        {settings.info && (
          <div className="w-full overflow-hidden whitespace-nowrap flex items-center">
            <div className="text-white font-bold py-2 px-6 z-40 bg-yellowCustom rounded-l-xl">
              Info
            </div>
            <div className="bg-white py-2 rounded-r-xl">
              <div className="inline-block animate-marquee font-semibold text-center md:text-left">
                {settings.info}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="absolute inset-0 z-20 flex flex-col items-center md:items-start md:ml-12 pointer-events-none justify-center">
        {/* Contenu section */}
        <div className="max-w-4xl w-full text-white px-6 mt-6">
          <h2 className="text-2xl md:text-5xl font-bold mb-4 merriweather">
            {section.title}
          </h2>
          <h5 className="text-3xl md:text-4xl font-semibold mb-4 merriweather">
            {section.subtitle}
          </h5>
          <div
            className="mt-6 leading-relaxed text-justify"
            dangerouslySetInnerHTML={{
              __html: section.content ? cleanHTML(section.content) : "",
            }}
          />
          <div className="flex gap-3 mt-10">
            <Link
              to={section.button_link || "/"}
              className="inline-block bg-yellowCustom hover:bg-yellowCustom/80 text-white px-6 py-3 rounded-lg pointer-events-auto transition duration-300 font-semibold w-fit text-center capitalize"
            >
              {section.button_text}
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------ */}
      {/*        Carrousel         */}
      {/* ------------------------ */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={true}
        className="w-full h-full hero-carousel"
      >
        {slides.map((item, i) => {
          const mediaUrl = item.image || "";
          const isVideo = /\.(mp4|webm|ogg)$/i.test(item.image);

          return (
            <SwiperSlide key={i}>
              {mediaUrl ? (
                isVideo ? (
                  <div className="relative h-[90vh] w-full overflow-hidden">
                    <video
                      src={mediaUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                  </div>
                ) : (
                  <div
                    className="relative h-[90vh] w-full"
                    style={{
                      backgroundImage: `url("${mediaUrl}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                  </div>
                )
              ) : (
                <>
                  <div className="min-h-[90vh] w-full bg-gray-500/50 flex items-center justify-center text-orange-400 text-4xl relative">
                    <i className="fas fa-image"></i>
                  </div>
                  <div className="absolute inset-0 bg-black/40 z-10" />
                </>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* ------------------------ */}
      {/*    Flèches navigation     */}
      {/* ------------------------ */}
      <div className="hidden md:block swiper-button-prev-custom absolute bg-white hover:bg-white/80 trasition duration-300 p-2 rounded-md left-4 top-1/2 -translate-y-1/2 z-30 text-primary font-bold cursor-pointer select-none">
        <i className="fas fa-arrow-left"></i>
      </div>
      <div className="hidden md:block swiper-button-next-custom absolute bg-white hover:bg-white/80 trasition duration-300 p-2 rounded-md right-4 top-1/2 -translate-y-1/2 z-30 text-primary font-bold cursor-pointer select-none">
        <i className="fas fa-arrow-right"></i>
      </div>

      {/* ------------------------ */}
      {/*   Animation Marquee Tailwind */}
      {/* ------------------------ */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: inline-block;
            padding-left: 100%;
            animation: marquee 40s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

// -----------------------
export function HeroMinimal({ section }) {
  const bgImage = section.image ? section.image : null;

  return (
    <section className="relative w-full text-white h-[60vh] flex items-center justify-center text-center">
      {bgImage ? (
        <div
          className="relative h-[60vh] w-full"
          style={{
            backgroundImage: `url("${bgImage}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
      ) : (
        <div className="min-h-[60vh] w-full bg-slate-100 flex items-center justify-center text-slate-400 text-4xl">
          <i className="fas fa-image"></i>
        </div>
      )}
      {/* Overlay sombre toujours présent */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Contenu centré */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center pointer-events-none">
        <div className="max-w-fit text-white">
          <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
          <h5 className="text-xl mb-4">{section.subtitle}</h5>
          <div
            className="mt-6 leading-relaxed px-4 text-justify max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{
              __html: section.content ? cleanHTML(section.content) : "",
            }}
          />
          <div className="flex justify-around mt-10">
            {section.button_link && section.button_text && (
              <Link
                to={section.button_link ? "/" + section.button_link : ""}
                className="inline-block bg-[#74BB43] hover:bg-orange-700 px-6 py-3 rounded pointer-events-auto"
              >
                {section.button_text}
              </Link>
            )}
            {/* <Link
              to="/prendre-rdv"
              className="inline-block bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded pointer-events-auto"
            >
              SHOWROOM
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroContent({ section }) {
  const bgImage = section.image ? section.image : null;

  return (
    <section
      id="accueil"
      className="relative w-full text-white h-[80vh] flex items-center justify-center text-center"
    >
      {bgImage ? (
        <div
          className="relative h-[80vh] w-full"
          style={{
            backgroundImage: `url("${bgImage}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      ) : (
        <div className="min-h-[80vh] w-full bg-slate-500 flex items-center justify-center text-slate-400 text-4xl">
          <i className="fas fa-image"></i>
        </div>
      )}
      {/* Overlay sombre toujours présent */}
      <div className="absolute inset-0 bg-white/40 z-0" />

      {/* Contenu centré */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center pointer-events-none">
        <div className="max-w-fit text-white">
          <p className="text-sm text-yellowCustom p-2 rounded-2xl w-fit mx-auto mb-1">
            {section.subtitle}
          </p>
          <div className="mt-6 leading-relaxed text-5xl px-4 text-center text-white max-w-2xl mx-auto">
            {section.title}
          </div>
          <div className="flex gap-3 justify-center mt-10">
            {section.button_link && section.button_text && (
              <Link
                to={section.button_link ? section.button_link : ""}
                className="inline-block bg-yellowCustom hover:bg-orange-300 px-6 py-3 font-medium rounded-full pointer-events-auto"
              >
                {section.button_text}
              </Link>
            )}
            <a
              href="#nos-services"
              className="rounded-full bg-white text-blue-800 px-5 py-3 text-sm font-medium hover:bg-blue-700 hover:text-white transition pointer-events-auto"
            >
              Nos Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
// HeroInfo.js
export function HeroInfo({ section }) {
  const location = useLocation();
  const accueil = location.pathname === "/accueil";
  return (
    <div
      className="py-16 px-6 md:px-12 bg-white text-black"
      style={{
        backgroundImage: accueil ? `url("")` : "none",
        backgroundSize: "contain",
        backgroundPosition: "right center", // aligné à droite
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Titre centré en haut */}
      {section.title && (
        <h2 className="text-center text-orange-600 uppercase text-3xl font-semibold mb-10 abeezee">
          {section.title}
        </h2>
      )}

      <div className="rounded-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {section.image_side ? (
          <img
            src={section.image_side}
            alt={section.title || "Image"}
            className="w-full rounded"
          />
        ) : (
          <div className="min-h-[400px] w-full bg-orange-900 flex items-center justify-center text-orange-400 text-4xl">
            <i className="fas fa-image"></i>
          </div>
        )}

        <div>
          {section.subtitle && (
            <h1 className="font-bold mb-4 text-3xl text-gray-900">
              {section.subtitle}
            </h1>
          )}
          {section.content && (
            <div
              className="mb-4 text-gray-700 text-justify"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
          <Link
            to={section.button_link ? "/" + section.button_link : ""}
            className="inline-block border-2 border-bg-[#74BB43] text-[#74BB43] hover:bg-[#74BB43] px-6 py-3 rounded pointer-events-auto transition-colors duration-300 hover:text-white"
          >
            {section.button_text}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function HeroInfoInverse({ section }) {
  return (
    <section
      className="py-16 px-6 md:px-12 relative bg-white"
      style={{
        backgroundImage: section.image
          ? `url(${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {section.image && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      )}
      <div className="rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10 ">
        <div>
          <p className="mb-2">{section.title}</p>
          {section.subtitle && (
            <h1 className="font-bold mb-2">{section.subtitle}</h1>
          )}
          {section.content && (
            <p className="mb-4 text-gray-700">{section.content}</p>
          )}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block bg-orange-600 hover:bg-orange-700 px-4 py-2 text-white rounded"
            >
              {section.button_text}
            </a>
          )}
          {section.subsections?.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.subsections.map((item, index) => (
                <div
                  key={index}
                  className="border p-4 rounded bg-white shadow-sm text-black text-center"
                >
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  )}
                  {item.content && (
                    <p className="mt-2 text-gray-600">{item.content}</p>
                  )}
                  {item.button_text && item.button_link && (
                    <a
                      href={item.button_link}
                      className="inline-block mt-2 text-orange-600 hover:underline"
                    >
                      {item.button_text}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {section.image_side && (
          <div>
            <img
              src={section.image_side}
              alt={section.title || "Image"}
              className="w-full rounded shadow"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function HeroTwoCols({ section }) {
  return (
    <div className="relative py-8 bg-background overflow-hidden">
      <div className="mx-auto min-h-[80vh] max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        {/* Colonne gauche */}
        <div>
          {/* Titre */}
          <h1 className="text-3xl sm:text-4xl text-primary font-semibold tracking-tight">
            {section.title}
          </h1>

          {/* Sous-titre */}
          <h2 className="mt-4 text-lg font-medium text-slate-600 uppercase">
            {section.subtitle}
          </h2>

          {/* Contenu */}
          <div
            className="mt-4 text-base leading-relaxed text-slate-600 max-w-prose"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />

          {/* Boutons */}
          <div className="mt-6 flex gap-3">
            <a
              href={section.button_link}
              className="rounded-2xl bg-yellowCustom text-white px-5 py-3 text-sm font-medium hover:opacity-70 transition"
            >
              {section.button_text}
            </a>
            <a
              href="#contact"
              className="rounded-2xl bg-primary text-white px-5 py-3 text-sm font-medium hover:bg-slate-900 hover:text-white transition"
            >
              Nous contacter
            </a>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-lg">
          {section.image_side ? (
            <img
              src={section.image_side}
              alt={section.title}
              className="w-full h-64 object-cover rounded-3xl"
            />
          ) : (
            <div className="h-[350px] w-full bg-slate-100 flex items-center justify-center text-slate-400 text-4xl rounded-xl">
              <i className="fas fa-image"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Utilitaire pour formater une date en français
const formatDateFR = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Ajoute 1 jour à une date (pour FullCalendar)
const addOneDay = (dateString) => {
  const d = new Date(dateString);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

export default function HeroAgenda({ section }) {
  const [agenda] = useState([
    {
      type: "réunion",
      title: "Réunion mensuelle",
      description: "Réunion d'organisation générale.",
      start_date: "2025-12-05",
      end_date: "2025-12-05",
      location: "Siège central",
    },
    {
      type: "formation",
      title: "Atelier formation",
      description: "Formation des nouveaux adhérents.",
      start_date: "2025-12-10",
      end_date: "2025-12-14",
      location: "Salle A",
    },
    {
      type: "cérémonie",
      title: "Cérémonie annuelle",
      description: "Grande cérémonie annuelle.",
      start_date: "2025-12-18",
      end_date: "2025-12-19",
      location: "Auditorium",
    },
    {
      type: "sortie",
      title: "Sortie cohésion",
      description: "Sortie sportive entre membres.",
      start_date: "2025-12-22",
      end_date: "2025-12-22",
      location: "Parc municipal",
    },
  ]);

  // Conversion → FullCalendar (end +1 jour)
  const events = agenda.map((a) => ({
    title: a.title,
    start: a.start_date,
    end: addOneDay(a.end_date), // important !
  }));

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      {/* Header */}
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
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Calendrier */}
        <div className="bg-white rounded-xl border p-4 shadow relative">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale={frLocale}
            events={events}
            height="auto"
            eventDisplay="block"
            fixedWeekCount={false}
            dayMaxEvents={2}
            eventClassNames={() => "bg-yellowCustom text-white px-1 rounded-xl"}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "",
            }}
          />
        </div>

        {/* Liste agenda */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-3 border border-slate-200 rounded-lg p-4 bg-slate-50">
          {agenda.map((post, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white text-gray-600"
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-yellowCustom capitalize font-semibold">
                  {post.type}
                </span>
                <p className="text-xs">📍 {post.location}</p>
              </div>

              <h4 className="font-semibold mt-4">{post.title}</h4>

              <p className=" text-sm mt-1 line-clamp-3">{post.description}</p>

              <p className="text-xs mt-1">
                📅 {formatDateFR(post.start_date)}
                {post.end_date !== post.start_date &&
                  ` → ${formatDateFR(post.end_date)}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Styles Tailwind appliqués au titre du calendrier */}
      <style>{`
        .fc-toolbar-title {
          color: #FF8200;
          background-color: #f0f0f0;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: bold;
          text-transform: capitalize;
        }
      `}</style>
    </section>
  );
}
