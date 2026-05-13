import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    id: 1,
    question: "What is your typical project workflow?",
    answer: "My process is divided into three key phases: Discovery (understanding your goals), Design & Development (coding with a modern stack), and Delivery & Support. I keep you updated at every milestone to ensure alignment."
  },
  {
    id: 2,
    question: "How long does a typical project take?",
    answer: "The timeline depends on the project's complexity. Generally, a professional website takes 2 to 4 weeks. I prioritize quality and always aim to deliver ahead of the agreed deadline."
  },
  {
    id: 3,
    question: "Do you provide post-launch support?",
    answer: "Yes, absolutely! I provide 30 days of free technical support after handover to ensure everything runs smoothly. Long-term maintenance and update plans are also available upon request."
  },
  {
    id: 4,
    question: "What are your payment terms?",
    answer: "I usually work with a milestone-based payment system. A fixed upfront deposit is required to kickstart the project, with the remaining balance divided according to project milestones."
  }
];

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">
            Common Inquiries
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] dark:text-white tracking-tighter uppercase leading-tight">
            Frequently Asked <br />
            <span className="italic text-emerald-500">Questions.</span>
          </h2>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              className={`rounded-4xl border-2 transition-all duration-500 ${
                activeId === faq.id 
                ? 'bg-white dark:bg-[#061a12] border-emerald-500/20 shadow-xl shadow-emerald-500/5' 
                : 'bg-transparent border-emerald-500/5 hover:border-emerald-500/20'
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-8 py-7 flex items-center justify-between text-left outline-none"
              >
                <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                  activeId === faq.id ? 'text-emerald-500' : 'text-[#1a1a1a] dark:text-white'
                }`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                  activeId === faq.id ? 'bg-emerald-500 text-white rotate-180' : 'bg-emerald-500/10 text-emerald-500'
                }`}>
                  {activeId === faq.id ? <FaMinus size={10} /> : <FaPlus size={10} />}
                </div>
              </button>

              <AnimatePresence>
                {activeId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8">
                      <p className="text-gray-500 dark:text-emerald-100/40 font-medium leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;