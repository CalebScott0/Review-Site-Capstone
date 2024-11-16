import { useForm, Controller } from "react-hook-form";
import Heading from "../components/Heading";
import ReactStars from "react-stars";
import Button from "../components/Button";

const ReviewForm = ({ userId, businessId, businessName }) => {
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

  errors && console.log(errors);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="md:w-1/3 w-2/3 mx-auto mt-10">
      <form>
        <Heading center title={`Start your review for\n ${businessName}`} />
        {/* register react stars as controlled input */}
        <Controller
          name="stars"
          control={control}
          defaultValue={1} // Default rating value
          render={({ field }) => (
            <ReactStars
              size={40}
              half={false}
              color2="#ff007f"
              count={5}
              className="my-4"
              value={field.value} // Controlled value from React Hook Form
              onChange={field.onChange} // Updates React Hook Form's state
            />
          )}
        />
        <label className="font-semibold text-lg">
          Share your experience below
        </label>
        <textarea
          id="reviewText"
          name="reviewText"
          className={`border w-full p-4 mt-2 ${`${errors.reviewText ? "border-red-500 outline-rose-500" : ""}`}`}
          rows="6"
          placeholder="Start your review..."
          autoFocus
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
        <Button label="Continue" onClick={handleSubmit(onSubmit)}></Button>
      </form>
    </div>
  );
};

export default ReviewForm;
