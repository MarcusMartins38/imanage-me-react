import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  imageUrl: yup.string(),
  name: yup.string().required(),
  email: yup.string().required().email(),
});

function Settings() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleClickSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main>
      <Sidebar />
      <div
        className={`p-4 transition-all duration-300 flex items-center justify-center`}
        style={{
          width: isOpen ? `calc(100% - 256px)` : `calc(100% - 64px)`,
          marginLeft: isOpen ? "256px" : "64px",
        }}
      >
        <form
          onSubmit={(e) => handleClickSave(e)}
          className="w-full max-w-96 flex flex-col items-center justify-center gap-2"
        >
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>

          <label htmlFor="imgUrl" className="flex flex-col w-full">
            <span>Image Url</span>
            <input
              type="text"
              id="imgUrl"
              className="input input-bordered h-8"
              {...register("imageUrl")}
            />
          </label>
          <label htmlFor="name" className="flex flex-col w-full">
            <span>Name</span>
            <input
              type="text"
              id="name"
              className="input input-bordered h-8"
              {...register("name")}
            />
          </label>
          <label htmlFor="email" className="flex flex-col w-full">
            <span>Email</span>
            <input
              type="text"
              id="email"
              className="input input-bordered h-8"
              {...register("email")}
            />
          </label>
          <button className="btn mt-2" type="submit">
            Save
          </button>
        </form>
      </div>
    </main>
  );
}

export default Settings;
