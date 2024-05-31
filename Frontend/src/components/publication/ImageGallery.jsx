import { Tab } from "@headlessui/react";
import { Carousel } from "@material-tailwind/react";
const backend_url = import.meta.env.VITE_API_URL;

const ImageGallery = ({ photo }) => {
  return (
    <Carousel transition={{ duration: 2 }} className="h-screen rounded mt-3">
      {photo.map((image, index) => (
        <div key={index} className="flex  w-full justify-around">
          <img
            src={`${backend_url}${image.image} `}
            style={{height: 850+'px'}}
           
            alt="..."
            className=" object-center object-contain rounded-t-lg rounded-b-lg"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageGallery;
