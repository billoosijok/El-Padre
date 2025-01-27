import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <img alt="logo of El Padre" src="./logo-animated.svg" />
        </div>
        <div>
          <p>À très bientôt ...</p>
        </div>
      </section>
    </DefaultLayout>
  );
}
