import { Link } from "react-router-dom";
const backend_url = import.meta.env.VITE_API_URL;
export default function NewPublications({ data }) {
  return (
    <div className="bg-white  min-h-screen">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Publicaciones Recientes
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data?.map((publication) => (
            <div key={publication.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={`${backend_url}${publication.photo} `}
                  alt=""
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
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
      </div>
    </div>
  );
}
