import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
} from "@material-tailwind/react";

import {
  update_user_profile,
  get_user_profile,
} from "../../redux/actions/profile";
import { TailSpin } from "react-loader-spinner";
import Layout from "../../hocs/Layout";

const backend_url = "https://trendyswap.es/backend";

const Profile = ({
  user,
  update_user_profile,
  profile,
  ownerProfile,
  get_user_profile,
}) => {
  const [isOwner, setIsOwner] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    profile_image: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [open, setOpen] = useState(false);
  const {
    first_name,
    last_name,
    phone,
    address,
    city,
    state,
    country,
    postal_code,
    profile_image,
  } = formData;
  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    get_user_profile(userId).then(() => {
      setLoading(true);
    });
  }, [userId]);

  useEffect(() => {
    if (userId) {
      if (userId == ownerProfile?.id) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    } else {
      setIsOwner(false);
    }
  }, [userId, ownerProfile]);

  useEffect(() => {
    if (profile) {
      console.log(isOwner);
      if (isOwner) {
        const ownerProfileData = {
          first_name: ownerProfile.first_name || "",
          last_name: ownerProfile.last_name || "",
          phone: ownerProfile.phone || "",
          address: ownerProfile.address || "",
          city: ownerProfile.city || "",
          state: ownerProfile.state || "",
          country: ownerProfile.country || "",
          postal_code: ownerProfile.postal_code || "",
          profile_image: ownerProfile.profile_image || "",
        };
        setFormData(ownerProfileData);
        setOriginalData(ownerProfileData);
      } else {
        const profileData = {
          first_name: profile.first_name || "",
          last_name: profile.last_name || "",
          phone: profile.phone || "",
          address: profile.address || "",
          city: profile.city || "",
          state: profile.state || "",
          country: profile.country || "",
          postal_code: profile.postal_code || "",
          profile_image: profile.profile_image || "",
        };
        setFormData(profileData);
        setOriginalData(profileData);
      }
    }
  }, [userId, profile, ownerProfile]);

  const onChange = (e) => {
    if (e.target.name === "profile_image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    update_user_profile(
      isOwner,
      first_name,
      last_name,
      phone,
      address,
      city,
      country,
      state,
      postal_code,
      userId,
      profile_image
    );
    window.scrollTo(0, 0);
  };

  function DialogCustomAnimation() {
    const handleOpen = () => {
      if (!open) {
        setOriginalData(formData); // Save original data when opening
      } else {
        setFormData(originalData); // Restore original data when closing without saving
      }
      setOpen(!open);
    };

    return (
      <div className="relative z-[9999]">
        {(!user || user?.id === profile?.user || user?.is_staff) && (
          <Button
            onClick={handleOpen}
            className="inline-flex items-center justify-center p-2 border-transparent rounded-full shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M14.828 2.172a4 4 0 015.656 5.656L7.414 20.9a1 1 0 01-.707.293H2v-4.707a1 1 0 01.293-.707L14.828 2.172zm1.414 1.414L4.414 15.414V19h3.586l11.828-11.828a2 2 0 00-2.828-2.828L14.828 3.586a2 2 0 00-2.828 2.828L3.414 14.828a1 1 0 00-.293.707V21h5.586a1 1 0 00.707-.293L21.9 7.414a4 4 0 00-5.656-5.656z"
                clipRule="evenodd"
              />
            </svg>{" "}
            Editar perfil
          </Button>
        )}

        <Dialog
          className="flex items-center justify-center z-[9999]"
          open={open}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-screen">
            <DialogHeader className="text-lg font-semibold">
              Editar información personal
            </DialogHeader>

            <DialogBody className="overflow-y-auto max-h-[70vh]">
              <main>
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre:
                    </label>
                    <div className="sm:col-span-2">
                      <div className="flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="first_name"
                          onChange={onChange}
                          value={first_name}
                          className="flex-1 block w-full focus:ring-teal-500 focus:border-teal-500 rounded-md sm:text-sm border-gray-300 bg-gray-50 text-gray-900 p-2.5"
                          placeholder="Nombre"
                          disabled={!user || (!isOwner && !user?.is_staff)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Apellido:
                    </label>
                    <div className="sm:col-span-2">
                      <div className="flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="last_name"
                          onChange={onChange}
                          value={last_name}
                          className="flex-1 block w-full focus:ring-teal-500 focus:border-teal-500 rounded-md sm:text-sm border-gray-300 bg-gray-50 text-gray-900 p-2.5"
                          placeholder="Apellido"
                          disabled={
                            !user ||
                            (user?.id !== profile?.user && !user?.is_staff)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ciudad:
                    </label>
                    <div className="sm:col-span-2">
                      <div className="flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="city"
                          onChange={onChange}
                          value={city}
                          className="flex-1 block w-full focus:ring-teal-500 focus:border-teal-500 rounded-md sm:text-sm border-gray-300 bg-gray-50 text-gray-900 p-2.5"
                          placeholder="Ciudad"
                          disabled={
                            !user ||
                            (user?.id !== profile?.user && !user?.is_staff)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Provincia:
                    </label>
                    <div className="sm:col-span-2">
                      <div className="flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="state"
                          onChange={onChange}
                          value={state}
                          className="flex-1 block w-full focus:ring-teal-500 focus:border-teal-500 rounded-md sm:text-sm border-gray-300 bg-gray-50 text-gray-900 p-2.5"
                          placeholder="Provincia"
                          disabled={
                            !user ||
                            (user?.id !== profile?.user && !user?.is_staff)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <label
                      htmlFor="profile_image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Imagen de perfil:
                    </label>
                    <div className="sm:col-span-2">
                      <input
                        type="file"
                        name="profile_image"
                        onChange={onChange}
                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        accept="image/*"
                        disabled={
                          !user ||
                          (user?.id !== profile?.user && !user?.is_staff)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Teléfono:
                    </label>
                    <div className="sm:col-span-2">
                      <div className="flex rounded-md shadow-sm">
                        <input
                          value={phone}
                          onChange={onChange}
                          type="text"
                          name="phone"
                          placeholder="Teléfono"
                          className="flex-1 block w-full focus:ring-teal-500 focus:border-teal-500 rounded-md sm:text-sm border-gray-300 bg-gray-50 text-gray-900 p-2.5"
                          disabled={
                            !user ||
                            (user?.id !== profile?.user && !user?.is_staff)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {(!user || user?.id === profile?.user || user?.is_staff) && (
                    <div className="flex justify-between mt-6">
                      <Button
                        color="red"
                        onClick={handleOpen}
                        className="inline-flex"
                      >
                        <span>Cancelar</span>
                      </Button>
                      <Button
                        color="green"
                        type="submit"
                        className="inline-flex"
                        onClick={() => setOpen(false)}
                      >
                        <span>Guardar</span>
                      </Button>
                    </div>
                  )}
                </form>
              </main>
            </DialogBody>
          </div>
        </Dialog>
      </div>
    );
  }

  return (
    <>
      <Layout className="min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center relative min-h-screen">
            <Card className="w-96 lg:w-2/3 xl:w-1/2 2xl:w-1/3 h-100 relative my-2">
              <CardHeader floated={false} className="h-80 relative">
                {(isOwner && ownerProfile?.profile_image) ||
                (!isOwner && profile?.profile_image) ? (
                  <img
                    src={`${backend_url}${
                      isOwner
                        ? ownerProfile?.profile_image
                        : profile?.profile_image
                    }`}
                    alt="profile-picture"
                    className="object-cover object-center h-full rounded-t-lg w-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100 rounded-t-lg w-full">
                    <Typography
                      color="blue-gray"
                      className="font-medium"
                      textGradient
                    >
                      Sin imagen de perfil
                    </Typography>
                  </div>
                )}

                <div className="absolute bottom-2 right-2">
                  {DialogCustomAnimation()}
                </div>
              </CardHeader>
              <CardBody className="text-center">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="mb-2 inline-flex"
                >
                  {first_name || "Nombre"} {last_name || "Apellido"}
                </Typography>
                {(!user || isOwner || user?.is_staff) && phone && (
                  <Typography
                    color="blue-gray"
                    className="font-medium"
                    textGradient
                  >
                    {phone || "No phone provided"}
                  </Typography>
                )}

                {(!user || isOwner || user?.is_staff) && (
                  <Typography
                    color="blue-gray"
                    className="font-medium"
                    textGradient
                  >
                    {profile?.email || "No email provided"}
                  </Typography>
                )}
                {(city || state) && (
                  <Typography
                    color="blue-gray"
                    className="font-medium"
                    textGradient
                  >
                    {city && city} {city && state && `(${state})`}
                    {!city && state && `(${state})`}
                  </Typography>
                )}
              </CardBody>
            </Card>
          </div>
        ) : (
          <div></div>
        )}
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.Auth.user,
  profile: state.Profile.profile,
  ownerProfile: state.Profile.ownerProfile,
});

export default connect(mapStateToProps, {
  update_user_profile,
  get_user_profile,
})(Profile);
