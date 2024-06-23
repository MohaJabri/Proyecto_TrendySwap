import { cx } from "../../utils/all";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { es } from 'date-fns/locale';
const backend_url = 'https://api.trendyswap.es:8000';;
const PublicationCard = ({ publication, aspect }) => {
  const post = publication;
  const imageProps = publication.photos[0]?.image;

  return (
    <>
      <div className={cx("group cursor-pointer")}>
        <div
          className={cx(
            " overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105"
          )}
        >
          <Link
            className={cx(
              "relative block",
              aspect === "landscape"
                ? "aspect-video"
                : aspect === "custom"
                ? "aspect-[5/4]"
                : "aspect-square"
            )}
            to={`/publication/${publication.id}`}
          >
            {imageProps ? (
              <img
                src={`${backend_url}${publication.photos[0].image} `}
                className="object-cover transition-all"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800px"
                height="800px"
                viewBox="0 0 120 120"
                fill="none"
                className="w-full h-full"
              >
                <rect width="120" height="120" fill="#EFF1F3" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M33.2503 38.4816C33.2603 37.0472 34.4199 35.8864 35.8543 35.875H83.1463C84.5848 35.875 85.7503 37.0431 85.7503 38.4816V80.5184C85.7403 81.9528 84.5807 83.1136 83.1463 83.125H35.8543C34.4158 83.1236 33.2503 81.957 33.2503 80.5184V38.4816ZM80.5006 41.1251H38.5006V77.8751L62.8921 53.4783C63.9172 52.4536 65.5788 52.4536 66.6039 53.4783L80.5006 67.4013V41.1251ZM43.75 51.6249C43.75 54.5244 46.1005 56.8749 49 56.8749C51.8995 56.8749 54.25 54.5244 54.25 51.6249C54.25 48.7254 51.8995 46.3749 49 46.3749C46.1005 46.3749 43.75 48.7254 43.75 51.6249Z"
                  fill="#687787"
                />
              </svg>
            )}
          </Link>
        </div>

        <div className={cx("flex items-center")}>
          <div>
            <div className="flex gap-3">
              <span className="inline-block text-xs font-medium tracking-wider uppercase   mt-5 text-teal-300">
                {publication.category_name}
              </span>
            </div>
            <h2
              className={cx(
                "text-2xl",
                "text-lg",
                "line-clamp-2 font-medium  tracking-normal text-black",
                "mt-2"
              )}
            >
              <Link href={`/publication/${publication.id}`}>
                <p>
                  <span className="text-gray-500 dark:text-gray-400">
                    Se solicita:
                  </span>{" "}
                  <span
                    className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
                              bg-no-repeat
                              transition-[background-size]
                              duration-500
                              hover:bg-[length:100%_3px]
                              group-hover:bg-[length:100%_10px]
                             dark:from-purple-800 dark:to-purple-900"
                  >
                    {publication.service_requested}
                  </span>
                </p>
                <span>
                  <span className="text-gray-500 dark:text-gray-400">
                    Se ofrece:
                  </span>{" "}
                  <span
                    className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
                              bg-no-repeat
                              transition-[background-size]
                              duration-500
                              hover:bg-[length:100%_3px]
                              group-hover:bg-[length:100%_10px]
                             dark:from-purple-800 dark:to-purple-900"
                  >
                    {publication.object_offered}
                  </span>
                </span>
              </Link>
            </h2>

            <div className="hidden">
              {post.excerpt && (
                <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  <Link
                    href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${
                      post.slug.current
                    }`}
                  >
                    {post.excerpt}
                  </Link>
                </p>
              )}
            </div>

            <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
              <Link href={`/author/${post?.author?.slug?.current}`}>
                <div className="flex items-center gap-3">
                  <div className="relative h-5 w-5 flex-shrink-0">
                    {post?.author?.image && (
                      <img
                        src={AuthorimageProps.src}
                        alt={post?.author?.name}
                        className="rounded-full object-cover"
                        fill
                        sizes="20px"
                      />
                    )}
                  </div>
                  <span className="truncate text-sm">
                    {publication?.user_full_name}
                  </span>
                </div>
              </Link>
              <span className="text-xs text-gray-300 dark:text-gray-600">
                &bull;
              </span>
              <time className="truncate text-sm" dateTime={post?.date_created}>
              {format(parseISO(post?.date_created), "dd, MMMM, yyyy", { locale: es })}
              </time>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicationCard;
