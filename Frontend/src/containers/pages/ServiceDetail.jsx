import Layout from "../../hocs/Layout";
import { useParams } from "react-router";
import { connect } from "react-redux";
import {
  get_service,
  get_related_services,
} from "../../redux/actions/services";
import { useEffect, useState } from "react";

import { HeartIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import ImageGallery from "../../components/service/ImageGallery";

const product = {
  name: "Zip Tote Basket",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    // More images...
  ],
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
  description: `
      <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    // More sections...
  ],
};

const ServiceDetail = ({
  get_service,
  get_related_services,
  service,
  related_services,
  isAuthenticated,
}) => {
  const params = useParams();
  const serviceId = params.serviceId;
  useEffect(() => {
    get_service(serviceId);
    get_related_services(serviceId);
  }, []);
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <ImageGallery photo={service && service.photo} />
            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {service && service.name}
              </h1>
              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
              </div>
              {/* Reviews */}
              {/* <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? "text-indigo-500"
                            : "text-gray-300",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div> */}
              |
              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: service && service.description,
                  }}
                />
              </div>
              <form className="mt-6">
                {isAuthenticated ? (
                  <div className="mt-10 flex sm:flex-col1">
                    <button
                      type="submit"
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
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  profile: state.Profile.profile,
  service: state.Services.service,
  related_services: state.Services.related_services,
});
export default connect(mapStateToProps, { get_service, get_related_services })(
  ServiceDetail
);
