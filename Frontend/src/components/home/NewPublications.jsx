import { Link } from "react-router-dom";
import PublicationCard from "../publication/PublicationCard";
const backend_url = import.meta.env.VITE_API_URL;
export default function NewPublications({ data }) {
  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex items-baseline justify-between pt-16 pb-6 border-b border-gray-200">
          <h1 className="text-4xl font-bold tracking-tight text-gray-700 dark:text-gray-400">
            Publicaciones recientes
          </h1>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Publicaciones recientes
          </h2>

          <div>
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
              {data?.map((publication, index) => (
                <PublicationCard key={index} publication={publication} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
