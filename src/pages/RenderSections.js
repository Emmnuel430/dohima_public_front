// Variants des sections
import HeroMatch, {
  HeroDefault,
  HeroMinimal,
  HeroInfo,
  HeroInfoInverse,
  HeroTwoCols,
  HeroContent,
  HeroCarousel,
} from "../components/sections/HeroVariants";
import {
  GridColumns,
  GridCards,
  GridThreeIcon,
  GridRows,
  GridWithoutTitle,
  CategoryGrid,
  GalerieGrid,
  GridImages,
  GridBlogCards,
  GridVideo,
  GridProjets,
} from "../components/sections/GridVariants";
import { FaqAccordion, FaqList } from "../components/sections/FaqVariants";
import {
  CtaCentered,
  CtaContact,
  CtaLeft,
  CtaNewsletter,
  CtaTwoCols,
} from "../components/sections/CallToActionVariants";
import CarouselDetails, {
  CarouselDeces,
  CarouselProduits,
  CarouselSimple,
  CarouselSquadCarousel,
  CarouselSquadStaff,
  CarouselYTB,
} from "../components/sections/CarouelsVariants";
import TwoColsMembres, {
  TwoColsContact,
  TwoColsImageGrid,
  TwoColsPosts,
  TwoColsTwoImages,
  TwoColsWithoutSS,
  TwoColsWithoutSSInverse,
  TwoColsWithSS,
  TwoColsWithSS2,
} from "../components/sections/TwoCols";
import HeroAgenda from "../components/sections/HeroVariants";

// Fonction d'affichage selon le type + variant
export function RenderSection(section) {
  const { type, variant, id } = section;

  const map = {
    hero: {
      default: HeroDefault,
      minimal: HeroMinimal,
      info: HeroInfo,
      "info-inverse": HeroInfoInverse,
      "2-cols": HeroTwoCols,
      content: HeroContent,
      carousel: HeroCarousel,
      matchs: HeroMatch,
      agenda: HeroAgenda,
    },
    grid: {
      columns: GridColumns,
      cards: GridCards,
      "three-icons": GridThreeIcon,
      rows: GridRows,
      images: GridImages,
      "without-title": GridWithoutTitle,
      categorie: CategoryGrid,
      galeries: GalerieGrid,
      "blog-cards": GridBlogCards,
      video: GridVideo,
      projets: GridProjets,
    },
    calltoaction: {
      centered: CtaCentered,
      newsletter: CtaNewsletter,
      contact: CtaContact,
      "2-col": CtaTwoCols,
      left: CtaLeft,
    },
    carousel: {
      partners: CarouselSimple,
      link: CarouselYTB,
      details: CarouselDetails,
      produits: CarouselProduits,
      "squad-carousel": CarouselSquadCarousel,
      "squad-staff": CarouselSquadStaff,
      deces: CarouselDeces,
    },
    faq: {
      accordeon: FaqAccordion,
      list: FaqList,
    },
    "2-col": {
      "with-ss": TwoColsWithSS,
      "with-ss-2": TwoColsWithSS2,
      "without-ss": TwoColsWithoutSS,
      "without-ss-inverse": TwoColsWithoutSSInverse,
      partners: TwoColsImageGrid,
      contact: TwoColsContact,
      "2-images": TwoColsTwoImages,
      membres: TwoColsMembres,
      posts: TwoColsPosts,
    },
  };

  const Component = map[type]?.[variant];
  return Component ? <Component key={id} section={section} /> : null;
}
