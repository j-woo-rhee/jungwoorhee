// Forward Umami events to Umami Cloud with the visitor's real IP.
// A plain Netlify rewrite sends Netlify's own edge IP, so every visit was
// geolocated to the nearest edge (Singapore, Frankfurt, Ashburn, San Jose).
import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const headers = new Headers();
  headers.set("content-type", request.headers.get("content-type") ?? "application/json");
  for (const h of ["user-agent", "accept-language"]) {
    const v = request.headers.get(h);
    if (v) headers.set(h, v);
  }
  const ip = context.ip;
  if (ip) {
    for (const h of ["true-client-ip", "x-client-ip", "x-forwarded-for", "x-real-ip"]) headers.set(h, ip);
  }
  const res = await fetch("https://gateway.umami.is/api/send", {
    method: "POST",
    headers,
    body: await request.text(),
  });
  return new Response(res.body, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "application/json",
      "cache-control": "no-store",
    },
  });
};

export const config = { path: "/u/api/send", method: ["POST"] };
