import Card from './Card';
import CardHeader from './CardHeader';
import CardContent from './CardContent';
import Badge from '../Badge';
import ReactStars from 'react-stars';
import ListingsCarousel from '../carousels/ListingsCarousel';
import { FaRegComment } from 'react-icons/fa';

/*
 * TODO:
 *  - Change input value to category selected from category badge on listings page / single business if added
 */

const ListingsCard = ({
  business,
  listingsIndex,
  onClick,
  onCategoryClick,
  currentCity,
  currentState,
}) => {
  return (
    <Card
      onClick={onClick}
      // grid first column carousel auto and remaining content 1fr for full remaining space
      className={`cursor-pointer gap-4 border border-b border-l-transparent border-r-transparent border-t-transparent transition-all duration-200 hover:border hover:border-l-neutral-200 hover:border-r-neutral-200 hover:border-t-neutral-200 hover:shadow-md sm:grid sm:grid-cols-[auto_1fr]`}
    >
      <div className='flex items-center justify-center'>
        {/* carousel of business pictures on listings cards */}
        <ListingsCarousel businessId={business.id} />
      </div>
      <div>
        <CardHeader className='text-center sm:text-start'>
          {listingsIndex}
          {'. '}
          {business.name}
        </CardHeader>
        <CardContent>
          <div className='-mt-2 mb-2 flex-wrap items-center gap-2 text-center sm:flex sm:px-2'>
            <div className='flex flex-wrap items-center justify-center gap-2'>
              {/* business average rating information */}
              <ReactStars
                className='justify-self-center'
                count={5}
                edit={false}
                value={business.average_stars}
                color2='#ff007f'
                size={25}
                // char={<FaRegStar />}
                half={true}
              />
              <span className='font-bold text-black'>
                {business.average_stars}
              </span>
            </div>
            ({business.review_count}){' '}
            <span className='ml-0.5 sm:-ml-1'>reviews</span>
          </div>
          {/* show distance from target location */}
          <Badge disabled outline round>
            {`${business.distance_from_location} mi.`}
          </Badge>
          <div className='ml-0.5 mt-2 flex max-w-sm flex-wrap gap-2'>
            {/* slice off back for better variety */}
            {/* business categories */}
            {business.categories.slice(-3).map((category) => (
              // {business.categories.slice(0, 3).map((category) => (
              <Badge
                onClick={(e) => {
                  // prevent click event from bubbling up to card
                  e.stopPropagation();
                  onCategoryClick({
                    categoryId: category.id,
                    categoryName: category.name,
                    city: currentCity,
                    state: currentState,
                  });
                }}
                key={category.id}
              >
                {category.name}
              </Badge>
            ))}
          </div>
          <div className='pt-2'>{business.is_open}</div>
          {/* display most recent review */}
          <FaRegComment className='absolute translate-y-[22px] -scale-x-100 transform' />
          <q className='line-clamp-2 overflow-hidden pl-6 pt-5 text-sm leading-6 sm:pr-12'>
            {business.recent_review.review_text}
          </q>
        </CardContent>
      </div>
      {/* <CardFooter></CardFooter> */}
    </Card>
  );
};

ListingsCard.displayName = 'ListingsCard';

export default ListingsCard;
