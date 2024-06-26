import Layout from "../../hocs/Layout";
import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { create_publication } from "../../redux/actions/publications";
import { TailSpin } from "react-loader-spinner";
import { comunidadesAutonomas } from "../../utils/locations";
const AddPublication = ({
  create_publication,
  categories,
  isPublicationCreated,
}) => {
  const [loading, setLoading] = useState(false);
  const [filePreviews, setFilePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const resetForm = () => {
    setFormData({
      service_requested: "",
      object_offered: "",
      location: "",
      description: "",
      category_id: "",
      photos: [],
    });
    setFilePreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    service_requested: "",
    object_offered: "",
    location: "",
    description: "",
    category_id: "",
    photos: [],
  });
  const [isHovered, setIsHovered] = useState(false);
  const {
    service_requested,
    object_offered,
    location,
    description,
    category_id,
    photos,
  } = formData;
  const onChange = (e) => {
    if (e.target.name === "photos") {
      const files = Array.from(e.target.files);
      const newPhotos = [...photos, ...files];
      console.log(newPhotos);
      setFormData({ ...formData, [e.target.name]: newPhotos });
      const previews = files.map((file) => URL.createObjectURL(file));
      setFilePreviews([...filePreviews, ...previews]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await create_publication(
      service_requested,
      object_offered,
      location,
      description,
      category_id,
      photos
    );
    setLoading(false);
  };

  useEffect(() => {
    if (isPublicationCreated && !loading) {
      resetForm();
      window.scrollTo(0, 0);
    }
  }, [isPublicationCreated, loading]);

  const onDragEnter = (e) => {
    e.preventDefault();
    setIsHovered(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsHovered(false);
  };

  const removeImage = (index) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos.splice(index, 1);
    setFormData({ ...formData, photos: updatedPhotos });

    const updatedPreviews = [...filePreviews];
    URL.revokeObjectURL(updatedPreviews[index]); // Revoke the URL to free up memory
    updatedPreviews.splice(index, 1);

    setFilePreviews(updatedPreviews);
    if (updatedPreviews.length === 0) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="p-4 w-full max-w-2xl h-full md:h-auto ">
          <div className=" p-4 bg-white rounded-lg shadow  sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Crear Publicación
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
                    required
                    value={service_requested && service_requested}
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
                    required
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
                    required
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
                    required
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
                    required
                    name="description"
                    value={description}
                    onChange={onChange}
                    id="description"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Describe tu publicación"
                  ></input>
                </div>

                <div className="sm:col-span-2">
                  <div
                    className={`shadow relative flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-white ${
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs ">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      name="photos"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={onChange}
                      className="absolute inset-0 opacity-0 cursor-pointer "
                    />
                  </div>
                  <div className="flex flex-wrap">
                    {filePreviews.map((preview, index) => (
                      <div key={index} className="mr-2 mb-2 relative">
                        <img
                          src={preview}
                          alt={`Image ${index}`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex justify-center items-center"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {loading ? (
                <button
                  type="submit"
                  className="mx-auto flex items-center border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500  px-5 py-2.5 text-center "
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
                  className="mx-auto flex items-center border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500  px-5 py-2.5 text-center "
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
                  Añadir
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
  isPublicationCreated: state.Publications.isPublicationCreated,
});
export default connect(mapStateToProps, {
  create_publication,
})(AddPublication);
