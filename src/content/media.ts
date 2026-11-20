// Static media served from public/ so the site works on any host (Lovable or Netlify).
// Kept outside /assets/, which holds hashed build files cached as immutable.
export const MEDIA = {
  logoLight: "/media/images/logo/logo-light.svg",
  logoDark: "/media/images/logo/logo-dark.svg",
  profile: "/media/images/profile.png",
  heroHorizon: "/media/images/bg-hero.jpg",
  roboticArmDark: "/media/images/wallpaper-skills-dark.png",
  roboticArmLight: "/media/images/wallpaper-skills-light.png",
  cv: "/media/files/Curriculo-CamilliFidelis.pdf",
  icons: {
    excel: "/media/images/icons/excel.png",
    word: "/media/images/icons/word.png",
    powerpoint: "/media/images/icons/powerpoint.png",
    powerbi: "/media/images/icons/powerbi.png",
  },
} as const;
