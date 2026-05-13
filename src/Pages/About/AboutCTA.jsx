import { motion } from "framer-motion";
import { FaArrowRight, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router";
import CommonButton from "../../Shared/CommonButton";

const AboutCTA = () => {
  const navugate = useNavigate();
  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-[0.06] dark:opacity-[0.03] select-none pointer-events-none py-10">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-20 text-[15vw] font-black uppercase text-emerald-900 dark:text-white"
        >
          <span>Let's Create Magic Together — </span>
          <span>Let's Create Magic Together — </span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-emerald-600 dark:text-emerald-500 font-black text-xs uppercase tracking-[0.5em] mb-8 block">
            Got a vision?
          </span>

          <h2 className="text-5xl md:text-8xl font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-[0.9] mb-12">
            Let's Make It <br />
            <span className="text-emerald-500 italic">Visual.</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-emerald-100/40 font-medium leading-relaxed mb-16 max-w-2xl mx-auto">
            I am currently available for new projects and creative
            collaborations. Whether you have a question or just want to say hi,
            my inbox is always open.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <CommonButton
              text="Start A Project"
              onClick={() =>
                navugate("/contact", {
                  state: {
                    message: `Hi Aura Design Studio,

I’m interested in a graphic design project.

Project Type:
Preferred Style:
Timeline & Budget:

Please contact me to discuss the details.`,
                  },
                })
              }
              iconRight={FaArrowRight}
              className="rounded-full"
            />

            <div className="flex gap-4">
              <a
                href="mailto:mdfuadamir@gmail.com"
                className="w-16 h-16 rounded-full border border-emerald-500/20 dark:border-white/10 flex items-center justify-center text-[#1a1a1a] dark:text-white hover:bg-emerald-500 hover:text-white dark:hover:bg-white dark:hover:text-[#1a1a1a] transition-all"
                title="Email Me"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://wa.me/8801705470131?text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="w-16 h-16 rounded-full border border-emerald-500/20 dark:border-white/10 flex items-center justify-center text-[#1a1a1a] dark:text-white hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px]" />
    </section>
  );
};

export default AboutCTA;
