import { Fragment } from "react";
import { motion } from "framer-motion";
import DefaultLayout from "@/layouts/default";
import { SEO } from "@/components/SEO";
import { useI18n } from "@/hooks/useTranslations";

export default function ContactPage() {
    const { goodLabel } = useI18n();

    // Stagger container animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    // Item animation
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <DefaultLayout>
            <SEO
                breadcrumbs={[
                    { name: goodLabel("breadcrumbs_home"), item: "/" },
                    { name: goodLabel("breadcrumbs_contact"), item: "/contact" },
                ]}
                description={goodLabel("seo_contact_description")}
                title={goodLabel("seo_contact_title")}
            />

            {/* Hero Section */}
            <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat bg-fixed">
                <div className="absolute inset-0 bg-black/75" />
                <div className="relative z-10 text-center px-4 flex flex-col items-center gap-6">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <h1 className="text-5xl md:text-7xl font-cormorant text-white">
                            {goodLabel("contact_title")}
                        </h1>
                        <p className="text-lg md:text-xl font-lato text-gray-300 italic max-w-2xl">
                            {goodLabel("contact_subtitle")}
                        </p>
                    </motion.div>
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="h-[1px] w-24 bg-padre-primary origin-center" 
                    />
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="py-24 bg-padre-background px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    
                    {/* Left Column: Contact Cards */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-8 w-full"
                    >
                        <motion.h2 
                            variants={itemVariants}
                            className="text-padre-primary text-sm uppercase tracking-[0.2em] font-bold"
                        >
                            {goodLabel("contact")}
                        </motion.h2>

                        {/* Card 1: Address */}
                        <motion.div 
                            variants={itemVariants}
                            className="bg-[#262626] border border-white/5 p-8 rounded-sm shadow-xl flex items-start gap-6 hover:border-padre-primary/30 hover:scale-[1.02] hover:shadow-padre-primary/5 transition-all duration-300"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-padre-primary/10 border border-padre-primary/30 flex items-center justify-center text-padre-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-cormorant text-2xl text-white">{goodLabel("address")}</h3>
                                <div className="font-lato text-gray-400 text-lg leading-relaxed">
                                    <a 
                                        href="https://maps.app.goo.gl/upvp6fR7qbgHyYpP9" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="hover:text-padre-primary transition-colors focus:outline-none focus:text-padre-primary"
                                    >
                                        {goodLabel("address_line_1")}<br />{goodLabel("address_line_2")}
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2: Phone */}
                        <motion.div 
                            variants={itemVariants}
                            className="bg-[#262626] border border-white/5 p-8 rounded-sm shadow-xl flex items-start gap-6 hover:border-padre-primary/30 hover:scale-[1.02] hover:shadow-padre-primary/5 transition-all duration-300"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-padre-primary/10 border border-padre-primary/30 flex items-center justify-center text-padre-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-cormorant text-2xl text-white">{goodLabel("phone")}</h3>
                                <div className="font-lato text-gray-400 text-lg leading-relaxed">
                                    <a 
                                        href="tel:+33468324011" 
                                        className="text-padre-primary font-bold hover:underline focus:outline-none focus:underline"
                                    >
                                        04 68 32 40 11
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 3: Email */}
                        <motion.div 
                            variants={itemVariants}
                            className="bg-[#262626] border border-white/5 p-8 rounded-sm shadow-xl flex items-start gap-6 hover:border-padre-primary/30 hover:scale-[1.02] hover:shadow-padre-primary/5 transition-all duration-300"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-padre-primary/10 border border-padre-primary/30 flex items-center justify-center text-padre-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-cormorant text-2xl text-white">{goodLabel("email")}</h3>
                                <div className="font-lato text-gray-400 text-lg leading-relaxed">
                                    <a 
                                        href="mailto:elpadre.aude@gmail.com" 
                                        className="hover:text-padre-primary transition-colors focus:outline-none focus:text-padre-primary"
                                    >
                                        elpadre.aude@gmail.com
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 4: Hours */}
                        <motion.div 
                            variants={itemVariants}
                            className="bg-[#262626] border border-white/5 p-8 rounded-sm shadow-xl flex items-start gap-6 hover:border-padre-primary/30 hover:scale-[1.02] hover:shadow-padre-primary/5 transition-all duration-300"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-padre-primary/10 border border-padre-primary/30 flex items-center justify-center text-padre-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                <h3 className="font-cormorant text-2xl text-white">{goodLabel("hours")}</h3>
                                <div className="font-lato text-gray-400 text-sm w-full flex flex-col gap-2">
                                    <div className="grid grid-cols-[auto_auto_1fr] gap-x-3 gap-y-1.5 w-full">
                                        {[
                                            "footer_hours_lundi_jeudi",
                                            "footer_hours_vendredi",
                                            "footer_hours_weekend",
                                            "footer_hours_brunch"
                                        ].map((key) => {
                                            const label = goodLabel(key as Parameters<typeof goodLabel>[0]);
                                            const splitIndex = label.indexOf(":");
                                            const hasColon = splitIndex !== -1;
                                            const left = hasColon ? label.substring(0, splitIndex).trim() : label;
                                            const right = hasColon ? label.substring(splitIndex + 1).trim() : "";
                                            const isBrunch = key === "footer_hours_brunch";
                                            const textClass = isBrunch ? "text-xs opacity-75 mt-1" : "tracking-wide text-base";
                                            
                                            return (
                                                <Fragment key={key}>
                                                    <span className={`text-left font-medium text-white ${textClass}`}>{left}</span>
                                                    <span className={`text-center opacity-50 ${textClass}`}>{hasColon ? ":" : ""}</span>
                                                    <span className={`text-left ${textClass}`}>{right}</span>
                                                </Fragment>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Google Map */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col gap-8 w-full h-full"
                    >
                        <h2 className="text-padre-primary text-sm uppercase tracking-[0.2em] font-bold">
                            {goodLabel("contact_map_title")}
                        </h2>
                        <div className="relative w-full aspect-[4/3] min-h-[400px] md:min-h-[500px] rounded-sm overflow-hidden shadow-2xl border border-white/5 group">
                            <iframe
                                src="https://maps.google.com/maps?q=29%20Cours%20de%20la%20R%C3%A9publique,%2011100%20Narbonne&t=&z=16&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                title="El Padre Narbonne Location"
                                className="grayscale contrast-[1.1] opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 focus:outline-none"
                            />
                        </div>
                    </motion.div>

                </div>
            </section>
        </DefaultLayout>
    );
}
