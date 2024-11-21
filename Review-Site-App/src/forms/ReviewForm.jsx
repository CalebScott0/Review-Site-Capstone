import { useForm, Controller } from "react-hook-form";
import Heading from "../components/Heading";
import ReactStars from "react-stars";
import Button from "../components/Button";
import { useAddReviewMutation } from "../redux/services/reviewsApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import useNavigation from "../hooks/useNavigation";

const ReviewForm = ({
  businessId,
  businessName,
  handleSingleBusinessClick,
}) => {
  const [addReview] = useAddReviewMutation();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reviewText: "",
      stars: 0,
    },
  });

  const onSubmit = async (data) => {
    setError(null);
    setIsLoading(true);
    try {
      await addReview({ businessId, data }).unwrap();
      // close and reset form
      toast.success("Review submitted!");
      reset();
      setTimeout(() => {
        navigate(-1);
      }, 300);
    } catch (error) {
      if (error.data?.message) {
        setError(error.data.message);
      } else if (error) {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // STOP SCROLL ON PAGE? ADD SCROLL TO REVIEWLIST

  return (
    <form>
      <Heading center title={`Start your review for\n ${businessName}`} />
      <div className="relative">
        {/* register react stars as controlled input */}
        <div className="absolute sm:left-10 left-4 top-4">
          <Controller
            name="stars"
            control={control}
            rules={{
              required: "Rating is required", // Validation rule for required
              validate: (value) => value > 0 || "Please select at least 1 star", // Custom validation
            }}
            render={({ field }) => (
              <ReactStars
                edit={!isLoading}
                size={40}
                half={false}
                color2="#ff007f"
                className="z-10"
                count={5}
                value={field.value} // Controlled value from React Hook Form
                onChange={field.onChange} // Updates React Hook Form's state
              />
            )}
          />
        </div>
        {errors.stars?.message && (
          <div className="absolute top-9 left-[42%] text-lg font-semibold text-rose-500">
            {errors.stars.message}
          </div>
        )}
        {/* container area for review */}
        <div
          className={`focus-within:ring-black focus-within:ring-2 focus-within:ring-offset-4 border-2 shadow-sm rounded-md mb-4 min-h-[400px] ${errors.reviewText ? "border-red-500 outline-rose-500" : ""} relative`}
        >
          <label className="absolute top-24 z-10 left-4 sm:left-10 text-neutral-500  font-semibold">
            Share your experience below
          </label>
          <textarea
            disabled={isLoading}
            id="reviewText"
            name="reviewText"
            className="w-full sm:px-10 px-4 resize-none outline-none absolute top-36"
            placeholder="Start your review..."
            autoFocus
            rows="10"
            {...register("reviewText", {
              required: true,
              minLength: {
                value: 75,
                message: "Review should be at least 75 characters.",
              },
            })}
          />
        </div>
        {errors.reviewText?.message && (
          <div className="my-4 text-rose-500 text-lg font-semibold">
            {errors.reviewText.message}
          </div>
        )}
        {error && (
          <div className="my-4 text-xl font-semibold text-rose-500">
            {error}
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <Button
          disabled={isLoading}
          label="Cancel"
          outline
          small
          // navigate (-1) not working, navigate directly back to single business page
          onClick={() =>
            handleSingleBusinessClick({ businessId, businessName })
          }
        />
        <Button
          disabled={isLoading}
          label="Continue"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
};

export default ReviewForm;
