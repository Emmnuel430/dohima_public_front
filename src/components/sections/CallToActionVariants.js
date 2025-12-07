import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ToastMessage from "../Layout/ToastMessage";
import FormRDV from "../rdv_form/FormRDV";
import { cleanHTML } from "../../utils/cleanHtml";

export const CtaCentered = ({ section }) => {
  const bgImage = section.image || null;
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
    <section className="relative w-full h-[60vh] flex items-center bg-green-900 text-white text-center">
      <div
        className="absolute inset-0 w-full h-full"
        style={
          bgImage
            ? {
                backgroundImage: `url("${bgImage}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : undefined
        }
      >
        {!bgImage && (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-5xl">
            <i className="fas fa-image"></i>
          </div>
        )}
      </div>

      {/* --- GLOBAL DARK OVERLAY (toujours présent) --- */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center px-4">
        {/* TITRE / SOUS-TITRE / BOUTON */}
        <div className="mb-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4">{section.title}</h2>

          {section.subtitle && (
            <p className="mb-6 text-lg">{section.subtitle}</p>
          )}

          {section.button_text && section.button_link && (
            <Link
              to={section.button_link}
              className="inline-block bg-primary text-white px-6 py-3 font-semibold rounded-lg shadow hover:bg-primary/60 transition duration-300"
            >
              {section.button_text}
            </Link>
          )}

          {/* LISTE DE CONTACT (WRAP + CENTER) */}
          <ul className="flex flex-wrap justify-center gap-6 mt-10">
            {/* Téléphone */}
            {settings?.telephone && (
              <li className="flex items-center gap-2">
                <i className="text-3xl text-yellowCustom fa fa-phone font-semibold"></i>
                <span className="text-white">(+225)</span>

                <a
                  href={`tel:${settings.telephone}`}
                  className="text-white underline-force-hover"
                >
                  {settings.telephone}
                </a>

                {settings?.telephone_2 && (
                  <>
                    <span>●</span>
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

            {/* Email */}
            {settings?.email && (
              <li className="flex items-center gap-2">
                <i className="text-3xl text-yellowCustom fa fa-envelope font-semibold"></i>
                <span>{settings.email}</span>
              </li>
            )}

            {/* Emplacement */}
            {settings?.emplacement && (
              <li className="flex items-center gap-2">
                <i className="text-3xl text-yellowCustom fa fa-location-dot font-semibold"></i>
                <span>{settings.emplacement}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export const CtaLeft = ({ section }) => {
  const bgImage = section.image || null;

  return (
    <section className="relative w-full h-[65vh] xl:h-[55vh] flex items-center text-white overflow-hidden">
      {/* --- BACKGROUND IMAGE OR FALLBACK --- */}
      <div
        className="absolute inset-0 w-full h-full"
        style={
          bgImage
            ? {
                backgroundImage: `url("${bgImage}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : undefined
        }
      >
        {!bgImage && (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-5xl">
            <i className="fas fa-image"></i>
          </div>
        )}
      </div>

      {/* --- GLOBAL OVERLAY (toujours présent) --- */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 from-30% to-yellowCustom/70 to-70%"></div>

      {/* --- CONTENT LEFT --- */}
      <div className="relative z-10 max-w-3xl px-8 md:px-16">
        <h2 className="text-4xl font-bold mb-4 drop-shadow-md merriweather">
          {section.title}
        </h2>

        {section.subtitle && (
          <p className="mb-6 text-lg text-gray-200 drop-shadow-sm">
            {section.subtitle}
          </p>
        )}

        {section.content && (
          <div
            className="mt-2 leading-relaxed text-justify"
            dangerouslySetInnerHTML={{
              __html: section.content ? cleanHTML(section.content) : "",
            }}
          />
        )}

        {section.button_text && section.button_link && (
          <Link
            to={section.button_link}
            className="inline-block bg-yellowCustom text-white px-6 py-3 font-semibold rounded-full shadow hover:bg-yellowCustom/50 transition"
          >
            {section.button_text}
          </Link>
        )}
      </div>
    </section>
  );
};

export const CtaTwoCols = ({ section }) => (
  <section id="contacts" className="py-20 px-6 md:px-12 bg-primary text-white">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
      {/* Colonne gauche : titre + sous-titre */}
      <div className="text-center md:text-left">
        <h2 className="text-4xl font-semibold mb-4 capitalize">
          {section.title}
        </h2>
        {section.subtitle && <p className="mb-6 text-lg">{section.subtitle}</p>}
        {section.content && (
          <div
            className="text-gray-300 leading-relaxed text-justify max-h-[300px]"
            dangerouslySetInnerHTML={{
              __html: section.content ? cleanHTML(section.content) : "",
            }}
          />
        )}
      </div>

      {/* Colonne droite : bouton */}
      <div className="text-center md:text-right w-full md:w-[60%]">
        {section.button_text && section.button_link && (
          <Link
            to={section.button_link || ""}
            className="min-w-fit inline-block rounded-full bg-yellowCustom text-white px-6 py-3 font-semibold shadow hover:bg-yellowCustom/80 transition"
          >
            {section.button_text}
          </Link>
        )}
      </div>
    </div>
  </section>
);

export function CtaNewsletter({ section }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔁 Tu pourras remplacer ceci par une vraie requête API
    console.log("Email inscrit :", email);
  };

  return (
    <section className="bg-[#74BB432B] m-4 rounded-md py-16 px-6 md:px-12 text-center">
      <div className="max-w-2xl mx-auto">
        {section.title && (
          <h1 className="text-3xl font-bold mb-2">{section.title}</h1>
        )}
        {section.subtitle && (
          <h3 className="text-xl mb-4">{section.subtitle}</h3>
        )}
        {section.content && <p className="mb-8">{section.content}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row ">
          <input
            type="email"
            required
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 bg-white rounded-t-lg sm:rounded-t-none sm:rounded-l-lg sm:border-r-0 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-b-lg sm:rounded-b-none sm:rounded-r-lg transition border border-orange-500"
          >
            S’inscrire
          </button>
        </form>
      </div>
    </section>
  );
}

export function CtaContact({ section }) {
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
      {toast.message && (
        <ToastMessage
          message={toast.message}
          success={toast.success}
          onClose={handleCloseToast}
        />
      )}
      <section id="reservations" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8 grid lg:grid-cols-2 gap-8 rounded-3xl shadow-lg border border-slate-200 ">
            {/* Coordonnées via settings */}
            <div className="p-6 flex flex-col justify-center text-primary">
              {section.title && (
                <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight">
                  {section.title.split("?").map((part, i, arr) => (
                    <span key={i} className="merriweather">
                      {part}
                      {i < arr.length - 1 && (
                        <>
                          ?<br />
                        </>
                      )}
                    </span>
                  ))}
                </h2>
              )}
              {section.content && (
                <div
                  className="mt-2 leading-relaxed text-justify"
                  dangerouslySetInnerHTML={{
                    __html: section.content ? cleanHTML(section.content) : "",
                  }}
                />
              )}
              <ul className="mt-4 space-y-3">
                {settings?.telephone && (
                  <li className="flex items-center gap-2">
                    <i className="text-3xl text-yellowCustom ri-phone-line font-semibold"></i>
                    <span className="text-slate-500">(+225)</span>
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

                {settings?.whatsapp && (
                  <li className="flex items-center gap-2">
                    <i className="text-3xl text-yellowCustom ri-whatsapp-line font-semibold"></i>
                    <a
                      href={`https://wa.me/${settings.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-600 underline-force-hover"
                    >
                      {settings.whatsapp}
                    </a>
                  </li>
                )}

                {settings?.email && (
                  <li className="flex items-center gap-2">
                    <i className="text-3xl text-yellowCustom ri-mail-line font-semibold"></i>
                    <span>{settings.email}</span>
                  </li>
                )}
                {settings?.emplacement && (
                  <li className="flex items-center gap-2">
                    <i className="text-3xl text-yellowCustom ri-map-pin-line font-semibold"></i>
                    <span>{settings.emplacement}</span>
                  </li>
                )}

                {settings?.localisation && (
                  <li>
                    <a
                      href={settings.localisation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 underline underline-offset-2"
                    >
                      <i className="text-3xl text-yellowCustom ri-map-line"></i>
                      <span>Voir sur la carte</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Formulaire */}
            <FormRDV showToast={showToast} />
          </div>
        </div>
      </section>
    </>
  );
}
