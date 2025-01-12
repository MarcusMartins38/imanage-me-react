import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import * as yup from "yup";
import SignUpImage from "../assets/sign_up_side_image.png";

type SubmitSignUpData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = yup.object({
  username: yup.string().required("Name is required").min(4),
  email: yup.string().required("E-mail is required").email("Invalid E-mail"),
  password: yup.string().required("Password is required").min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords need to be the same")
    .required(),
});

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleClickSubmit = async (data: SubmitSignUpData) => {
    const res = await fetch("http://localhost:3333/api/user/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.username,
        email: data.email,
        password: data.password,
      }),
    });

    if (res.ok) navigate("/login");
  };

  return (
    <main className="h-screen w-screen flex items-center">
      <section className="w-full max-w-[40%] px-4">
        <div className="m-auto max-w-104">
          <h3 className="text-2xl font-bold mb-2">Create an account</h3>
          <form
            onSubmit={handleSubmit(handleClickSubmit)}
            className="grid gap-y-2"
          >
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Username"
                {...register("username")}
              />
            </label>
            <span
              className={`mt-[-8px] text-[14px] text-red-600 ${errors.username?.message ? "" : "hidden"}`}
            >
              {errors.username?.message}
            </span>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...register("email")}
              />
            </label>
            <span
              className={`mt-[-8px] text-[14px] text-red-600 ${errors.email?.message ? "" : "hidden"}`}
            >
              {errors.email?.message}
            </span>{" "}
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                {...register("password")}
              />
            </label>
            <span
              className={`mt-[-8px] text-[14px] text-red-600 ${errors.password?.message ? "" : "hidden"}`}
            >
              {errors.password?.message}
            </span>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
            </label>
            <span
              className={`mt-[-8px] text-[14px] text-red-600 ${errors.confirmPassword?.message ? "" : "hidden"}`}
            >
              {errors.confirmPassword?.message}
            </span>
            <button className="btn" type="submit">
              Sign Up
            </button>
          </form>

          <div className="flex items-center mt-2">
            <span className="mr-2">Has an account?</span>
            <NavLink to="/login" className="link font-bold">
              Login
            </NavLink>
          </div>
        </div>
      </section>

      <img
        src={SignUpImage}
        className="max-w-[60%] w-full h-full"
        alt="Kitty using some screens"
      />
    </main>
  );
}

export default SignUp;
