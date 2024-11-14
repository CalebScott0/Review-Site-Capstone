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
import { onRegisterOpen } from "../../redux/slices/registerModalSlice";
import { onLoginClose } from "../../redux/slices/loginModalSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  // boolean isOpen from modal slice
  const isLoginModalOpen = useSelector((state) => state.loginModal.isOpen);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    onChange() {
      setError(null);
    },
  });

  //   ADD MORE VALIDATION
  register("password", {
    minLength: {
      value: 8,
      message: "Password should be at least 8 characters.",
    },
    maxLength: {
      value: 20,
      message: "Password should be shorter than 20 characters.",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    // try {

    // }catch() {

    // }finally{}
    //   };
    console.log(data);
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
        // disabled={isLoading}
        error={errors.email}
        errors={errors}
        label="Email"
        required
        register={register}
      />
      <Input
        id="password"
        // disabled={isLoading}
        error={errors.password}
        errors={errors}
        label="Password"
        required
        register={register}
      />
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
      // disabled={isLoading}
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
