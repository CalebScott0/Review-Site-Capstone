import Card from "./Card";
import CardHeader from "./CardHeader";
import CardContent from "./CardContent";
import Badge from "../Badge";
import ReactStars from "react-stars";
import ListingsCarousel from "../carousels/ListingsCarousel";
import { FaRegComment, FaRegStar } from "react-icons/fa";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ListingsCard = ({ business, idx, searchParams }) => {
  const navigate = useNavigate();

  const handleCategoryClick = useCallback(
    ({ id, categoryName }) => {
      // grab location search param from url
      const locationParam = searchParams.get("find_loc");
      // navigate with category name and id in state passed from badge click
      navigate(`/search?find_desc=${categoryName}&find_loc=${locationParam}`, {
        // pass category id in location state
        state: {
          categoryId: id,
        },
      });
    },
    [searchParams, navigate]
  );

  return (
    <Card
      // grid first column carousel auto and remaining content 1fr for full remaining space
      className={`border-b hover:border hover:shadow-md cursor-pointer sm:grid sm:grid-cols-[auto_1fr] gap-4`}
    >
      <div className="justify-self-center">
        {/* <div className="justify-self-center mt-10 md:mt-0"> */}
        <ListingsCarousel businessId={business.id} />
      </div>
      <div>
        <CardHeader className="text-center sm:text-start">
          {idx}
          {". "}
          {business.name}
        </CardHeader>
        <CardContent>
          <div className="sm:flex items-center gap-2 sm:px-2 -mt-2 mb-2 text-center">
            <div className="flex justify-center items-center gap-2">
              <ReactStars
                className="justify-self-center"
                count={5}
                edit={false}
                value={business.average_stars}
                color2="#ff007f"
                size={25}
                // char={<FaRegStar />}
                half={true}
              />
              <span className="font-bold text-black">
                {business.average_stars}
              </span>
            </div>
            ({business.review_count}){" "}
            <span className="sm:-ml-1 ml-0.5">reviews</span>
          </div>
          <Badge disabled outline round>
            {`${business.distance_from_location} mi.`}
          </Badge>
          <div className="flex flex-wrap gap-2 max-w-sm mt-2 ml-0.5">
            {/* slice off back for better variety */}
            {business.categories.slice(-3).map((category) => (
              // {business.categories.slice(0, 3).map((category) => (
              <Badge
                onClick={() =>
                  handleCategoryClick({
                    id: category.id,
                    categoryName: category.name,
                  })
                }
                key={category.idx}
              >
                {category.name}
              </Badge>
            ))}
          </div>
          <div className="pt-2">{business.is_open}</div>
          <FaRegComment className="absolute transform translate-y-[22px] -scale-x-100 " />
          <q className="line-clamp-2 leading-6 pt-5 pl-6 sm:pr-12 overflow-hidden text-sm">
            {business.recent_review.review_text}
          </q>
        </CardContent>
      </div>
      {/* <CardFooter></CardFooter> */}
    </Card>
  );
};

ListingsCard.displayName = "ListingsCard";

export default ListingsCard;
