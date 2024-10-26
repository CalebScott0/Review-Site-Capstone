import Card from "./Card";
import CardHeader from "./CardHeader";
import CardContent from "./CardContent";
import ReactStars from "react-stars";
import ListingsCarousel from "../carousels/ListingsCarousel";
import { FaRegComment } from "react-icons/fa";

const ListingsCard = ({ business, idx }) => {
  return (
    <Card
      // grid first column carousel auto and remaining content 1fr for full remaining space
      className={`border-b hover:border hover:shadow-md cursor-pointer grid grid-cols-[auto_1fr] gap-4`}
    >
      <ListingsCarousel businessId={business.id} />
      <div>
        <CardHeader>
          {idx}. {business.name}
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 px-2">
            <ReactStars
              count={5}
              size={24}
              edit={false}
              value={business.average_stars}
              color2="#ff007f"
            />
            <span className="font-bold text-black">
              {business.average_stars}
            </span>
            ({business.review_count}) <span className="-ml-1">reviews</span>
          </div>
          <div className="flex gap-2 max-w-sm">
            {business.categories.slice(0, 3).map((category) => (
              <div
                className="bg-neutral-300 bg-opacity-80 text-sm rounded-md px-2 py-0.5 hover:bg-opacity-50 active:scale-95"
                key={category.idx}
              >
                {category.name}
              </div>
            ))}
          </div>
          <FaRegComment className="absolute transform translate-y-[22px] -scale-x-100 " />
          <q className="line-clamp-3 leading-6 pt-5 pl-6 pr-24 overflow-hidden text-sm">
            {business.recent_review.review_text}
          </q>
        </CardContent>
      </div>
      {/* <CardFooter></CardFooter> */}
    </Card>
  );
};

export default ListingsCard;

{
  /* EXCEPT FOR CAROUSEL, DONT PASS DATA TO THESE HEADERS, HAVE THEM TAKE {CHILDREN} WITH base text styling and dimensions! (w-full)  */
}
{
  /* <CardFooter></CardFooter> */
}
