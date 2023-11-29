import { Link } from "react-router-dom";
const backend_url = import.meta.env.VITE_API_URL;
const PublicationCard = ({ publication }) => {
  return (
    <div key={publication.id} className="group relative mx-2">
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
            <Link to={`/publication/${publication.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {publication.name}
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
