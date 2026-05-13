import { Link } from "react-router";
import { FaSpinner } from "react-icons/fa";

const CommonButton = ({
  text = "View Works",
  to = null,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  iconLeft: IconLeft = null,
  iconRight: IconRight = null,
  variant = "primary",
  className = "",
}) => {
  const baseStyles = `group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

  const variants = {
    primary: "bg-[#1a1a1a] dark:bg-emerald-600 text-white",
    outline:
      "bg-transparent border border-gray-800 text-gray-800 dark:border-emerald-500 dark:text-emerald-500 hover:text-white",
    white:
      "bg-white text-black border border-gray-200 dark:bg-[#04120c] dark:text-white dark:border-emerald-500/20",
  };

  const hoverBg = {
    primary: "bg-emerald-700",
    outline: "bg-emerald-600",
    white: "bg-emerald-600/50",
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <FaSpinner className="animate-spin text-lg" />
        ) : (
          <>
            {IconLeft && (
              <IconLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            )}
            {text}
            {IconRight && (
              <IconRight className="group-hover:translate-x-1 transition-transform duration-300" />
            )}
          </>
        )}
      </span>
      <div
        className={`absolute inset-0 ${hoverBg[variant]} translate-y-full group-hover:translate-y-0 transition-transform duration-300`}
      />
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={`${baseStyles} ${variants[variant]}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {content}
    </button>
  );
};

export default CommonButton;
