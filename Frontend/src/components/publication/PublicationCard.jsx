import { Link } from "react-router-dom";
const backend_url = import.meta.env.VITE_API_URL;
const PublicationCard = ({ publication }) => {
  return (
    <div
      key={publication.id}
      className="group relative m-2 rounded-md shadow-md transition duration-300 transform hover:scale-105"
    >
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-t-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          src={`${backend_url}${publication.photo} `}
          alt=""
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="p-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/publication/${publication.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              <strong>Solicito:</strong> {publication.service_requested}
              <br />
              <strong>Ofrezco:</strong> {publication.object_offered}
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
