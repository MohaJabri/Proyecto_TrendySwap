import Layout from "../../hocs/Layout";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { get_publication } from "../../redux/actions/publications";
import {
  create_notification,
  send_notification,
  check_notifications_sended,
} from "../../redux/actions/notification";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import ImageGallery from "../../components/publication/ImageGallery";
import { mapas } from "../../utils/mapas";

const PublicationDetail = ({
  user,
  check_notifications_sended,
  create_notification,
  get_publication,
  publication,
  isAuthenticated,
  send_notification,
  notification_sent,
}) => {
  const params = useParams();
  const publicationId = params.publicationId;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    check_notifications_sended(publicationId);
    get_publication(publicationId).then(() => {
      setLoading(true);
    });
  }, [notification_sent.notification_sent]);

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {loading ? (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              {/* Image gallery */}
              <ImageGallery photo={publication && publication.images} />
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
                    <Link
                      to={`/profile/${publication && publication.user}`}
                      className="text-blue-500 hover:text-blue-700 underline cursor-pointer"
                    >
                      {publication && publication.user_full_name}
                    </Link>
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
                  <div className="flex items-center">
                    <span className="font-bold mr-2">Ubicación:</span>
                    <span>{publication && publication.location}</span>
                  </div>
                </div>

                <form className="mt-6">
                  {!notification_sent.notification_sent &&
                  isAuthenticated &&
                  user.id !== publication.user ? (
                    <div className="mt-10 flex sm:flex-col1">
                      <button
                        type="button"
                        onClick={async () => {
                          await create_notification(publicationId);
                          await send_notification(publication.user, user.id);
                          check_notifications_sended(publicationId);
                        }}
                        className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                      >
                        Solicitar
                      </button>
                    </div>
                  ) : (
                    <span></span>
                  )}

                  {/* mapa */}
                  <div className="mt-2">
                    <iframe
                      src={
                        publication &&
                        mapas.find(
                          (mapa) => mapa.name === publication?.location
                        )?.value
                      }
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
  notification_sent: state.Notifications.notification_sent,
});
export default connect(mapStateToProps, {
  check_notifications_sended,
  create_notification,
  get_publication,
  send_notification,
})(PublicationDetail);
