import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n } from "@/hooks/useTranslations";
import { Button } from "@heroui/button";

interface MenuSelectorProps {
  onChooseRegular: () => void;
  onChooseBrunch: () => void;
  brunchUrl: string;
}

export const MenuSelector = ({
  onChooseRegular,
  onChooseBrunch,
  brunchUrl,
}: MenuSelectorProps) => {
  const { goodLabel } = useI18n();

  return (
    <div className="fixed inset-0 z-[70] bg-black w-screen h-screen flex flex-col md:flex-row overflow-hidden font-lato">
      {/* Left Option: Brunch */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onClick={() => {
          onChooseBrunch();
          window.location.assign(brunchUrl);
        }}
        className="relative flex-1 h-[50vh] md:h-full group cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/10"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] ease-out group-hover:scale-105"
          style={{ backgroundImage: "url('/assets/brunch.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/45 transition-colors duration-500 z-10" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20 gap-6 mt-16 md:mt-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-cormorant text-white uppercase tracking-wider group-hover:text-padre-primary transition-colors font-bold">
            {goodLabel("brunch")}
          </h2>
          <div className="flex flex-col items-center gap-1 mt-2 mb-4">
            <span className="text-padre-primary font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
              {goodLabel("les horaires")}
            </span>
            <span className="text-white text-xs md:text-sm font-medium tracking-wider">
              {goodLabel("selector_brunch_hours")}
            </span>
          </div>
          <Button
            as={Link}
            to={brunchUrl}
            className="bg-transparent border border-white text-white group-hover:bg-white group-hover:text-black font-bold uppercase tracking-widest text-xs py-3 px-8 rounded-none transition-all duration-300 hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              onChooseBrunch();
            }}
          >
            {goodLabel("selector_view_brunch")}
          </Button>
        </div>
      </motion.div>

      {/* Right Option: Classic Menu */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onClick={onChooseRegular}
        className="relative flex-1 h-[50vh] md:h-full group cursor-pointer overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] ease-out group-hover:scale-105"
          style={{ backgroundImage: "url('/plats.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/45 transition-colors duration-500 z-10" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20 gap-6 mt-16 md:mt-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-cormorant text-white uppercase tracking-wider group-hover:text-padre-primary transition-colors font-bold">
            {goodLabel("menu_tapas")}
          </h2>
          <div className="flex flex-col items-center gap-1 mt-2 mb-4">
            <span className="text-padre-primary font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
              {goodLabel("les horaires")}
            </span>
            <span className="text-white text-xs md:text-sm font-medium tracking-wider">
              {goodLabel("selector_classic_hours")}
            </span>
          </div>
          <Button
            className="bg-transparent border border-white text-white group-hover:bg-white group-hover:text-black font-bold uppercase tracking-widest text-xs py-3 px-8 rounded-none transition-all duration-300 hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              onChooseRegular();
            }}
          >
            {goodLabel("selector_view_classic")}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
