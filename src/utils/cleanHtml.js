export const cleanHTML = (html) => {
  const LIST_BULLET_COLOR = "#fff";

  return (
    html
      // 1. Règle : <p><br /></p> → 2 <br />
      .replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, "<br /><br />")

      // 2. Règle : paragraphes vides → 1 <br />
      .replace(/<p>(\s|&nbsp;)*<\/p>/gi, "<br />")

      // 3. Règle : <li> vide → &nbsp; (pour forcer le marker)
      .replace(/<li>(\s|&nbsp;)*<\/li>/gi, "<li>&nbsp;</li>")

      // 4. Ajouter un style inline à tous les <p> sans style
      .replace(/<p(?![^>]*style=)/gi, '<p style="margin-bottom: 1rem"')

      // 5. Ajouter proprement le margin-bottom si déjà un style existe
      .replace(/<p style="([^"]*)"/gi, (match, styles) => {
        if (styles.includes("margin-bottom")) return match;
        return `<p style="${styles}; margin-bottom: 1rem"`;
      })

      // 6. Ajouter un style inline aux <ul> pour puces colorées
      .replace(
        /<ul(?![^>]*style=)/gi,
        `<ul style="padding-left: 1.2rem; list-style-type: disc; color: ${LIST_BULLET_COLOR}"`
      )

      // 7. Si <ul> a déjà un style, on complète sans écraser
      .replace(/<ul style="([^"]*)"/gi, (match, styles) => {
        const additions = [
          styles.includes("padding-left") ? "" : "padding-left: 1.2rem",
          styles.includes("list-style-type") ? "" : "list-style-type: disc",
          styles.includes("color") ? "" : `color: ${LIST_BULLET_COLOR}`,
        ]
          .filter(Boolean)
          .join("; ");
        return `<ul style="${styles}; ${additions}"`;
      })
  );
};
