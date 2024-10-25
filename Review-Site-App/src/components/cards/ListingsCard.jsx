import Card from "./Card";
import CardHeader from "./CardHeader";
import CardContent from "./CardContent";
import ReactStars from "react-stars";

const ListingsCard = ({ business, className, idx }) => {
  return (
    <Card className={`border-b hover:border hover:shadow-md ${className}`}>
      <CardHeader>
        {idx}. {business.name}
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <ReactStars
            count={5}
            size={24}
            edit={false}
            value={business.average_stars}
          />
          <span className="font-bold">{business.average_stars}</span>
        </div>
      </CardContent>
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
