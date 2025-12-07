import { useEffect, useRef, useState } from "react";
import { cleanHTML } from "../../utils/cleanHtml";
import { useLocation } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const TwoColsWithSS = ({ section }) => {
  const isVideo = /\.(mp4|webm|ogg)$/i.test(section.image_side);
  const mediaSrc = section.image_side;

  return (
    <section className="py-20 bg-white">
      <div className="p-10">
        <div className="mb-5">
          <h1 className="text-2xl md:text-3xl font-bold mt-3 merriweather">
            {section.title}
          </h1>
          {/* <hr className="w-24 h-2 bg-yellowCustom" /> */}
          {section.subtitle && (
            <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Titre principal + contenu + sous-sections */}
          <div className="mb-14">
            {section.content && (
              <div
                className="leading-relaxed text-xs md:text-base text-justify"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}
            {/* Sous-sections en cards */}
            <div className="flex justify-around">
              {section.subsections.map((item, index) => (
                <div
                  key={index}
                  className="w-fit rounded-lg p-3 flex items-center gap-3 "
                >
                  {/* IMAGE OU FALLBACK */}
                  {/* <div className="w-14 h-14 bg-white rounded-full p-2 flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title || "Image"}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <i className="fa fa-image text-gray-400 text-3xl"></i>
                    )}
                  </div> */}

                  {/* TEXTES */}
                  <div className="flex flex-col text-center">
                    <p className="font-semibold text-4xl text-primary break-words merriweather">
                      {item.title}
                    </p>

                    {item.subtitle && (
                      <p className="text-xs text-gray-600 mt-1 break-words">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full">
            {/* IMAGE OU FALLBACK */}
            {section.image_side ? (
              isVideo ? (
                <video
                  src={mediaSrc}
                  className="w-full rounded object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={mediaSrc}
                  alt={section.title || "Image"}
                  className="w-full rounded object-cover min-h-[300px]"
                />
              )
            ) : (
              <div className="min-h-[400px] w-full bg-slate-500 flex items-center justify-center text-orange-400 text-4xl rounded">
                <i className="fas fa-image"></i>
              </div>
            )}

            {/* BACKDROP EN DÉGRADÉ */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 from-10% to-transparent to-50%"></div>

            {/* SECTION CONTENT PAR-DESSUS */}
          </div>
        </div>
      </div>
    </section>
  );
};

export const TwoColsWithSS2 = ({ section }) => {
  const isVideo = /\.(mp4|webm|ogg)$/i.test(section.image_side);
  const mediaSrc = section.image_side;

  return (
    <section className="py-20 bg-white">
      <div className="p-10">
        <div className="mb-14">
          <h1 className="text-2xl md:text-3xl font-bold mt-3 merriweather text-center">
            {section.title}
          </h1>
          {/* <hr className="w-24 h-2 bg-yellowCustom" /> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full">
            {/* IMAGE OU FALLBACK */}
            {section.image_side ? (
              isVideo ? (
                <video
                  src={mediaSrc}
                  className="w-full rounded object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={mediaSrc}
                  alt={section.title || "Image"}
                  className="w-full rounded object-cover min-h-[300px]"
                />
              )
            ) : (
              <div className="min-h-[400px] w-full bg-slate-500 flex items-center justify-center text-orange-400 text-4xl rounded">
                <i className="fas fa-image"></i>
              </div>
            )}

            {/* BACKDROP EN DÉGRADÉ */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 from-10% to-transparent to-50%"></div>

            {/* SECTION CONTENT PAR-DESSUS */}
          </div>

          {/* Titre principal + contenu + sous-sections */}
          <div className="mb-5">
            {section.subtitle && (
              <h1 className="text-2xl md:text-3xl font-bold mt-3 merriweather">
                {section.subtitle}
              </h1>
            )}
            {section.content && (
              <div
                className="leading-relaxed text-xs md:text-base text-justify"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}
          </div>
        </div>
        {/* Sous-sections en cards */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          style={{
            "--swiper-navigation-color": "#026535 ",
            "--swiper-pagination-color": "#026535",
          }}
          grabCursor={true}
          navigation={true}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 }, // mobile → 1
            768: { slidesPerView: 2 }, // tablette → 2
            1024: { slidesPerView: 3 }, // PC → 3
          }}
          className="w-full pb-8 mt-8"
        >
          {section.subsections.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-full rounded-xl p-5 flex flex-col items-center text-center bg-white border shadow hover:shadow-lg transition min-h-[320px] ">
                {/* IMAGE / FALLBACK */}
                <div className="w-40 h-40 bg-white rounded-full p-3 flex items-center justify-center border border-gray-200 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title || "Image"}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <i className="fa fa-image text-gray-400 text-3xl"></i>
                  )}
                </div>

                {/* TITRE */}
                <p className="font-bold text-xl text-primary mt-4 merriweather break-words">
                  {item.title}
                </p>

                {/* SOUS-TITRE */}
                {item.subtitle && (
                  <p className="text-sm text-gray-600 mt-1 break-words">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export const TwoColsWithoutSS = ({ section }) => {
  const location = useLocation();
  const loc = location.pathname === "/cda-motors";

  return (
    <section
      className={`${
        loc ? "bg-[#74BB432B]" : "bg-white"
      } px-6 md:px-12 border border-b`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Image */}
        {section.image_side ? (
          <div className="flex justify-center items-center p-2">
            <img
              src={section.image_side}
              alt={section.title || "Image"}
              className="w-fit h-auto max-h-[400px] object-contain rounded shadow-lg"
            />
          </div>
        ) : (
          <div className="min-h-[400px] w-full bg-gray-200 flex items-center justify-center text-primary text-4xl">
            <i className="fas fa-image"></i>
          </div>
        )}

        {/* Texte */}
        <div className="flex flex-col justify-start p-2 overflow-hidden">
          <h1 className="text-2xl md:text-4xl font-bold text-primary">
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
          )}
          {section.content && (
            <div
              className="mt-6 text-gray-700 leading-relaxed text-justify overflow-y-auto max-h-[300px]"
              dangerouslySetInnerHTML={{
                __html: section.content ? cleanHTML(section.content) : "",
              }}
            />
          )}
          <div className="mt-6 flex gap-3 flex-wrap">
            {section.button_text && section.button_link && (
              <a
                href={section.button_link}
                className="rounded-xl bg-primary text-white px-3 py-2 font-medium hover:opacity-70 transition"
              >
                {section.button_text}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const TwoColsWithoutSSInverse = ({ section }) => {
  const location = useLocation();
  const loc = location.pathname === "/cda-motors";
  return (
    <section id="galeries" className="py-20 bg-white px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Titre principal */}
        <div className="mb-14 order-2 lg:order-1">
          <h1
            className={`text-2xl md:text-4xl text-primary font-bold ${
              loc ? "text-primary" : ""
            }`}
          >
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
          )}
          {section.content && (
            <div
              className="mt-6 text-gray-700 leading-relaxed text-justify"
              dangerouslySetInnerHTML={{
                __html: section.content ? cleanHTML(section.content) : "",
              }}
            />
          )}
          <div className="mt-6 flex gap-3">
            {section.button_text && section.button_link && (
              <a
                href={section.button_link}
                className="rounded-xl bg-primary text-white px-3 py-2 font-medium hover:opacity-70 transition"
              >
                {section.button_text}
              </a>
            )}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          {section.image_side ? (
            section.image_side.endsWith(".mp4") ||
            section.image_side.endsWith(".webm") ||
            section.image_side.endsWith(".ogg") ? (
              <video
                controls
                className="h-full max-h-[400px] object-contain rounded mx-auto shadow-lg"
              >
                <source src={section.image_side} type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
              </video>
            ) : (
              <img
                src={section.image_side}
                alt={section.title || "Image"}
                className="h-full max-h-[400px] object-contain rounded mx-auto shadow-lg"
              />
            )
          ) : (
            <div className="min-h-[400px] w-full bg-gray-200 flex items-center justify-center text-primary text-4xl">
              <i className="fas fa-image"></i>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const TwoColsTwoImages = ({ section }) => {
  return (
    <section
      className={`
        bg-white
      px-6 md:px-12 border border-b`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Image */}
        {section.image ? (
          <div className="flex justify-center items-center p-2">
            <img
              src={section.image}
              alt={section.title || "Image"}
              className="w-fit h-auto max-h-[400px] object-contain rounded shadow-lg"
            />
          </div>
        ) : (
          <div className="min-h-[400px] w-full bg-gray-200 flex items-center justify-center text-primary text-4xl">
            <i className="fas fa-image"></i>
          </div>
        )}

        {/* Texte */}
        <div className="flex flex-col justify-start p-2 overflow-hidden">
          {section.subtitle && (
            <p className="mt-3 text-sm text-yellowCustom">{section.title}</p>
          )}
          <h1 className="text-xl md:text-4xl font-bold text-primary">
            {section.subtitle}
          </h1>
          {section.content && (
            <div
              className="mt-6 text-gray-700 leading-relaxed text-justify overflow-y-auto max-h-[300px]"
              dangerouslySetInnerHTML={{
                __html: section.content ? cleanHTML(section.content) : "",
              }}
            />
          )}
          <div className="mt-6 flex gap-3 flex-wrap">
            {section.image_side ? (
              <div className="flex justify-center items-center p-2">
                <img
                  src={section.image_side}
                  alt={section.title || "Image"}
                  className="w-fit h-auto max-h-[300px] object-contain rounded shadow-lg"
                />
              </div>
            ) : (
              <div className="min-h-[300px] w-full bg-gray-200 flex items-center justify-center text-primary text-4xl">
                <i className="fas fa-image"></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const TwoColsImageGrid = ({ section }) => {
  return (
    <section className="py-20 bg-primary px-6 md:px-12">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center">
        {/* Colonne gauche : texte */}
        <div className="mb-14">
          <p className="mt-3 text-yellowCustom text-lg">{section.title}</p>
          {section.subtitle && (
            <h1 className="text-2xl md:text-4xl font-bold text-[#74BB43]">
              {section.subtitle}
            </h1>
          )}
          {section.content && (
            <div
              className="mt-6 text-gray-700 leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
        </div>

        {/* Colonne droite : affichage de logos des sous-sections */}
        <div className="w-full h-full">
          {section.subsections.length === 0 && (
            <div className="w-32 h-32 rounded-xl bg-white flex items-center justify-center text-gray-400">
              <i className="fa fa-image text-2xl"></i>
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-center">
            {section.subsections.slice(0, 8).map((sub, i) =>
              sub.image ? (
                <img
                  key={i}
                  src={sub.image}
                  alt={sub.title || ""}
                  className="w-28 h-28 md:w-32 md:h-32 object-contain rounded-xl bg-white p-2 shadow"
                />
              ) : (
                <div
                  key={i}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-xl bg-white flex items-center justify-center text-gray-400 shadow"
                >
                  <i className="fa fa-image text-2xl"></i>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export function TwoColsContact({ section }) {
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
    <>
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {section.title && (
            <h2 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight">
              {section.title}
            </h2>
          )}

          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            {/* 1ère colonne */}
            <div className="p-6 flex flex-col justify-start items-start space-y-4">
              {/* Nom du site */}
              {settings?.nom_du_site && (
                <h2 className="text-2xl font-bold">{settings.nom_du_site}</h2>
              )}

              {/* Coordonnées principales */}
              <ul className="space-y-2">
                {settings?.emplacement && (
                  <li className="flex items-center gap-2">
                    <i className="text-2xl ri-map-pin-line text-primary font-semibold"></i>
                    <span>{settings.emplacement}</span>
                  </li>
                )}

                {settings?.telephone && (
                  <li className="flex items-center gap-2">
                    <i className="text-2xl ri-phone-line text-primary font-semibold"></i>
                    <span>(+225)</span>
                    <a
                      href={`tel:${settings.telephone}`}
                      className="text-blue-600 underline-force-hover"
                    >
                      {settings.telephone}
                    </a>
                    {settings?.telephone_2 && (
                      <>
                        {" "}
                        ●{" "}
                        <a
                          href={`tel:${settings.telephone_2}`}
                          className="text-blue-600 underline-force-hover"
                        >
                          {settings.telephone_2}
                        </a>
                      </>
                    )}
                  </li>
                )}

                {settings?.email && (
                  <li className="flex items-center gap-2">
                    <i className="text-2xl ri-mail-line text-primary font-semibold"></i>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-blue-600 underline-force-hover"
                    >
                      {settings.email}
                    </a>
                  </li>
                )}
              </ul>

              {/* Grid responsive pour sous-sections */}
              {section?.subsections?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 w-full">
                  {section.subsections.map((sub, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="font-semibold">{sub.title}</span>
                      <span className="text-gray-500">{sub.subtitle}</span>

                      {/* Si tu as des jours et heures à afficher */}
                      {sub.jours && sub.heures && (
                        <div className="flex justify-between mt-1">
                          <span className="font-semibold">{sub.jours}</span>
                          <span className="text-gray-500">{sub.heures}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {settings?.whatsapp && (
                <div className="flex items-center mt-8">
                  <a
                    href={`https://wa.me/${
                      settings.whatsapp /* .replace(/\D/g, "") */
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-moov text-white rounded-lg hover:bg-green-600 transition"
                  >
                    WhatsApp
                  </a>
                </div>
              )}
            </div>

            {/* 2ème colonne */}
            <div className="p-6">
              {settings?.localisation && (
                <div className="w-full shadow rounded overflow-hidden">
                  <iframe
                    src={settings.localisation}
                    title={
                      settings?.nom_du_site
                        ? `${settings?.nom_du_site} Map`
                        : "Location Map"
                    }
                    className="w-full h-96"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function TwoColsMembres({ section }) {
  // ➤ Données fictives en attendant l'API
  const adherents = [
    {
      matricule: "A001",
      prenom: "Jean",
      nom: "Kouadio",
      commune: "Abidjan",
      annee_adhesion: 2021,
      mois_adhesion: "Mars",
      photo: null,
      is_active: true,
    },
    {
      matricule: "A002",
      prenom: "Mariam",
      nom: "Traoré",
      commune: "Yopougon",
      annee_adhesion: 2022,
      mois_adhesion: "Juin",
      photo: null,
      is_active: true,
    },
    {
      matricule: "A003",
      prenom: "Serge",
      nom: "Kassi",
      commune: "Cocody",
      annee_adhesion: 2023,
      mois_adhesion: "Janvier",
      photo: null,
      is_active: true,
    },
    {
      matricule: "A004",
      prenom: "Aminata",
      nom: "Koné",
      commune: "Marcory",
      annee_adhesion: 2020,
      mois_adhesion: "Octobre",
      photo: null,
      is_active: false,
    },
  ];

  const swiperRef = useRef(null);
  const [showNav, setShowNav] = useState(false);

  // Vérifie si on doit afficher les flèches
  useEffect(() => {
    const handleResize = () => {
      if (!swiperRef.current) return;

      const width = window.innerWidth;
      let slidesPerView = 1;

      if (width >= 1024) {
        slidesPerView = 3;
      } else if (width >= 640) {
        slidesPerView = 2;
      }

      // Masquer les flèches si écran < 640px (mobile)
      if (width < 640) {
        setShowNav(false);
      } else {
        setShowNav(section.subsections.length > slidesPerView);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [section.subsections.length]);

  return (
    <section className="py-20 bg-white px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        {/* --------- COL GAUCHE : Textes de la section --------- */}
        <div className="order-1">
          <h1 className={`text-2xl md:text-4xl font-bold merriweather`}>
            {section.title}
          </h1>

          {section.subtitle && (
            <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
          )}

          {section.content && (
            <div
              className="mt-6 text-gray-700 leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}

          <div className="mt-6 flex gap-3">
            {section.button_text && section.button_link && (
              <a
                href={section.button_link}
                className="rounded-xl bg-primary text-white px-4 py-2 font-medium hover:opacity-80 transition"
              >
                {section.button_text}
              </a>
            )}
          </div>
        </div>

        {/* --------- COL DROITE : Mini Carousel Adhérents --------- */}
        <div className="order-2 w-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 2500 }}
            pagination={{ clickable: true }}
            style={{
              "--swiper-navigation-color": "#026535 ",
              "--swiper-pagination-color": "#026535",
            }}
            grabCursor={true}
            navigation={showNav}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 1 },
              1200: { slidesPerView: 2 },
            }}
            className="w-full py-14 lg:py-10 "
          >
            {adherents.map((membre, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white border rounded-xl shadow hover:shadow-lg p-5 flex flex-col items-center transition">
                  {membre.photo ? (
                    <img
                      src={membre.photo}
                      alt={membre.nom}
                      className="w-32 h-32 object-cover rounded-full border mb-4"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-slate-500 flex items-center justify-center text-gray-400">
                      <i className="fa fa-image text-2xl"></i>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-primary">
                    {membre.prenom} {membre.nom}
                  </h3>

                  <p className="text-gray-600 text-sm">
                    Commune : <strong>{membre.commune}</strong>
                  </p>

                  <p className="text-gray-600 text-sm">
                    Adhésion : {membre.mois_adhesion} {membre.annee_adhesion}
                  </p>

                  {/* <span
                    className={`mt-3 px-3 py-1 text-xs rounded-full ${
                      membre.is_active
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {membre.is_active ? "Actif" : "Inactif"}
                  </span> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination mt-6"></div>
        </div>
      </div>
    </section>
  );
}

export function TwoColsPosts({ section }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const LINK = process.env.REACT_APP_API_URL;

  const swiperRef = useRef(null);
  const [showNav, setShowNav] = useState(false);

  // Vérifie si on doit afficher les flèches
  useEffect(() => {
    const handleResize = () => {
      if (!swiperRef.current) return;

      const width = window.innerWidth;
      let slidesPerView = 1;

      if (width >= 1024) {
        slidesPerView = 3;
      } else if (width >= 640) {
        slidesPerView = 2;
      }

      // Masquer les flèches si écran < 640px (mobile)
      if (width < 640) {
        setShowNav(false);
      } else {
        setShowNav(section.subsections.length > slidesPerView);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [section.subsections.length]);

  // ------------------------------
  //  🔥 Récupération API
  // ------------------------------
  useEffect(() => {
    setLoading(true);

    fetch(`${LINK}/api/blogs-public`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement articles:", err);
        setLoading(false);
      });
  }, [LINK]);

  // ------------------------------
  //  🔥 Grouping
  // ------------------------------
  const actualites = articles
    .filter((a) => a.type === "actualite")
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const evenements = articles
    .filter((a) => a.type !== "actualite")
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  // .slice(0, 5); // → 5 plus récents

  if (loading)
    return <div className="py-20 text-center text-gray-600">Chargement...</div>;

  return (
    <section className="py-20 bg-[#F8F3E7] px-6 md:px-12">
      <div className="mb-10 text-center">
        <h1 className={`lg:block hidden md:text-4xl font-bold merriweather`}>
          {section.title}
        </h1>

        {section.subtitle && (
          <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
        )}

        {section.content && (
          <div
            className="mt-6 text-gray-700 leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[60%_35%] gap-12 items-start">
        {/* -------------------------------------- */}
        {/*             COLONNE GAUCHE             */}
        {/*       Carousel Actualités (2/3)        */}
        {/* -------------------------------------- */}
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 merriweather">
            Actualités
          </h2>

          {actualites.length === 0 ? (
            <p className="text-gray-500">Aucune actualité trouvée.</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{ delay: 5000 }}
              pagination={{ clickable: true }}
              style={{
                "--swiper-navigation-color": "#026535 ",
                "--swiper-pagination-color": "#026535",
              }}
              grabCursor={true}
              navigation={showNav}
              loop={true}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 1 },
                1200: { slidesPerView: 2 },
              }}
              className="w-full pb-8"
            >
              {actualites.map((post, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.titre}
                        className="w-full h-56 object-cover"
                      />
                    ) : (
                      <div className="w-full h-56 rounded-xl bg-slate-500 flex items-center justify-center text-gray-400">
                        <i className="fa fa-image text-4xl"></i>
                      </div>
                    )}

                    <div className="p-5">
                      <h3 className="text-xl font-bold mb-2 merriweather">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-3">
                        {post.content}
                      </p>

                      <a
                        href={`/post/${post.slug}`}
                        className="inline-block mt-4 text-primary font-medium hover:underline"
                      >
                        Lire plus →
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* -------------------------------------- */}
        {/*            COLONNE DROITE              */}
        {/*     Evenements scrollables (1/3)       */}
        {/* -------------------------------------- */}
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold merriweather mb-5">
            Évènements
          </h2>

          <div className="max-h-[420px] overflow-y-auto pr-3 space-y-4 bg-primary text-white p-3 rounded-xl">
            {evenements.length === 0 ? (
              <p className="text-gray-500">Aucun évènement trouvé.</p>
            ) : (
              evenements.map((post, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 text-white shadow hover:shadow-md transition"
                >
                  <span
                    className={`px-3 py-1 text-xs rounded-full bg-white text-red-600 capitalize`}
                  >
                    {post.type}
                  </span>
                  <h4 className="font-semibold mt-4">{post.title}</h4>

                  <p className="text-gray-300 text-sm line-clamp-2 mt-1">
                    {post.contenu_bref || post.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
