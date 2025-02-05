import { UseFormRegister } from "react-hook-form";
import { cn } from "../lib/utils";

type SubTaskProps = {
  fieldName: string;
  defaultValue?: string;
  register: UseFormRegister<any>;
  className?: string;
  onRemoveClick?: () => void;
  isEdit?: boolean;
  checked?: boolean;
  status?: string;
  onChangeChecked?: () => void;
};

export default function SubTask({
  fieldName,
  defaultValue,
  register,
  className,
  onRemoveClick,
  checked,
  status,
  isEdit = true,
  onChangeChecked,
}: SubTaskProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="checkbox"
        onChange={onChangeChecked}
      />
      {isEdit ? (
        <input
          type="text"
          id={fieldName}
          className="input input-bordered h-8 w-full"
          defaultValue={defaultValue}
          {...register(fieldName)}
        />
      ) : (
        <span className={`${status === "COMPLETED" ? "line-through" : ""}`}>
          {defaultValue}
        </span>
      )}

      {isEdit && (
        <button
          onClick={onRemoveClick}
          className="btn bg-red-500 text-white hover:bg-red-600 min-h-0 min-w-0 p-0 h-6 w-6"
        >
          X
        </button>
      )}
    </div>
  );
}
