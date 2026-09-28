import HomeMono from "@/components/HomeMono";
import { getCatalog } from "@/lib/catalog";

/* The catalog is small and changes rarely; revalidate every 10 minutes
   while still serving instantly from the ISR cache. */
export const revalidate = 600;

export default async function HomePage() {
  const catalog = await getCatalog();
  return <HomeMono catalog={catalog} />;
}
