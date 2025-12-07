import { useState } from "react";
import FloatingInputField from "./FloatingInputField";

export default function FormRDV({ showToast }) {
  const [formData, setFormData] = useState({
    client_nom: "",
    client_email: "",
    commentaires: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rdvs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showToast(data?.message || "Erreur lors de l’envoi.", false);
        return;
      }

      showToast(data.message || "Demande envoyée avec succès !", true);

      // Reset
      setFormData({
        client_nom: "",
        client_email: "",
        commentaires: "",
      });
    } catch (error) {
      console.error("Erreur réseau :", error);
      showToast("Erreur de connexion au serveur", false);
    }

    setIsLoading(false);
  };

  // Vérifie si les champs obligatoires sont remplis
  const isFormValid =
    formData.client_nom.trim() !== "" &&
    formData.client_email.trim() !== "" &&
    formData.commentaires.trim() !== "";

  const clientFields = [
    { label: "Nom", name: "client_nom", type: "text", required: true },
    { label: "Email", name: "client_email", type: "email", required: true },
  ];

  return (
    <form
      className={`rounded-3xl border border-slate-200 p-6
       shadow-md space-y-8`}
      onSubmit={handleSubmit}
    >
      {/* Étape 1 */}
      <fieldset className="space-y-3">
        <div className="block">
          {clientFields.map((field) => (
            <FloatingInputField
              key={field.name}
              {...field}
              value={formData[field.name]}
              disabled={isLoading}
              onChange={handleInputChange}
              className="my-5"
            />
          ))}
        </div>
      </fieldset>

      {/* Notes */}
      <fieldset className="space-y-3">
        <legend className="text-xl font-semibold text-yellowCustom">
          Votre message
        </legend>
        <textarea
          name="commentaires"
          value={formData.commentaires}
          onChange={handleInputChange}
          rows="5"
          disabled={isLoading}
          placeholder="Ex. Description du projet, questions..."
          className="w-full border p-2 rounded bg-[#F5F9FC] text-primary font-semibold focus:outline-none focus:ring-2 focus:ring-yellowCustom transition"
        />
      </fieldset>

      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className={`w-full rounded-2xl  py-3 font-medium ${
          !isFormValid || isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary text-white hover:opacity-90"
        } transition`}
      >
        {isLoading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i> Chargement...
          </span>
        ) : (
          "Envoyer la demande"
        )}
      </button>
    </form>
  );
}
