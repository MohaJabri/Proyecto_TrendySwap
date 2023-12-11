import { Tab } from "@headlessui/react";

const backend_url = import.meta.env.VITE_API_URL;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ImageGallery = ({ photo }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      {/* Image selector */}

      <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
        <Tab.Panel>
          <img
            src={`${backend_url}${photo} `}
            className="w-full h-screen object-center object-contain sm:rounded-lg"
          />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default ImageGallery;
