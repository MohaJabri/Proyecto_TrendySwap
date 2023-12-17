import { connect } from "react-redux";

import { useEffect } from "react";
import { Navigate } from "react-router";
import { Fragment, useState } from "react";
import { useParams } from "react-router";

import {
  update_user_profile,
  get_user_profile,
} from "../../redux/actions/profile";
import { TailSpin } from "react-loader-spinner";
import Layout from "../../hocs/Layout";

const Profile = ({ user, update_user_profile, profile, get_user_profile }) => {
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
  });

  const {
    first_name,
    last_name,
    phone,
    address,
    city,
    state,
    country,
    postal_code,
  } = formData;
  const params = useParams();
  const userId = params.userId;
  useEffect(() => {
    get_user_profile(userId);
  }, [userId]);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        postal_code: profile.postal_code,
      });
    }
  }, [userId, profile]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    update_user_profile(
      first_name,
      last_name,
      phone,
      address,
      city,
      country,
      state,
      postal_code,
      userId
    );

    window.scrollTo(0, 0);
  };

  return (
    <>
      <Layout>
        {/* Static sidebar for desktop */}

        <div className="md:p-8 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
                <form
                  onSubmit={(e) => onSubmit(e)}
                  className="max-w-3xl mx-auto"
                >
                  <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Profile
                    </h3>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm: sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Nombre:
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="first_name"
                          onChange={(e) => onChange(e)}
                          value={first_name}
                          className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500 bg-gray-50 border  text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600  p-2.5 "
                          placeholder="Nombre"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm: sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Apellido:
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="last_name"
                          onChange={(e) => onChange(e)}
                          value={last_name}
                          className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500 bg-gray-50 border  text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600  p-2.5 "
                          placeholder="Apellido"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm: sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Dirección:
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="address"
                          onChange={(e) => onChange(e)}
                          value={address}
                          className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500 bg-gray-50 border  text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600  p-2.5 "
                          placeholder="Dirección"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm: sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Ciudad:
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="city"
                          onChange={(e) => onChange(e)}
                          value={city}
                          className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500 bg-gray-50 border  text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600  p-2.5 "
                          placeholder="Ciudad"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm: sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Estado/Provincia:
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="state"
                          onChange={(e) => onChange(e)}
                          value={state}
                          className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500 bg-gray-50 border  text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600  p-2.5 "
                          placeholder="Estado/Provincia"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm: sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="postal_code"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Código Postal:
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="postal_code"
                          onChange={(e) => onChange(e)}
                          value={postal_code}
                          className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500 bg-gray-50 border  text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600  p-2.5 "
                          placeholder="Código Postal"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm: sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Teléfono:
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                          value={phone}
                          onChange={(e) => onChange(e)}
                          type="text"
                          name="phone"
                          placeholder="Teléfono"
                          className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500 bg-gray-50 border  text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600  p-2.5 "
                        />
                      </div>
                    </div>
                  </div>

                  {loading ? (
                    <button className="inline-flex mt-4 float-right items-center px-2.5 py-1.5 border ransparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <TailSpin color="#fff" width={20} height={20} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex mt-4 float-right items-center px-2.5 py-1.5 border ransparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  )}
                </form>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.Auth.user,
  profile: state.Profile.profile,
});

export default connect(mapStateToProps, {
  update_user_profile,
  get_user_profile,
})(Profile);
