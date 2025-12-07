import { useState, useRef, useEffect } from "react";
import { cleanHTML } from "../../utils/cleanHtml";

export function FaqAccordion({ section }) {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  useEffect(() => {
    contentRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (openIndex === idx) {
        el.style.maxHeight = el.scrollHeight + "px";
        el.style.opacity = 1;
      } else {
        el.style.maxHeight = "0px";
        el.style.opacity = 0;
      }
    });
  }, [openIndex]);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 px-6 md:px-12 bg-white text-gray-800">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">{section.title}</h2>
        {section.subtitle && (
          <p className="text-gray-600 mt-2">{section.subtitle}</p>
        )}
      </div>

      <div className="max-w-6xl mx-auto space-y-4 bg-primary/50 px-4 py-6 md:px-[5rem] md:py-10 rounded rounded-[2rem]">
        {section.subsections.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border rounded-lg overflow-visible shadow"
            >
              <button
                className={`w-full text-left px-6 py-4 flex justify-between items-center font-medium transition-colors duration-300 bg-white hover:bg-white text-gray-800
                `}
                onClick={() => toggleIndex(index)}
              >
                <span>{item.title}</span>
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    isOpen
                      ? "bg-yellowCustom text-white"
                      : "bg-primary text-white"
                  }`}
                >
                  <i className={`fas ${isOpen ? "fa-minus" : "fa-plus"}`}></i>
                </span>
              </button>

              {/* CONTENU : positionné hors flux, ne pousse pas l'autre colonne */}
              {openIndex === index && (
                <div
                  className="px-6 py-4 bg-white border-t leading-relaxed text-justify text-gray-700 relative z-10 transition-all duration-300"
                  dangerouslySetInnerHTML={{
                    __html: item.content ? cleanHTML(item.content) : "",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export const FaqList = ({ section }) => (
  <section className="py-16 px-6 md:px-12 bg-gray-50 text-gray-800">
    s
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold">{section.title}</h2>
      {section.subtitle && (
        <p className="text-gray-600 mt-2">{section.subtitle}</p>
      )}
    </div>
    <div className="max-w-3xl mx-auto space-y-6">
      {section.subsections.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-700">{item.content}</p>
        </div>
      ))}
    </div>
  </section>
);
