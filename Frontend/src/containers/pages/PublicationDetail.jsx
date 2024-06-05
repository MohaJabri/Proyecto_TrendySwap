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
      <div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ margin: '0 5%' }}>
            <div className="flex justify-center items-center " style={{ height: 'min-content' }}>
              <ImageGallery photo={publication && publication.photos} />
            </div>
            <div className="flex flex-col mt-2 items-start h-full">
              <h1 className="text-3xl font-bold tracking-tight text-gray-700 dark:text-gray-400">
                {publication && publication.service_requested}
              </h1>
              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
              </div>
              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{ __html: publication && publication.description }}
                />
                <div className="flex items-center mt-6">
                  <span className="font-bold mr-2 text-gray-600 dark:text-gray-400">
                    Ofrezco:
                  </span>
                  <span>{publication && publication.object_offered}</span>
                </div>
              </div>              
            </div>
            <div className="col-span-1 md:col-span-2  p-4 sm:px-0 sm:mt-16 lg:mt-0">
              <div className="mt-6 space-y-4">
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
                      className="w-full flex-1 bg-teal-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500 sm:w-full"
                    >
                      Solicitar
                    </button>
                  </div>
                ) : (
                  <span></span>
                )}
              </form>
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <span><span className="font-bold mr-2 text-gray-600 dark:text-gray-400">
                    Publicado por:
                  </span>
                  <Link
                    to={`/profile/${publication && publication.user}`}
                    className="text-teal-600 hover:text-teal-800 cursor-pointer"
                  >
                    <span>{publication && publication.user_full_name} </span>
                  </Link>
                  <span className="mx-2">el día</span>
                  <span>
                    {publication && new Date(publication.date_created).toLocaleDateString()}
                  </span>
                  <span className="mx-2">en</span>
                  <span>
                    {publication && publication.location}
                  </span></span>
                </div>
              </div>
                <div className="mt-2 w-full">
                  <iframe
                    src={
                      publication &&
                      mapas.find((mapa) => mapa.name === publication?.location)?.value
                    }
                    width="100%"
                    height="325"
                    loading="lazy"
                    className="rounded"
                  ></iframe>
                </div>
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
