import { yupResolver } from "@hookform/resolvers/yup";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { data } from "react-router";
import * as yup from "yup";
import Sidebar from "../components/Sidebar";

const validationSchema = yup.object({
  profileImageFile: yup
    .mixed()
    .nullable()
    .test(
      "fileSize",
      "O arquivo é muito grande",
      (value) => !value || (value && value.size <= 3000000),
    ),
  name: yup.string().required(),
  email: yup.string().required().email(),
});

function Settings() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector((state) => state.user);
  const [cookies] = useCookies(["userAuth"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleClickSave = async () => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);

    if (data.profileImageFile) {
      formData.append("profileImageFile", data.profileImageFile[0]);
    }

    const response = await fetch("http://localhost:3333/api/user/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cookies.userAuth?.accessToken}`, // Inclua o token de autenticação
      },
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Perfil atualizado com sucesso!", result);
      // Atualize o estado global ou exiba uma mensagem de sucesso
    } else {
      console.log("Erro ao atualizar o perfil", result);
    }
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
          onSubmit={handleSubmit(handleClickSave)}
          className="w-full max-w-96 flex flex-col items-center justify-center gap-2"
        >
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img
                src={
                  user.imageUrl ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>

          <label htmlFor="imgUrl" className="flex flex-col w-full">
            <span>Image Url</span>
            <input
              type="file"
              id="imgUrl"
              className="file-input file-input-bordered h-8"
              {...register("profileImageFile")}
            />
          </label>
          <label htmlFor="name" className="flex flex-col w-full">
            <span>Name</span>
            <input
              type="text"
              id="name"
              defaultValue={user.name}
              className="input input-bordered h-8"
              {...register("name")}
            />
          </label>
          <label htmlFor="email" className="flex flex-col w-full">
            <span>Email</span>
            <input
              type="text"
              id="email"
              defaultValue={user.email}
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
