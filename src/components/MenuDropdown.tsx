import { Button } from "@heroui/button";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@heroui/dropdown";
import { Link } from "react-router-dom";
import { useI18n } from "@/hooks/useTranslations";
import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

export const MenuDropdown = ({ theme = "dark" }: { theme?: "light" | "dark" }) => {
    const { goodLabel, getLocalizedPath } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const isLight = theme === "light";

    return (
        <Dropdown
            onOpenChange={setIsOpen}
            classNames={{
                content: isLight
                    ? "bg-white border border-black/10 text-zinc-800 rounded-sm p-2 min-w-[200px]"
                    : "bg-black/90 border border-white/10 rounded-sm p-2 min-w-[200px]"
            }}
        >
            <DropdownTrigger>
                <Button
                    className={`bg-transparent uppercase tracking-[0.2em] text-xs font-bold font-lato hover:text-padre-primary transition-colors p-0 md:data-[hover=true]:bg-transparent ${isLight ? "text-zinc-700" : "text-white"}`}
                    disableRipple
                    endContent={
                        <ChevronDownIcon
                            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                            size={16}
                        />
                    }
                >
                    {goodLabel("menu")}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Menu Navigation" className="font-lato">
                <DropdownItem key="food" className={`${isLight ? "text-zinc-800" : "text-white"} hover:text-padre-primary uppercase tracking-widest text-xs py-3`} textValue={goodLabel("menu_tapas")}>
                    <Link to={getLocalizedPath("/menu")} className="w-full block h-full">
                        {goodLabel("menu_tapas")}
                    </Link>
                </DropdownItem>
                <DropdownItem key="brunch" className={`${isLight ? "text-zinc-800" : "text-white"} hover:text-padre-primary uppercase tracking-widest text-xs py-3`} textValue={goodLabel("brunch")}>
                    <Link to={getLocalizedPath("/brunch")} className="w-full block h-full">
                        {goodLabel("brunch")}
                    </Link>
                </DropdownItem>
                <DropdownItem key="cocktails" className={`${isLight ? "text-zinc-800" : "text-white"} hover:text-padre-primary uppercase tracking-widest text-xs py-3`} textValue={goodLabel("signature_cocktails")}>
                    <Link to={getLocalizedPath("/boissons#alcool-cocktails")} className="w-full block h-full">
                        {goodLabel("signature_cocktails")}
                    </Link>
                </DropdownItem>
                <DropdownItem key="vin" className={`${isLight ? "text-zinc-800" : "text-white"} hover:text-padre-primary uppercase tracking-widest text-xs py-3`} textValue={goodLabel("vin")}>
                    <Link to={getLocalizedPath("/boissons#vin-les-rouges")} className="w-full block h-full">
                        {goodLabel("vin")}
                    </Link>
                </DropdownItem>
                <DropdownItem key="drinks" className={`${isLight ? "text-zinc-800" : "text-white"} hover:text-padre-primary uppercase tracking-widest text-xs py-3`} textValue={goodLabel("boissons")}>
                    <Link to={getLocalizedPath("/boissons#alcool-beers")} className="w-full block h-full">
                        {goodLabel("boissons")}
                    </Link>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
