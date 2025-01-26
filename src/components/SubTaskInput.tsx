import { UseFormRegister } from "react-hook-form";
import { cn } from "../lib/utils";

type SubTaskProps = {
  fieldName: string;
  value?: string;
  register: UseFormRegister<any>;
  className?: string;
  onRemoveClick: () => void;
};

export default function SubTaskInput({
  fieldName,
  value,
  register,
  className,
  onRemoveClick,
}: SubTaskProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <input type="checkbox" checked readOnly className="checkbox" />
      <button
        onClick={onRemoveClick}
        className="btn bg-red-500 text-white hover:bg-red-600 min-h-0 min-w-0 p-0 h-6 w-6"
      >
        X
      </button>
      <input
        type="text"
        id={fieldName}
        className="input input-bordered h-8 w-full"
        defaultValue={value}
        {...register(fieldName)}
      />
    </div>
  );
}
