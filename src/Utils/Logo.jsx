import { useNavigate, useLocation } from "react-router";

const Logo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      window.scrollTo(0, 0);
    }
  };

  return (
    <div
      onClick={handleLogoClick}
      className="cursor-pointer group flex items-center gap-2 select-none relative"
    >
      {/* টেক্সট অংশ */}
      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-none flex items-center">
          <span className="text-[#020a07] dark:text-white transition-colors duration-300">
            AURA
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 italic ml-0.5">
            DESIGN
          </span>
        </h1>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="h-px w-4 bg-emerald-500/50" />
          <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-gray-500 dark:text-emerald-100/30">
            Creative Agency
          </span>
        </div>
      </div>

      <div className="absolute -inset-2 bg-emerald-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </div>
  );
};

export default Logo;
