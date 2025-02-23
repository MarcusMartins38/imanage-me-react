import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { updateUser } from "../redux/slices/userSlice";
import { api } from "../lib/api";
import { UserT } from "../lib/type";
import { RootState } from "../redux/store";

type EditedUserSaveT = Omit<UserT, "id"> & {
    profileImageFile: File[];
};

const validationSchema = yup.object({
    profileImageFile: yup
        .mixed()
        .nullable()
        .test("fileSize", "O arquivo é muito grande", (file) => {
            return file[0] && file[0].size <= 3000000;
        }),
    name: yup.string().required(),
    email: yup.string().required().email(),
});

function Settings() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleClickSave = async (data: EditedUserSaveT) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);

        if (data.profileImageFile[0]) {
            formData.append("profileImageFile", data.profileImageFile[0]);
        }

        const response = await api.put("/user/profile", formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });

        dispatch(
            updateUser({
                imageUrl: response.data.user.imageUrl,
                email: response.data.user.email,
                name: response.data.user.name,
            }),
        );
    };

    return (
        <div
            className={`p-4 transition-all duration-300 flex items-center justify-center`}
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

                <label
                    htmlFor="profileImageFile"
                    className="flex flex-col w-full"
                >
                    <span>Profile Image</span>
                    <input
                        id="profileImageFile"
                        type="file"
                        className="file-input file-input-bordered w-full"
                        {...register("profileImageFile")}
                    />
                    <span
                        className={`mt-[-8px] text-[14px] text-red-600 ${errors.name?.message ? "" : "hidden"}`}
                    >
                        {errors.profileImageFile?.message}
                    </span>
                </label>

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
                        placeholder="Name"
                        defaultValue={user.name}
                        {...register("name")}
                    />
                </label>
                <span
                    className={`mt-[-8px] text-[14px] text-red-600 ${errors.name?.message ? "" : "hidden"}`}
                >
                    {errors.name?.message}
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
                        defaultValue={user.email}
                        {...register("email")}
                    />
                </label>
                <button className="btn mt-2" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

export default Settings;
