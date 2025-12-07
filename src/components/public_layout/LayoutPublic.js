import { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png"; // Mets ici ton chemin correct vers le logo
// import floral from "../../assets/img/floral-1.png"; // Mets ici ton chemin correct vers le logo
import { Link, useLocation } from "react-router-dom";
import UseNavbarInteractions from "../../assets/js/UseNavbarInteractions";
// import DropdownFondements from "./DropdownFondements";

function LayoutPublic({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [pages, setPages] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showCloseBtn, setShowCloseBtn] = useState(false);

  const socialIcons = [
    { key: "facebook", icon: "ri-facebook-fill" },
    { key: "twitter", icon: "ri-twitter-x-fill" },
    { key: "instagram", icon: "ri-instagram-line" },
    { key: "youtube", icon: "ri-youtube-fill" },
    { key: "tiktok", icon: "ri-tiktok-fill" },
    { key: "linkedin", icon: "ri-linkedin-fill" },
    { key: "whatsapp", icon: "ri-whatsapp-line" },
  ];

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

        // On vérifie ici si le popup doit être affiché
        if (mapped.popup_accueil && !sessionStorage.getItem("popupShown")) {
          setShowPopup(true);
          sessionStorage.setItem("popupShown", "true");
        }
      });

    fetch(`${API}/pages-public`)
      .then((res) => res.json())
      .then((data) => setPages(data));

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = pages
    .filter((page) => page.template.includes("default"))
    .map((page) => ({
      label: page.title,
      to: `/${page.slug}`,
    }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCloseBtn(true);
    }, 5000); // 1000 = 1 seconde

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition duration-300 bg-white ${
          scrolled ? " border-b border-gray-600" : ""
        }`}
      >
        <div className="w-full">
          {/* ✅ Version normale du site (ton header existant) */}
          <div className="max-w-7xl mx-auto px-6">
            {/* Desktop */}
            <div className="max-w-screen mx-auto px-6">
              {/* Desktop */}
              <div className="hidden lg:flex justify-between items-center py-2">
                <Link to="/" className="inline-block">
                  <img
                    src={settings.logo ? settings.logo : logo}
                    alt="Logo site"
                    className="w-28 h-20 object-contain"
                  />
                </Link>

                <ul className="flex gap-6 items-center">
                  {links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className={`nav-link transition duration-300 ${
                          location.pathname === link.to
                            ? "font-extrabold underline-force underline-offset-4 text-primary"
                            : "font-semibold opacity-80 hover:opacity-100"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile */}
              <div className="lg:hidden">
                <div className="flex justify-between items-center py-2">
                  <Link to="/" className="inline-block">
                    <img
                      src={settings.logo ? settings.logo : logo}
                      alt="logo"
                      className="w-28 h-20 object-contain"
                    />
                  </Link>
                  <div
                    className="text-3xl cursor-pointer z-50"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <i
                      className={`ri-${
                        menuOpen ? "close-line" : "menu-4-line"
                      }`}
                    ></i>
                  </div>
                </div>

                <div
                  className={`absolute left-0 w-full bg-primary/80 backdrop-blur-sm duration-300 z-40 ${
                    menuOpen ? "top-0 h-[100vh]" : "top-[-999vh]"
                  }`}
                >
                  <ul className="flex flex-col justify-center items-center gap-8 py-6 h-full">
                    {links.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className={`nav-link transition duration-300 text-white ${
                            location.pathname === link.to
                              ? "font-bold underline-force underline-offset-4 text-primary"
                              : "opacity-80 hover:opacity-100"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- POPUP ACCUEIL ---------- */}
      {showPopup && settings.popup_accueil && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[999]">
          <div className="bg-white rounded-lg p-4 relative max-w-lg w-full shadow-lg">
            {showCloseBtn && (
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-500 bg-red-500 shadow-lg h-10 w-10 rounded-full text-lg transition duration-300"
                onClick={() => setShowPopup(false)}
              >
                ✖
              </button>
            )}
            <img
              src={settings.popup_accueil}
              alt="Popup Accueil"
              className="w-full rounded"
            />
          </div>
        </div>
      )}

      {/* -------------------------------- */}
      <div className={`min-h-screen mt-[5rem]`}>{children}</div>
      {/* -------------------------------- */}

      <footer
        className={`bg-primary text-white mt-0 pb-10
        ${location.pathname === "/" ? "pt-20 " : "pt-5"} 
        relative min-h-[300px] overflow-hidden`}
      >
        {/* Contenu principal */}
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-wrap gap-10 lg:gap-4 justify-around text-center md:text-left">
            {/* Logo */}
            <div className="w-full md:w-1/2 lg:w-[25%]">
              <img
                src={settings.logo_footer ? settings.logo_footer : logo}
                alt="Logo footer"
                className="mx-auto md:mx-0 h-28 object-contain rounded-lg"
              />
              <p className="mt-4 text-sm">{settings.mot_de_fin}</p>
            </div>

            {/* Navigation */}
            <div className="w-full sm:w-[48%] md:w-[30%] lg:w-[15%]">
              <h4 className="mb-4 font-bold">Navigation</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="hover:text-yellow-500 transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mentions légales */}
            <div className="w-full sm:w-[48%] md:w-[30%] lg:w-[25%]">
              <h4 className="mb-4 font-bold">Contacts</h4>
              <ul className="space-y-2 text-sm">
                {/* Téléphones */}
                {settings?.telephone && (
                  <li>
                    <a
                      href={`tel:${settings.telephone}`}
                      className="underline-force-hover"
                    >
                      <span>(+225)</span> {settings.telephone}
                    </a>

                    {settings?.telephone_2 && (
                      <>
                        {" "}
                        ●{" "}
                        <a
                          href={`tel:${settings.telephone_2}`}
                          className="underline-force-hover"
                        >
                          {settings.telephone_2}
                        </a>
                      </>
                    )}
                  </li>
                )}

                {/* Email */}
                {settings?.email && (
                  <li>
                    <a
                      href={`mailto:${settings.email}`}
                      className="underline-force-hover"
                    >
                      {settings.email}
                    </a>
                  </li>
                )}

                {/* CGU */}
                <li>
                  <Link
                    // to="/conditions-generales"
                    to="/"
                    className="hover:text-yellow-500 transition"
                  >
                    Conditions générales
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="my-10 flex justify-center space-x-4 text-2xl text-white">
          <h4 className="mb-4 font-bold block">Suivez nous :</h4>
          {socialIcons.map(({ key, icon }) =>
            settings[key] ? (
              <a
                key={key}
                href={settings[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellowCustom transition"
              >
                <i className={icon}></i>
              </a>
            ) : null
          )}
        </div>

        <div className="text-center mt-12 text-sm opacity-60">
          &copy; {new Date().getFullYear()} {settings.nom_du_site}, AsNumeric -
          J/D. Tous droits réservés.
        </div>
      </footer>

      {/* <!--~~~~~~~~~~~~~~~ Scroll Up ~~~~~~~~~~~~~~~--> */}
      <button
        type="button"
        className="fixed right-2 bottom-16 bg-yellowCustom shadow-lg px-3 py-2 md:px-4 md:py-3 rounded-md text-lg z-50 
    invisible opacity-0 translate-y-4 transition-all duration-300 ease-in-out"
        id="scroll-up"
        aria-label="Scroll to top"
      >
        <i className="ri-arrow-up-line text-primary"></i>
      </button>

      <UseNavbarInteractions />
    </>
  );
}
export default LayoutPublic;
