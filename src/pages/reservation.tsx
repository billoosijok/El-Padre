import DefaultLayout from "@/layouts/default";
import { SEO } from "@/components/SEO";
import { BookingForm } from "@/components/BookingForm";
import { useI18n } from "@/hooks/useTranslations";

export default function ReservationPage() {
  const { goodLabel } = useI18n();

  return (
    <DefaultLayout>
      <SEO
        breadcrumbs={[
          { name: goodLabel("breadcrumbs_home"), item: "/" },
          { name: goodLabel("breadcrumbs_reservation"), item: "/reservation" },
        ]}
        description={goodLabel("seo_reservation_description")}
        title={goodLabel("seo_reservation_title")}
      />

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 text-center px-4 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-5xl md:text-7xl font-cormorant text-white">
              {goodLabel("reserve")}
            </h1>
            <p className="text-lg md:text-xl font-lato text-gray-300 italic max-w-2xl">
              {goodLabel("reservation_subtitle")}
            </p>
          </div>
          <div className="h-[1px] w-24 bg-padre-primary" />
        </div>
      </section>

      {/* Booking form */}
      <section className="py-20 bg-padre-background px-6">
        <div className="max-w-lg mx-auto bg-[#1a1a1a] border border-white/10 rounded-sm shadow-2xl px-6 py-10 sm:px-10">
          <BookingForm />
        </div>
      </section>
    </DefaultLayout>
  );
}
