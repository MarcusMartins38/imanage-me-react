import { yupResolver } from "@hookform/resolvers/yup";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import * as yup from "yup";
import LoginImage from "../assets/login_side_image.webp";
import { updateUser } from "../slices/userSlice";

type SubmitSignInData = {
  email: string;
  password: string;
};

const validationSchema = yup.object({
  email: yup.string().required("E-mail is required").email("Invalid E-mail"),
  password: yup.string().required("Password is required").min(6),
});

function SignIn() {
  const dispatch = useDispatch();
  const [_, setCookie] = useCookies(["userAuth"]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleClickSubmit = async (data: SubmitSignInData) => {
    const response = await fetch("http://localhost:3333/api/user/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    if (!response.ok) throw new Error("Request it's not ok");
    const resJson = await response.json();

    setCookie("userAuth", resJson.data.accessToken, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas a partir de agora
    });
    dispatch(
      updateUser({
        name: resJson.data.user.name,
        email: resJson.data.user.email,
        imageUrl: resJson.data.user.imageUrl,
      }),
    );
    navigate("/tasks");
  };

  return (
    <main className="h-screen w-screen flex items-center justify-end">
      <img
        src={LoginImage}
        className="max-w-[60%] h-full"
        alt="Kitty using some screens"
      />

      <section className="w-full max-w-[40%] px-4">
        <div className="grid gap-y-2 m-auto max-w-104">
          <h3 className="text-2xl font-bold">Login</h3>
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
              className={`mt-[-6px] text-[14px] text-red-600 ${errors.email?.message ? "" : "hidden"}`}
            >
              {errors.email?.message}
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
                placeholder="Password"
                {...register("password")}
              />
            </label>
            <span
              className={`mt-[-6px] text-[14px] text-red-600 ${errors.password?.message ? "" : "hidden"}`}
            >
              {errors.password?.message}
            </span>

            <button className="btn" type="submit">
              Login
            </button>
          </form>
          <div className="flex items-center">
            <span className="mr-2">Not has an account yet?</span>
            <NavLink to="/sign-up" className="link font-bold">
              Sign Up
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignIn;
