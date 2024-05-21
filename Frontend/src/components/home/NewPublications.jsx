import { Link } from "react-router-dom";
const backend_url = import.meta.env.VITE_API_URL;
export default function NewPublications({ data }) {
  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex items-baseline justify-between pt-16 pb-6 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Publicaciones Recientes
          </h1>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data?.map((publication) => (
            <div key={publication.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                {publication.photos?.[0] ? (
                  <img
                    src={`${backend_url}${publication.photos[0].image}`}
                    alt={publication.service_requested}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="800px"
                    height="800px"
                    viewBox="0 0 120 120"
                    fill="none"
                    className="w-full h-full"
                  >
                    <rect width="120" height="120" fill="#EFF1F3" />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M33.2503 38.4816C33.2603 37.0472 34.4199 35.8864 35.8543 35.875H83.1463C84.5848 35.875 85.7503 37.0431 85.7503 38.4816V80.5184C85.7403 81.9528 84.5807 83.1136 83.1463 83.125H35.8543C34.4158 83.1236 33.2503 81.957 33.2503 80.5184V38.4816ZM80.5006 41.1251H38.5006V77.8751L62.8921 53.4783C63.9172 52.4536 65.5788 52.4536 66.6039 53.4783L80.5006 67.4013V41.1251ZM43.75 51.6249C43.75 54.5244 46.1005 56.8749 49 56.8749C51.8995 56.8749 54.25 54.5244 54.25 51.6249C54.25 48.7254 51.8995 46.3749 49 46.3749C46.1005 46.3749 43.75 48.7254 43.75 51.6249Z"
                      fill="#687787"
                    />
                  </svg>
                )}
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`publication/${publication.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <strong>Solicito:</strong> {publication.service_requested}
                      <br />
                      <strong>Ofrezco:</strong> {publication.object_offered}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
