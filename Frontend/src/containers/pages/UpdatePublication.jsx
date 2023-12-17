import Layout from "../../hocs/Layout";
import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import {
  update_publication,
  get_publication,
} from "../../redux/actions/publications";
import { TailSpin } from "react-loader-spinner";
const backend_url = import.meta.env.VITE_API_URL;

import { comunidadesAutonomas } from "../../utils/locations";
const UpdatePublication = ({
  update_publication,
  categories,
  get_publication,
  publication,
}) => {
  const inputRef = useRef(null);
  const params = useParams();
  const publicationId = params.publicationId;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    service_requested: "",
    object_offered: "",
    location: "",
    description: "",
    category_id: "",
    photo: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    get_publication(publicationId);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (publication) {
      setFormData({
        service_requested: publication.service_requested,
        object_offered: publication.object_offered,
        location: publication.location,
        description: publication.description,
        category_id: publication.category,
        photo: publication.photo,
      });
    }
  }, [publication]);

  const [isHovered, setIsHovered] = useState(false);
  const {
    service_requested,
    object_offered,
    location,
    description,
    category_id,
    photo,
  } = formData;
  const [filePreview, setFilePreview] = useState("");
  const onChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files && e.target.files[0];
      if (file) {
        setFormData({ ...formData, [e.target.name]: file });
        const reader = new FileReader();
        reader.onload = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Comprueba si la nueva imagen es igual a la imagen actual
    const isSamePhoto = formData.photo === publication.photo;

    // Si la imagen no cambia, se envía 'null' para indicar que no se actualiza la imagen
    const photoToSend = isSamePhoto ? null : formData.photo;

    // Llama a la acción 'update_publication' pasando la información actualizada
    await update_publication(
      publicationId,
      service_requested,
      object_offered,
      location,
      description,
      category_id,
      photoToSend
    );

    setLoading(false);
    window.scrollTo(0, 0);
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    setIsHovered(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsHovered(false);
  };

  const removeImage = () => {
    setFormData({ ...formData, photo: null });
    setIsHovered(false);
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="p-4 w-full max-w-2xl h-full md:h-auto ">
          <div className=" p-4 bg-white rounded-lg shadow  sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Actualizar Publicación
              </h3>
            </div>
            <form onSubmit={onSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Solicito
                  </label>
                  <input
                    value={service_requested}
                    onChange={onChange}
                    type="text"
                    name="service_requested"
                    id="service_requested"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Que necesitas?"
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Ofrezco
                  </label>
                  <input
                    value={object_offered}
                    onChange={onChange}
                    type="text"
                    name="object_offered"
                    id="object_offered"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Que ofreces?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Categoría
                  </label>
                  <select
                    value={category_id}
                    onChange={onChange}
                    name="category_id"
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="comunidad-autonoma"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Ubicación
                  </label>
                  <select
                    value={formData.location}
                    onChange={onChange}
                    name="location"
                    id="comunidad-autonoma"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  >
                    <option value="">Selecciona una comunidad autónoma</option>
                    {comunidadesAutonomas.map((comunidad) => (
                      <option key={comunidad.id} value={comunidad.name}>
                        {comunidad.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Descripción
                  </label>
                  <input
                    name="description"
                    value={description}
                    onChange={onChange}
                    id="description"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Describe tu publicación"
                  ></input>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-center w-full">
                    {photo === null ? (
                      <label
                        htmlFor="dropzone-file"
                        className={`shadow relative flex flex-col items-center justify-center w-full h-64  rounded-lg cursor-pointer bg-white hover:bg-gray-400 ${
                          isHovered
                            ? "bg-gray-400 text-white"
                            : "bg-white text-gray-400 hover:bg-gray-400 hover:text-white"
                        }`}
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                      >
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <p className="mb-2 text-sm">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs ">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          name="photo"
                          ref={inputRef}
                          type="file"
                          id="dropzone-file"
                          multiple={true}
                          onChange={onChange}
                          className="absolute inset-0 opacity-0 cursor-pointer "
                        />
                      </label>
                    ) : (
                      <div>
                        <button
                          onClick={removeImage}
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                          data-modal-toggle="defaultModal"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                        <img
                          className="h-48 w-96"
                          src={filePreview || `${backend_url}${photo}`}
                          alt="Imagen seleccionada"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {loading ? (
                <button
                  type="submit"
                  className="mx-auto flex items-center border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  px-5 py-2.5 text-center "
                >
                  <svg
                    className="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <TailSpin color="#fff" width={20} height={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="mx-auto flex items-center border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  px-5 py-2.5 text-center "
                >
                  <svg
                    className="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Actualizar
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  categories: state.Categories.categories,
  publication: state.Publications.publication,
});
export default connect(mapStateToProps, {
  update_publication,
  get_publication,
})(UpdatePublication);
