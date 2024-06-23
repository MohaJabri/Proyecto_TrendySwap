import { connect } from "react-redux";
import { useEffect } from "react";
import { send_email, reject_request } from "../../redux/actions/notification";
import Layout from "../../hocs/Layout";
import { setHuboCambio } from "../../redux/actions/notification";
import { delete_publication } from "../../redux/actions/publications";
import { Link } from "react-router-dom";

const Notifications = ({
  notifications,
  send_email,
  setHuboCambio,
  reject_request,
  delete_publication,
}) => {
  const handleAccept = async (email, id, id_) => {
    console.log(`Notificación aceptada: ${id}`);
    await send_email(email, id, id_);
    setHuboCambio((prev) => !prev);
    //delete_publication(id);
  };

  const handleReject = async (id) => {
    await reject_request(id);
    setHuboCambio((prev) => !prev);
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex flex-wrap justify-center">
          {notifications?.map((notification) => (
            <div
              key={notification.id}
              className="max-w-sm rounded overflow-hidden shadow-lg m-4"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {notification.notification_type}
                </div>
                <p className="text-gray-700 text-base">
                  Ofreciendo: {notification.object_offered}
                </p>
                <p className="text-gray-700 text-base">
                  Solicitando: {notification.service_requested}
                </p>
                <p className="text-gray-700 text-base">
                  Solicitante:<Link to={`/profile/${notification.user_from}`} > <span className="text-teal-600 text-base">{notification.user_from_full_name} </span>
                  </Link>
                </p>
              </div>
              <div className="px-6 py-4 flex justify-center">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() =>
                    handleAccept(
                      notification.email,
                      notification.related_publication,
                      notification.id
                    )
                  }
                >
                  Aceptar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleReject(notification.id)}
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.Notifications.notifications,
});

export default connect(mapStateToProps, {
  send_email,
  setHuboCambio,
  reject_request,
  delete_publication,
})(Notifications);
