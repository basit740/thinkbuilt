import Image from "next/image";

type ButtonProps = {
  type: "button" | "submit";
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({ type, title, icon, variant, full, disabled, onClick }: ButtonProps) => {
  return (
    <button
      className={`flexCenter gap-3 rounded-full border border-[rgba(255,255,255,0.6)] ${variant} ${
        full && "w-full"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <Image src={icon} alt={title} width={24} height={24} />}
      <label className="bold-16 whitespace-nowrap cursor-pointer">
        {title}
      </label>
    </button>
  );
};

export default Button;
