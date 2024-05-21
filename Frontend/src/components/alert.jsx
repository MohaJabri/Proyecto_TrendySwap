import { connect } from "react-redux";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";


const Alert = ({ alert }) => {
  if (!alert) {
    return null;
  }

  const { alertType, msg } = alert;

  const getBackgroundColor = () => {
    if (alertType === "green") {
      return `bg-green-50`;
    } else if (alertType === "red") {
      return "bg-red-50";
    } else if (alertType === "warning") {
      return "bg-yellow-50";
    } else {
      return "bg-blue-50"; // Valor por defecto o para otro tipo de alerta
    }
  };

  const getTextColor = () => {
    if (alertType === "green") {
      return `text-green-800`;
    } else if (alertType === "red") {
      return "text-red-800";
    } else if (alertType === "warning") {
      return "text-yellow-800";
    } else {
      return "text-blue-800"; // Valor por defecto o para otro tipo de alerta
    }
  };

  const getIconColor = () => {
    if (alertType === "green") {
      return `text-green-400`;
    } else if (alertType === "red") {
      return "text-red-400";
    } else if (alertType === "warning") {
      return "text-yellow-400";
    } else {
      return "text-blue-400"; // Valor por defecto o para otro tipo de alerta
    }
  };
  const alertBgColor = getBackgroundColor();
  const alertTextColor = getTextColor();
  const alertIconColor = getIconColor();

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm">
      <div className={`rounded-md ${alertBgColor} p-4 shadow-lg text-center`}>
        <div className="flex justify-center">
          <div className="flex-shrink-0">
            {
              alertType === "green" ? (
                <CheckCircleIcon className={`h-5 w-5 ${alertIconColor}`} aria-hidden="true" />
              ) : (
                <XCircleIcon className={`h-5 w-5 ${alertIconColor}`} aria-hidden="true" />
              )
            }
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${alertTextColor}`}>{msg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  alert: state.Alert.alert,
});

export default connect(mapStateToProps)(Alert);
