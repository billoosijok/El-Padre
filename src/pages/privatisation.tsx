import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
import { useI18n } from "@/hooks/useTranslations";
import { useReservation } from "@/context/ReservationContext";

export default function PrivatisationPage() {
    const { goodLabel } = useI18n();
    const { openReservation } = useReservation();

    return (
        <DefaultLayout>
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat bg-fixed">
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative z-10 text-center px-4 flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center gap-4 mb-4">
                        <h1 className="text-5xl md:text-7xl font-cormorant text-white">
                            {goodLabel("privatisation")}
                        </h1>
                        <p className="text-xl md:text-2xl font-lato text-gray-300 italic">
                            {goodLabel("privatisation_subtitle")}
                        </p>
                    </div>
                    <div className="h-[1px] w-24 bg-padre-primary" />
                </div>
            </section>

            {/* Basement Salle Section */}
            <section className="py-24 bg-padre-background px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="text-center md:text-left">
                        <h3 className="text-padre-primary text-sm uppercase tracking-[0.2em] mb-4 font-bold">
                            {goodLabel("privatisation")}
                        </h3>
                        <h2 className="text-4xl md:text-5xl font-cormorant text-white mb-8 leading-tight">
                            {goodLabel("private_events")}
                        </h2>
                        <div className="w-24 h-[1px] bg-padre-primary mx-auto md:mx-0 mb-8" />
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 font-lato">
                            {goodLabel("privatisation_description")}
                        </p>
                        <div className="flex justify-center md:justify-start gap-6">
                            <Button
                                className="btn-ghost px-12 py-6 text-lg hover:scale-105 transition-transform"
                                onPress={openReservation}
                                variant="bordered"
                            >
                                {goodLabel("contact")}
                            </Button>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="aspect-[4/3] bg-[url('/assets/salle-en-bas.JPG')] bg-cover bg-center rounded-sm shadow-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-padre-primary hidden md:block" />
                        <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-padre-primary hidden md:block" />
                    </div>
                </div>

                {/* Additional Images Gallery */}
                <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        "/assets/salle/DSC04163.JPG",
                        "/assets/salle/DSC04171.JPG",
                        "/assets/salle/DSC04173.JPG"
                    ].map((src, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-sm shadow-lg aspect-[4/3]"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${src}')` }}
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Special Menu Section */}
            <section className="py-24 bg-[#111111] px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-padre-primary text-sm uppercase tracking-[0.2em] mb-4 font-bold">
                        {goodLabel("stats_authentic")}
                    </h3>
                    <h2 className="text-4xl md:text-5xl font-cormorant text-white mb-8 leading-tight">
                        {goodLabel("special_menu_title")}
                    </h2>
                    <div className="w-24 h-[1px] bg-padre-primary mx-auto mb-8" />
                    <p className="text-gray-400 text-lg leading-relaxed mb-10 font-lato">
                        {goodLabel("special_menu_desc")}
                    </p>
                    <Button
                        className="btn-ghost px-10 py-4 text-sm hover:scale-105"
                        onPress={openReservation}
                        variant="bordered"
                    >
                        {goodLabel("start_planning")}
                    </Button>
                </div>
            </section>
        </DefaultLayout>
    );
}
