import { Tab } from "@headlessui/react";
import { Carousel } from "@material-tailwind/react";
const backend_url = 'https://trendyswap.es';

const ImageGallery = ({ photo }) => {
  return (
    <Carousel transition={{ duration: 2 }} className="rounded mt-3" style={{height: 'min-content', maxHeight:'820px', maxWidth:'620px', overflow: 'hidden'}}>
      {photo.map((image, index) => (
        <div key={index} className="flex  w-full justify-around" style={{height: 'min-content'}}>
          <img
            src={`${backend_url}${image.image} `}
            style={{height: '100%', width: '100%'}}
           
            alt="..."
            className=" object-center object-contain rounded-t-lg rounded-b-lg"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageGallery;
