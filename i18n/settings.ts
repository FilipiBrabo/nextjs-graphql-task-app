export const fallbackLng = "en";
export const languages = [fallbackLng, "pt"];
export const defaultNS = ["translation", "errors"];
export const cookieName = "i18next";

export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS
) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
