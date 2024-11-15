import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { onRegisterClose } from "../../redux/slices/registerModalSlice";
import { onLoginOpen } from "../../redux/slices/loginModalSlice";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import { useRegisterMutation } from "../../redux/services/authSlice";

const RegisterModal = () => {
  const dispatch = useDispatch();
  // boolean isOpen from modal slice
  const isRegisterModalOpen = useSelector(
    (state) => state.registerModal.isOpen
  );

  const [registerUser] = useRegisterMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  register("email", {
    pattern: {
      // matches only letters after the . and requires at least 2 letters in the top-level domain (part after the .)
      value: /^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/,
      message: "Please enter a valid email.",
    },
    // onChange() {
    //   setError(null);
    // },
  });

  register("firstName", {
    pattern: {
      value: /^[A-Za-z]+( [A-Za-z]+)*$/,
      message: "Please enter a valid name.",
    },
  });

  register("lastName", {
    pattern: {
      value: /^[A-Za-z]+( [A-Za-z]+)*$/,
      message: "Please enter a valid name.",
    },
  });

  register("password", {
    minLength: {
      value: 8,
      message: "Password should be at least 8 characters.",
    },
    maxLength: {
      value: 20,
      message: "Password should be shorter than 20 characters.",
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|:;?.])[A-Za-z\d!@#$%^&*()_+={}[\]|:;?.]{8,20}$/,
      message:
        "Password must contain at least one uppercase and lowercase letter, number, and special character.",
    },
  });

  const onSubmit = async (data) => {
    setError(null);
    setIsLoading(true);
    try {
      await registerUser(data).unwrap();
      // close and reset form
      dispatch(onRegisterClose());
      reset();
    } catch (error) {
      // specific error handling for duplicate email register
      if (error.data?.message) {
        setError(error.data.message);
      } else if (error) {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        center
        title="Welcome to ReviewGuru"
        subtitle="Create an account below!"
      />
      <div className="flex gap-4">
        <Input
          id="firstName"
          capitalize
          disabled={isLoading}
          error={errors.firstName}
          errors={errors}
          label="First Name"
          register={register}
          required
        />
        <Input
          id="lastName"
          capitalize
          disabled={isLoading}
          error={errors.lastName}
          errors={errors}
          label="Last Name"
          register={register}
          required
        />
      </div>
      <Input
        id="email"
        disabled={isLoading}
        error={errors.email}
        errors={errors}
        label="Email"
        required
        register={register}
      />
      <div className="relative">
        <Input
          id="password"
          type={!showPassword ? "password" : "text"}
          disabled={isLoading}
          error={errors.password}
          errors={errors}
          label="Password"
          required
          register={register}
        />
        <div className="absolute right-4 top-6 cursor-pointer">
          {!showPassword ? (
            <IoEyeOffOutline size={24} onClick={() => setShowPassword(true)} />
          ) : (
            <IoEyeOutline size={24} onClick={() => setShowPassword(false)} />
          )}
        </div>
      </div>
      {error && <div className="mt-2 text-xl -mb-4 text-rose-500">{error}</div>}
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={() => {
              dispatch(onRegisterClose());
              dispatch(onLoginOpen());
            }}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      // disabled={isLoading}
      isOpen={isRegisterModalOpen}
      title="Register"
      actionLabel="Continue"
      onClose={() => dispatch(onRegisterClose())}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
