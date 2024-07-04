// This file was derived from https://locize.com/blog/next-app-dir-i18n/

import { createInstance, Namespace, FlatNamespace, KeyPrefix } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { FallbackNs } from "react-i18next";
import { getOptions } from "./settings";
import zodPtTranslation from "zod-i18n-map/locales/pt/zod.json";

const initI18next = async (lng: string, ns: string | string[]) => {
  // On server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));

  i18nInstance.addResourceBundle("pt", "zod", zodPtTranslation);
  return i18nInstance;
};

export async function getServerTranslation<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined
>(lng: string, ns?: Ns, options: { keyPrefix?: KPrefix } = {}) {
  const i18nextInstance = await initI18next(
    lng,
    Array.isArray(ns) ? (ns as string[]) : (ns as string)
  );
  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
