import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      message: "Invalid email format",
    },
    onChange() {
      setError(null);
    },
  });

  //   ADD MORE VALIDATION
  register("password", {
    minLength: {
      value: 8,
      message: "Password is at least 8 characters",
    },
    maxLength: {
      value: 20,
      message: "Password is shorter than 20 characters",
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
        title="Welcome to ReviewGuru"
        subtitle="Create an account below!"
      />
      <div className="flex gap-4">
        <Input
          id="firstName"
          //   disabled={isLoading}
          error={errors.firstName}
          errors={errors}
          label="First Name"
          register={register}
          required
        />
        <Input
          id="lastName"
          //   disabled={isLoading}
          error={errors.lastName}
          errors={errors}
          label="Last Name"
          register={register}
          required
        />
      </div>
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
        error={error}
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
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
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
      // isOpen
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
