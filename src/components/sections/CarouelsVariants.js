import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Autoplay,
  FreeMode,
  Navigation,
  Thumbs,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { cleanHTML } from "../../utils/cleanHtml";
import placeholder from "../../assets/img/placeholder.png";
import { Link } from "react-router-dom";

export function CarouselSimple({ section }) {
  const swiperRef = useRef(null);
  const [showNav, setShowNav] = useState(false);

  // Vérifie si on doit afficher les flèches
  useEffect(() => {
    const handleResize = () => {
      if (!swiperRef.current) return;

      const width = window.innerWidth;
      let slidesPerView = 1;
      if (width >= 1024) slidesPerView = 3;
      else if (width >= 640) slidesPerView = 2;

      setShowNav(section.subsections.length > slidesPerView);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [section.subsections.length]);

  return (
    <section className="py-20 bg-background px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full">
        {/* Titre + Sous-titre */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {section.title}
          </h1>
          <hr className="w-24 h-2 bg-yellowCustom" />
          {section.subtitle && (
            <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
          )}
        </div>

        <Swiper
          ref={swiperRef}
          style={{
            "--swiper-navigation-color": "#0B4D87",
            "--swiper-pagination-color": "#0B4D87",
          }}
          modules={[Pagination, Autoplay, Navigation]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          navigation={showNav}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="partner-carousel pb-14"
        >
          {section.subsections.map((item, index) => {
            const imageUrl = item.image ? item.image : null;

            return (
              <SwiperSlide key={index}>
                <div className="border rounded-lg hover:shadow-lg overflow-hidden flex flex-col  justify-center transition-all duration-300 bg-white min-h-[300px]">
                  {/* Image avec fallback */}
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-full h-48 object-contain"
                    />
                  ) : (
                    <div className="w-full flex-1 bg-gray-100 flex items-center justify-center text-gray-400">
                      <i className="fa fa-image text-4xl"></i>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

export function CarouselProduits({ section }) {
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
    <section className="min-h-screen py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full">
        {/* Titre + Sous-titre */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
          )}
        </div>

        <Swiper
          ref={swiperRef}
          modules={[Pagination, Autoplay, Navigation]}
          style={{
            "--swiper-navigation-color": "#145c81",
            "--swiper-pagination-color": "#145c81",
          }}
          pagination={{ clickable: true }}
          navigation={showNav}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="partner-carousel pb-14"
        >
          {section.subsections.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full min-h-[710px] border-2 border-gray-600 rounded-3xl hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300 bg-white">
                {/* Image */}
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 object-contain"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">
                    <i className="fa fa-image text-4xl"></i>
                  </div>
                )}

                {/* Contenu */}
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

                  <div className="mt-6 flex gap-3">
                    {item.button_text && item.button_link && (
                      <a
                        href={item.button_link}
                        className="rounded-xl bg-primary text-white px-3 py-2 text-xs font-medium hover:opacity-70 transition"
                      >
                        {item.button_text}
                      </a>
                    )}
                    <Link
                      to="/prendre-rdv"
                      className="rounded-xl border border-yellowCustom text-primary px-3 py-2 text-xs font-medium hover:bg-primary hover:border-primary hover:text-white transition"
                    >
                      Obtenir un devis
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export function CarouselYTB({ section }) {
  const extractYoutubeUrl = (html) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = html?.match(regex);
    return match ? `https://www.youtube.com/watch?v=${match[1]}` : null;
  };

  const getYoutubeThumbnail = (url) => {
    const match = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : null;
  };

  return (
    <div className="w-full py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        {section.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-8 text-center">
            {section.title}
          </h2>
        )}

        <Swiper
          modules={[Pagination, Autoplay]}
          speed={600}
          loop={true}
          spaceBetween={30}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="swiper min-h-[320px] partner-carousel"
        >
          {section.subsections.map((sub) => {
            const youtubeUrl = extractYoutubeUrl(sub.content);
            const thumbnail = youtubeUrl
              ? getYoutubeThumbnail(youtubeUrl)
              : null;

            return (
              <SwiperSlide
                key={sub.id}
                className="hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-white rounded-xl shadow-md flex flex-col h-[280px] overflow-hidden relative">
                  <div className="h-full w-full overflow-hidden">
                    {thumbnail ? (
                      <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={thumbnail}
                          alt={sub.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-md">
                            <i className="fas fa-play text-orange-600 text-xl ml-1"></i>
                          </div>
                        </div>
                      </a>
                    ) : sub.image ? (
                      <div
                        className={`w-full h-full bg-gray-100 flex items-center justify-center text-orange-400 mb-3`}
                      >
                        <i className="fas fa-image fa-lg"></i>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-400">
                        <i className="fas fa-image fa-lg"></i>
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <h5 className="text-md font-semibold text-orange-500">
                      {sub.title}
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="swiper-pagination mt-6"></div>
      </div>
    </div>
  );
}

export default function CarouselDetails({ section }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!section?.subsections?.length) return null;

  return (
    <section className="px-6 md:px-12 py-20 bg-black text-white">
      {/* Titre principal */}
      <div className="mb-12 text-center">
        <h2 className="font-bold">{section.title}</h2>
        {section.subtitle && <h3 className="mt-2">{section.subtitle}</h3>}
      </div>

      {/* Main Swiper (Images) */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#74BB43",
          "--swiper-pagination-color": "#74BB43",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 mb-6 rounded overflow-hidden"
      >
        {section.subsections.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.image}
              alt={item.title || "Image"}
              className="h-[400px] object-contain mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <div className="max-h-30 overflow-hidden">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {section.subsections.map((item) => (
            <SwiperSlide key={item.id}>
              <img
                src={item.image}
                alt={item.title || "Thumbnail"}
                className="cursor-pointer w-full h-16 md:h-20 object-contain rounded"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// -------------
// -------------
// -------------

// 🟦 Card Joueur
const PlayerCard = ({ player }) => {
  return (
    <div className="relative max-w-[350px] max-h-[350px] min-w-[280px] min-h-[280px] w-full aspect-square bg-gradient-to-br from-primary to-[#003b63] rounded-2xl shadow-lg text-white p-4 overflow-hidden">
      {/* Poste + Numéro */}
      <div className="absolute top-[3rem] left-7 z-20">
        <p className="text-sm font-semibold capitalize opacity-90 tracking-wide">
          {player?.position?.name || "POSTE"}
        </p>
        <p className="text-[8rem] font-extrabold -mt-2 opacity-40 leading-none">
          {player?.jersey_number || "00"}
        </p>
      </div>
      {/* Photo joueur */}
      <div className="absolute bottom-0 right-0 w-[65%] h-full flex items-center justify-center z-10">
        <img
          src={player?.photo || placeholder}
          alt={player?.last_name}
          className="h-full object-contain scale-125 drop-shadow-xl"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-primary from-10% to-transparent to-60% z-20"></div>
      {/* Nom en bas */}
      <div className="absolute bottom-4 left-4 z-40">
        <p className="text-xl font-extrabold uppercase leading-none">
          {player?.last_name || "NOM"}
        </p>
        <p className="text-lg font-medium">{player?.first_name || "Prénom"}</p>
      </div>
    </div>
  );
};

// 🟩 Skeleton Loader
const PlayerSkeleton = () => (
  <div className="relative bg-gradient-to-br from-blue-300 to-blue-500 rounded-2xl shadow-md p-4 h-[340px] animate-pulse overflow-hidden">
    <div className="absolute top-[3rem] left-7">
      <div className="h-3 w-20 bg-white/40 rounded"></div>
      <div className="h-10 w-16 bg-white/20 rounded mt-2"></div>
    </div>

    <div className="absolute right-2 top-0 h-full w-1/2 flex items-center">
      <div className="h-[80%] w-full bg-white/30 rounded"></div>
    </div>

    <div className="absolute bottom-4 left-4">
      <div className="h-4 w-24 bg-white/40 rounded mb-2"></div>
      <div className="h-4 w-16 bg-white/40 rounded"></div>
    </div>
  </div>
);

export function CarouselSquadCarousel({ section }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch des joueurs
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/players-public`
        );
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Erreur fetch players :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <section className="py-12 px-6 md:px-12 bg-gray-100" id="players">
      {/* TITRE */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold mt-3 uppercase">
              {section.title}
            </h2>
            <hr className="w-24 h-2 bg-yellowCustom" />
            {section.subtitle && (
              <p className="montserrat text-gray-400">{section.subtitle}</p>
            )}
          </div>

          {/* Flèches de navigation personnalisées */}
          <div className="flex gap-4 mr-4">
            <div className="w-10 h-10 justify-center items-center hidden sm:flex text-center swiper-button-prev-squad bg-yellowCustom hover:bg-yellowCustom/50 trasition duration-300 p-2 rounded-md z-30 text-primary font-bold cursor-pointer select-none">
              <i className="fas fa-arrow-left"></i>
            </div>
            <div className="w-10 h-10 justify-center items-center hidden sm:flex text-center swiper-button-next-squad bg-primary hover:bg-primary/50 trasition duration-300 p-2 rounded-md z-30 text-yellowCustom font-bold cursor-pointer select-none">
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENU */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            loop={true}
            freeMode={true}
            speed={3000} // vitesse du scroll continu
            autoplay={{
              delay: 0, // pas de pause entre slides
              disableOnInteraction: true,
            }}
            freeModeMomentum={false} // important pour le scroll fluide continu
            navigation={{
              nextEl: ".swiper-button-next-squad",
              prevEl: ".swiper-button-prev-squad",
            }}
            spaceBetween={20}
            breakpoints={{
              420: { slidesPerView: 1.15 }, // safe fraction
              540: { slidesPerView: 1.3 }, // safe fraction
              640: { slidesPerView: 1.6 }, // safe fraction
              768: { slidesPerView: 2 },
              920: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3 },
              // 1280: { slidesPerView: 4.5 },
            }}
          >
            {Array.from({ length: players.length }).map((_, i) => (
              <SwiperSlide key={i}>
                <PlayerSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Swiper
            loop
            spaceBetween={15}
            breakpoints={{
              420: { slidesPerView: 1.15 }, // safe fraction
              540: { slidesPerView: 1.3 }, // safe fraction
              640: { slidesPerView: 1.6 }, // safe fraction
              768: { slidesPerView: 2 },
              920: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.2 },
              // 1280: { slidesPerView: 4.5 },
            }}
            className="w-full p-2"
          >
            {players.map((player) => (
              <SwiperSlide key={player.id} className="flex justify-center">
                <Link
                  to={`/infos/${player.id}`}
                  state={{ type: "player" }} // ⬅️ indique quel endpoint utiliser
                  className="block w-full h-full"
                >
                  <PlayerCard player={player} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

const StaffCard = ({ staff }) => {
  return (
    <div className="relative aspect-square min-w-[320px] min-h-[320px] bg-gradient-to-br from-primary to-[#003b63] rounded-2xl shadow-lg text-white p-4 overflow-hidden">
      {/* Overlay dégradé */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent z-0"></div>

      {/* Photo joueur */}
      <div className="absolute bottom-0 right-0 z-10 flex items-center justify-center h-full w-full">
        <img
          src={staff?.photo || placeholder}
          alt={staff?.last_name}
          className="
            object-contain w-fit h-full
          "
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary from-10% to-transparent to-60% z-20"></div>

      {/* Nom en bas */}
      <div className="absolute bottom-4 left-4 z-40">
        <p className="text-sm font-extralight mb-2">{staff?.role || "N/A"}</p>
        <p className="text-xl font-semibold leading-none">
          {staff?.first_name || "Prénom"}{" "}
          <span className="font-extrabold uppercase">
            {staff?.last_name || "NOM"}
          </span>
        </p>
      </div>
    </div>
  );
};

// 🟩 Skeleton Loader
const StaffSkeleton = () => (
  <div className="relative bg-gradient-to-br from-blue-300 to-blue-500 rounded-2xl shadow-md p-4 h-[340px] animate-pulse overflow-hidden">
    <div className="absolute bottom-0 right-0 h-full w-[90%] flex items-center justify-center">
      <div className="h-[80%] w-full bg-white/30 rounded"></div>
    </div>

    <div className="absolute bottom-4 left-4">
      <div className="h-4 w-24 bg-white/40 rounded mb-2"></div>
      <div className="h-4 w-16 bg-white/40 rounded"></div>
    </div>
  </div>
);

export function CarouselSquadStaff({ section }) {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch des joueurs
  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/staffs-public`
        );
        const data = await response.json();
        setStaffs(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur fetch staffs :", error);
      }
    };

    fetchStaffs();
  }, []);

  return (
    <section className="py-12 px-6 md:px-12 bg-gray-100">
      {/* TITRE */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold mt-3 uppercase">
              {section.title}
            </h2>
            <hr className="w-24 h-2 bg-yellowCustom" />
            {section.subtitle && (
              <p className="montserrat text-gray-400">{section.subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* CONTENU */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <Swiper
            modules={[Autoplay, FreeMode]}
            loop={true}
            freeMode={true}
            speed={5000} // vitesse du scroll continu
            autoplay={{
              delay: 0, // pas de pause entre slides
              disableOnInteraction: true,
              reverseDirection: true,
            }}
            freeModeMomentum={false} // important pour le scroll fluide continu
            spaceBetween={20}
            breakpoints={{
              420: { slidesPerView: 1.15 }, // safe fraction
              540: { slidesPerView: 1.3 }, // safe fraction
              640: { slidesPerView: 1.6 }, // safe fraction
              768: { slidesPerView: 2 },
              920: { slidesPerView: 2.5 },
              1110: { slidesPerView: 3 },
              // 1280: { slidesPerView: 4.5 },
            }}
          >
            {Array.from({ length: staffs.length }).map((_, i) => (
              <SwiperSlide key={i} className="flex justify-center">
                <StaffSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Swiper
            loop
            spaceBetween={15}
            breakpoints={{
              420: { slidesPerView: 1.15 }, // safe fraction
              540: { slidesPerView: 1.3 }, // safe fraction
              640: { slidesPerView: 1.6 }, // safe fraction
              768: { slidesPerView: 2 },
              920: { slidesPerView: 2.5 },
              1110: { slidesPerView: 3 },
              // 1280: { slidesPerView: 4.5 },
            }}
            className="w-full p-2"
          >
            {staffs.map((staff) => (
              <SwiperSlide key={staff.id} className="flex justify-center">
                <Link
                  to={`/infos/${staff.id}`}
                  state={{ type: "staff" }} // ⬅️ indique quel endpoint utiliser
                  className="block w-full h-full"
                >
                  <StaffCard staff={staff} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

export function CarouselDeces({ section }) {
  // 🕊️ Données mockées pour test (API pas encore connectée)
  const decedes = [
    {
      deceased_name: "Kouadio Yao Michel",
      image: "",
      lien_donation: "#",
      deceased_dates: "1945 - 2024",
      funeral_date: "Funérailles le 18 Janvier 2025",
    },
    {
      deceased_name: "Ahou Clarisse",
      image: "",
      lien_donation: "#",
      deceased_dates: "1958 - 2024",
      funeral_date: "Cérémonie le 24 Février 2025",
    },
    {
      deceased_name: "N'Dri Konan Mathieu",
      image: "",
      lien_donation: "#",
      deceased_dates: "1967 - 2023",
      funeral_date: "Funérailles le 12 Mars 2025",
    },
    {
      deceased_name: "Amani N'Zi Marie",
      image: "",
      lien_donation: "#",
      deceased_dates: "1939 - 2024",
      funeral_date: "Cérémonie le 5 Avril 2025",
    },
  ];

  return (
    <div className="w-full py-10 px-6 md:px-12 bg-gray-100">
      {/* 📝 TITRE + CONTENU DE LA SECTION */}
      {section?.title && (
        <h2 className="text-3xl font-bold text-center merriweather mb-4">
          {section.title}
        </h2>
      )}

      {section?.content && (
        <p
          className="text-center max-w-2xl mx-auto text-gray-700"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      )}

      {/* 🕊️ CAROUSEL */}
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        // navigation={true}
        grabCursor={true}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full pb-10 mt-8"
        style={{
          // "--swiper-navigation-color": "#026535",
          "--swiper-pagination-color": "#026535",
        }}
      >
        {decedes.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="w-full rounded-xl p-5 flex flex-col items-center text-center bg-black border shadow hover:shadow-lg transition min-h-[330px]">
              <p className="font-bold text-xl mb-4 merriweather text-white">
                AVIS DE DÉCÈS
              </p>

              {/* IMAGE */}
              <div className="w-40 h-40 rounded-full p-3 flex items-center justify-center border bg-slate-300 overflow-hidden text-white">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.deceased_name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <i className="fa fa-dove text-gray-800 text-4xl"></i>
                )}
              </div>

              {/* NOM */}
              <p className="font-bold text-xl mt-4 merriweather text-white">
                {item.deceased_name}
              </p>

              {/* DATES */}
              <p className="text-sm text-white">{item.deceased_dates}</p>

              {/* DATE FUNERAILLES */}
              <p className="text-xs text-gray-500 italic mt-1">
                {item.funeral_date}
              </p>

              {/* BOUTON DONATION */}
              {item.lien_donation && (
                <a
                  href={item.lien_donation}
                  className="mt-4 rounded-full bg-yellowCustom text-white px-4 py-2 text-sm font-medium hover:opacity-80 transition"
                >
                  Faire un don
                </a>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔗 BOUTON BAS VERS /necrologie */}
      <div className="text-center mt-10">
        <a
          href="/necrologie"
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-80 transition"
        >
          Voir toutes les annonces
        </a>
      </div>
    </div>
  );
}
