import { cx } from "../../utils/all";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";
const backend_url = import.meta.env.VITE_API_URL;
const PublicationCard = ({ publication, aspect }) => {
  const post = publication;
  const imageProps = publication.photos[0].image;

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
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                <PhotoIcon />
              </span>
            )}
          </Link>
        </div>

        <div className={cx("flex items-center")}>
          <div>
            <div className="flex gap-3">
              <span className="inline-block text-xs font-medium tracking-wider uppercase   mt-5 text-blue-600">
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
                {format(parseISO(post?.date_created), "MMMM dd, yyyy")}
              </time>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicationCard;
