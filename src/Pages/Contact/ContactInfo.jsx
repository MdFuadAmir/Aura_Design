import { motion } from "framer-motion";
import { FaEnvelope, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";

const contactLinks = [
  {
    id: 1,
    label: "Email",
    value: "mdfuadamir@gmail.com",
    icon: <FaEnvelope />,
    link: "mailto:mdfuadamir@gmail.com",
  },
  {
    id: 2,
    label: "WhatsApp",
    value: "+880 1705470131",
    icon: <FaWhatsapp />,
    link: "https://wa.me/8801705470131?text=Hi",
  },
  {
    id: 3,
    label: "LinkedIn",
    value: "in/mdfuadamir",
    icon: <FaLinkedinIn />,
    link: "https://linkedin.com/in/mdfuadamir",
  },
];

const ContactInfo = () => {
  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500 border-t border-emerald-500/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side: Title */}
          <div className="lg:col-span-4">
            <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">
              Quick Links
            </span>
            <h2 className="text-4xl font-black text-[#1a1a1a] dark:text-white tracking-tighter uppercase leading-none">
              Reach out <br />
              <span className="italic text-emerald-500">directly.</span>
            </h2>
            <p className="mt-8 text-sm font-medium text-gray-400 dark:text-emerald-100/20 max-w-xs leading-relaxed">
              Want to talk about ideas or have coffee? For any need, you can
              connect with me on the following channels.
            </p>
          </div>

          {/* Right Side: Interactive List */}
          <div className="lg:col-span-8">
            <div className="flex flex-col">
              {contactLinks.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  title={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative py-10 border-b border-emerald-500/10 flex flex-col md:flex-row md:items-center justify-between transition-all duration-500 overflow-hidden"
                >
                  {/* Hover Background Reveal */}
                  <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />

                  <div className="relative z-10 flex items-center gap-6">
                    <span className="text-xs font-black text-emerald-500 opacity-40 group-hover:opacity-100 transition-opacity">
                      0{item.id}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-black text-[#1a1a1a] dark:text-white tracking-tighter uppercase group-hover:translate-x-4 transition-transform duration-500">
                      {item.label}
                    </h3>
                  </div>

                  <div className="relative z-10 mt-4 md:mt-0 flex items-center gap-4 group-hover:-translate-x-4 transition-transform duration-500">
                    <span className="text-sm md:text-lg font-bold text-gray-400 dark:text-emerald-100/20 group-hover:text-emerald-500">
                      {item.value}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 dark:bg-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
