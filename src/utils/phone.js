export function formatWhatsappLink(phone) {
  if (!phone) return "";

  // Supprimer tout sauf les chiffres
  let clean = phone.replace(/\D/g, "");

  // Supprimer les 00 initiaux (ex: 00225 -> 225)
  if (clean.startsWith("00")) {
    clean = clean.substring(2);
  }

  //   // Supprimer le 0 initial (ex: 07xxxxxx -> 7xxxxxx)
  //   if (clean.startsWith("0")) {
  //     clean = clean.substring(1);
  //   }

  // Ajouter 225 si manquant
  if (!clean.startsWith("225")) {
    clean = "225" + clean;
  }

  return `https://wa.me/${clean}`;
}
