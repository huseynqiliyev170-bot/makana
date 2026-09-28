const CLOUD = "https://res.cloudinary.com/dn2jro6kd/image/upload/";

export const DEFAULT_PHONE = "994998007154";
export const DEFAULT_INSTAGRAM = "makanabyruh";

/**
 * Rewrites a Cloudinary URL with responsive delivery params (format, quality, width).
 * Non-Cloudinary URLs are returned untouched.
 */
export function img(url: string | undefined | null, width = 800): string {
  if (!url) return "";
  if (!url.startsWith(CLOUD)) return url;
  const rest = url.slice(CLOUD.length).replace(/^\/?upload\//, "");
  const versioned = rest.replace(/^v\d+\//, "");
  return `${CLOUD}f_auto,q_auto,w_${width}/v1/${versioned}`;
}

/** WhatsApp deep link with a pre-filled message. */
export function waLink(text: string, phone: string = DEFAULT_PHONE): string {
  const digits = String(phone).replace(/\D/g, "") || DEFAULT_PHONE;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text || "")}`;
}

export function instagramUrl(handle: string = DEFAULT_INSTAGRAM): string {
  return `https://instagram.com/${handle}`;
}