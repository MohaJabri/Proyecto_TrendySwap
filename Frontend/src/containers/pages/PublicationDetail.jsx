import Layout from "../../hocs/Layout";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { get_publication } from "../../redux/actions/publications";
import { create_notification } from "../../redux/actions/notification";
import { useEffect, useState } from "react";

import { HeartIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import ImageGallery from "../../components/publication/ImageGallery";

const PublicationDetail = ({
  user,
  create_notification,
  get_publication,
  publication,
  isAuthenticated,
}) => {
  const params = useParams();
  const publicationId = params.publicationId;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);

    get_publication(publicationId).then(() => {
      setLoading(true);
    });
  }, []);
  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {loading ? (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              {/* Image gallery */}
              <ImageGallery photo={publication && publication.photo} />
              {/* Product info */}
              <div className="mt-10 p-4 sm:px-0 sm:mt-16 lg:mt-0">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  {publication && publication.service_requested}
                </h1>
                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                </div>

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>

                  <div
                    className="text-base text-gray-700 space-y-6"
                    dangerouslySetInnerHTML={{
                      __html: publication && publication.description,
                    }}
                  />
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <span className="font-bold mr-2">Ofrezco:</span>
                    <span>{publication && publication.object_offered}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold mr-2">Publicado por:</span>
                    <span>{publication && publication.user_full_name}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-bold mr-2">
                      Fecha de publicación:
                    </span>
                    <span>
                      {publication &&
                        new Date(publication.date_created).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <form className="mt-6">
                  {isAuthenticated && user.id !== publication.user ? (
                    <div className="mt-10 flex sm:flex-col1">
                      <button
                        type="button"
                        onClick={() => create_notification(publicationId)}
                        className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                      >
                        Solicitar
                      </button>

                      <button
                        type="button"
                        className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                      >
                        <HeartIcon
                          className="h-6 w-6 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Add to favorites</span>
                      </button>
                    </div>
                  ) : (
                    <span></span>
                  )}

                  {/* mapa */}
                  <div className="mt-2">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50317.625296681974!2d-1.1683747967137692!3d37.98059286957874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6381f8d5928c7f%3A0xd627129b38c4ab9a!2sMurcia!5e0!3m2!1ses!2ses!4v1700760018627!5m2!1ses!2ses"
                      width="600"
                      height="450"
                      loading="lazy"
                    ></iframe>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  publication: state.Publications.publication,
  user: state.Auth.user,
});
export default connect(mapStateToProps, {
  create_notification,
  get_publication,
})(PublicationDetail);
