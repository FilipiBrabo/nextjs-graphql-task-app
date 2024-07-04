// This file was taken from https://locize.com/blog/next-app-dir-i18n/

import { NextResponse, NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import { cookieName, fallbackLng, languages } from "./i18n";
import { getSession } from "./lib/auth/getSession";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

const publicRoutes = ["login"];
const publicRoutesPattern = publicRoutes.join("|");
const publicPathsRegex = new RegExp(`^\\/(pt|en)\\/(${publicRoutesPattern})$`);

const loginPathRegex = new RegExp(/^\/(en|pt)\/login$/);

function isPublicRequest(pathname: string): boolean {
  return publicPathsRegex.test(pathname);
}

export async function middleware(req: NextRequest) {
  let lng: string | undefined | null;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  const reqUrl = new URL(req.url);

  const session = await getSession();

  if (!session && !isPublicRequest(reqUrl.pathname)) {
    return NextResponse.redirect(new URL(`/${lng}/login`, req.url));
  } else if (session && loginPathRegex.test(reqUrl.pathname)) {
    return NextResponse.redirect(new URL(`/${lng}/`, req.url));
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") || "");
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
