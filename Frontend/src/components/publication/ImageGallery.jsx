import { Tab } from "@headlessui/react";
import { Carousel } from "@material-tailwind/react";
const backend_url = import.meta.env.VITE_API_URL;

const ImageGallery = ({ photo }) => {
  return (
    <Carousel transition={{ duration: 2 }} className="h-screen rounded-xl">
      {photo.map((image, index) => (
        <div key={index} className="flex h-full w-full justify-around">
          <img
            src={`${backend_url}${image.image} `}
            alt="..."
            className="h-full object-center object-contain rounded-t-lg rounded-b-lg"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageGallery;
