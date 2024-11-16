import { useForm, Controller } from "react-hook-form";
import Heading from "../components/Heading";
import ReactStars from "react-stars";
import Button from "../components/Button";
import { useAddReviewMutation } from "../redux/services/reviewsApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ReviewForm = ({ businessId, businessName }) => {
  const [addReview] = useAddReviewMutation();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

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

  return (
    <form className="relative">
      <Heading center title={`Start your review for\n ${businessName}`} />
      <div>
        {/* register react stars as controlled input */}
        <div className="absolute left-5 top-20">
          <Controller
            name="stars"
            control={control}
            defaultValue={1} // Default rating value
            rules={{
              required: "Rating is required", // Validation rule for required
              validate: (value) => value > 0 || "Please select at least 1 star", // Custom validation
            }}
            render={({ field }) => (
              <ReactStars
                edit={isLoading}
                size={40}
                half={false}
                color2="#ff007f"
                count={5}
                value={field.value} // Controlled value from React Hook Form
                onChange={field.onChange} // Updates React Hook Form's state
              />
            )}
          />
        </div>
        {errors.stars?.message && (
          <div className="absolute top-24 right-48 text-rose-500">
            {errors.stars.message}
          </div>
        )}
        {/* text area for review */}
        <label className="absolute top-36 left-5 text-neutral-500  font-semibold">
          Share your experience below
        </label>
        <textarea
          disabled={isLoading}
          id="reviewText"
          name="reviewText"
          className={`resize-none border-2 shadow-sm rounded-md w-full min-h-[350px] pt-28 pl-5 ${`${errors.reviewText ? "border-red-500 outline-rose-500" : ""}`}`}
          placeholder="Start your review..."
          autoFocus
          rows="6"
          {...register("reviewText", {
            required: true,
            minLength: {
              value: 75,
              message: "Review should be at least 75 characters.",
            },
          })}
        />
        {errors.reviewText?.message && (
          <div className="my-4 text-rose-500">{errors.reviewText.message}</div>
        )}
        {error && <div className="my-4 text-xl text-rose-500">{error}</div>}
      </div>
      <Button
        disabled={isLoading}
        label="Continue"
        onClick={handleSubmit(onSubmit)}
      ></Button>
    </form>
  );
};

export default ReviewForm;
