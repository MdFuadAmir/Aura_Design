import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaDribbble,
  FaBehance,
  FaDownload,
} from "react-icons/fa";
import CommonButton from "../../Shared/CommonButton";

const socials = [
  {
    id: 1,
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
    link: "#",
    handle: "@yourname",
    desc: "Professional Network",
  },
  {
    id: 2,
    name: "GitHub",
    icon: <FaGithub />,
    link: "#",
    handle: "@yourrepo",
    desc: "Open Source Projects",
  },
  {
    id: 3,
    name: "Twitter",
    icon: <FaTwitter />,
    link: "#",
    handle: "@yourhandle",
    desc: "Tech Thoughts",
  },
  {
    id: 4,
    name: "Instagram",
    icon: <FaInstagram />,
    link: "#",
    handle: "@yourlife",
    desc: "Behind the Scenes",
  },
  {
    id: 5,
    name: "Dribbble",
    icon: <FaDribbble />,
    link: "#",
    handle: "@yourdesign",
    desc: "Visual Explorations",
  },
  {
    id: 6,
    name: "Behance",
    icon: <FaBehance />,
    link: "#",
    handle: "@yourportfolio",
    desc: "Case Studies",
  },
];

const SocialConnect = () => {
  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">
              The Network
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-[#1a1a1a] dark:text-white tracking-tighter uppercase leading-[0.85]">
              Digital <br />
              <span className="text-emerald-500 italic">Presence.</span>
            </h2>
          </div>
          <p className="text-gray-400 dark:text-emerald-100/20 text-sm font-medium max-w-62 md:text-right">
            Follow my journey and stay updated with my latest experiments.
          </p>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socials.map((social, index) => (
            <motion.a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 bg-white dark:bg-[#061a12] rounded-4xl border border-emerald-500/5 hover:border-emerald-500/20 transition-all duration-500 overflow-hidden flex items-center justify-between "
            >
              {/* Background Glow Effect on Hover */}
              <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

              <div className="relative z-10 flex items-center  gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-[#0a2318] flex items-center justify-center text-2xl text-[#1a1a1a] dark:text-white group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-sm">
                  {social.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight">
                    {social.name}
                  </h3>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest opacity-60">
                    {social.handle}
                  </p>
                </div>
              </div>

              <div className="relative z-10 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
                <p className="text-[9px] font-black text-gray-400 dark:text-emerald-100/20 uppercase tracking-tighter text-right leading-none">
                  {social.desc.split(" ").join("\n")}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Interactive Bottom Bar */}
        <div className="mt-20 p-8 rounded-[2.5rem] bg-[#1a1a1a] dark:bg-emerald-500/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <h4 className="text-white text-sm font-bold uppercase tracking-[0.2em]">
            Searching for a developer?
          </h4>
          <a
            href="https://docs.google.com/document/d/12K2cXFu7bpCguwRwaytDKMEsww5fUsbcZP4UmAU-N6E/export?format=pdf"
            target="_blank"
            rel="noreferrer"
          >
            <CommonButton
              text="Download CV"
              iconLeft={FaDownload}
              className="rounded-full"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialConnect;
