import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { onRegisterOpen } from "../../redux/slices/registerModalSlice";
import { onLoginClose } from "../../redux/slices/loginModalSlice";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useLoginMutation } from "../../redux/services/authSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  // boolean isOpen from modal slice
  const isLoginModalOpen = useSelector((state) => state.loginModal.isOpen);

  const [login] = useLoginMutation();

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
  });

  register("password", {
    minLength: {
      value: 8,
      message: "Password is at least 8 characters.",
    },
    maxLength: {
      value: 20,
      message: "Password is shorter than 20 characters.",
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|:;?.])[A-Za-z\d!@#$%^&*()_+={}[\]|:;?.]{8,20}$/,
      message:
        "Password contains at least one uppercase and lowercase letter, number, and special character.",
    },
  });

  const onSubmit = async (data) => {
    setError(null);
    setIsLoading(true);
    try {
      await login(data).unwrap();
      // close and reset form
      dispatch(onLoginClose());
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
        title="Welcome Back"
        subtitle="Sign in to your account below!"
      />
      <Input
        id="email"
        disabled={isLoading}
        error={errors.email}
        errors={errors}
        label="Email"
        required
        register={register}
        autoComplete="email"
      />
      <div className="relative">
        <Input
          type={!showPassword ? "password" : "text"}
          id="password"
          disabled={isLoading}
          error={errors.password}
          errors={errors}
          label="Password"
          required
          register={register}
          autoComplete="current-password"
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
          <div>Need to create an account?</div>
          <div
            onClick={() => {
              dispatch(onRegisterOpen());
              dispatch(onLoginClose());
            }}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isLoginModalOpen}
      title="Login"
      actionLabel="Continue"
      onClose={() => dispatch(onLoginClose())}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
