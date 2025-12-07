import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import placeholder from "../assets/img/placeholder.png";
import LayoutPublic from "../components/public_layout/LayoutPublic";
import { formatDateRelative } from "../utils/formatDateRelative";
const socialIcons = {
  facebook: "fab fa-square-facebook",
  twitter: "fab fa-x-twitter",
  instagram: "fab fa-instagram",
  youtube: "fab fa-youtube",
  whatsapp: "fab fa-whatsapp",
};

export default function InfosDetails() {
  const { id } = useParams();
  const { state } = useLocation();

  const type = state?.type; // "player" ou "staff"
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!type) return;

    const endpoint =
      type === "player"
        ? `${process.env.REACT_APP_API_BASE_URL}/player-public/${id}`
        : `${process.env.REACT_APP_API_BASE_URL}/staff-public/${id}`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, type]);

  if (loading) {
    return <DetailsSkeleton />;
  }

  if (!data) return <p className="text-center mt-20">Données introuvables.</p>;

  return (
    <LayoutPublic>
      <div className="max-w-4xl mx-auto mt-[7rem] md:mt-[10rem] mb-3">
        <div className="mb-6">
          <Link
            to="/accueil"
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full  bg-primary shadow-lg hover:bg-yellowCustom hover:text-primary text-yellowCustom transition transform hover:-translate-y-0.5 focus:ring-2 duration-500"
            aria-label="Retour aux actualités"
          >
            <i className="fa fa-chevron-left"></i>
            <span className="font-medium">Retour</span>
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* IMAGE */}
            <div className="relative">
              <div className="md:sticky md:top-28 flex justify-center bg-gradient-to-b from-blue-100 to-blue-200 rounded-xl pt-6 shadow-md">
                <img
                  src={data.photo || placeholder}
                  alt={data.last_name}
                  className="w-full max-h-[450px] object-contain drop-shadow-xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary from-10% to-transparent to-60% z-20"></div>
            </div>

            {/* TEXT */}
            <div>
              <h1 className="text-3xl font-extrabold text-center md:text-left text-blue-900 uppercase mb-3">
                {data.first_name} {data.last_name}
              </h1>

              <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
                {type === "player" && (
                  <>
                    <p>
                      <span className="font-bold text-yellowCustom text-lg">
                        NATIONALITÉ :
                      </span>{" "}
                      {data.nationality}
                    </p>
                    {/* <p>
                      <span className="font-bold text-yellowCustom text-lg">
                        SEXE :
                      </span>{" "}
                      {data.gender}
                    </p> */}
                    <p>
                      <span className="font-bold text-yellowCustom text-lg">
                        DATE DE NAISSANCE :
                      </span>{" "}
                      {formatDateRelative(data.birthdate)}
                    </p>
                    <p>
                      <span className="font-bold text-yellowCustom text-lg">
                        TAILLE :
                      </span>{" "}
                      {data.height_cm} cm
                    </p>
                    <p>
                      <span className="font-bold text-yellowCustom text-lg">
                        POSTE :
                      </span>{" "}
                      {data.position?.name} ({data.position?.code})
                    </p>
                  </>
                )}

                {type === "staff" && (
                  <p>
                    <span className="font-bold text-yellowCustom text-lg">
                      RÔLE :
                    </span>{" "}
                    {data.role}
                  </p>
                )}

                {data.description && (
                  <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                    {data.description}
                  </p>
                )}

                {data.socials && data.socials.length > 0 && (
                  <>
                    <hr />
                    <p>Ses réseaux :</p>
                    <div className="flex gap-3 mt-2">
                      {data.socials.map((item) => {
                        const icon = socialIcons[item.name];
                        if (!icon) return null;
                        return (
                          <a
                            key={item.name}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-800 mr-2 hover:text-yellowCustom transition duration-300 text-3xl text-shadow-lg"
                          >
                            <i className={icon}></i>
                          </a>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutPublic>
  );
}

const DetailsSkeleton = () => (
  <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-xl animate-pulse">
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div className="bg-blue-100 rounded-xl h-[420px]"></div>

      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-24 bg-gray-200 rounded mt-4"></div>
      </div>
    </div>
  </div>
);
