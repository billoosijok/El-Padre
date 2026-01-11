import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { useI18n } from "@/hooks/useTranslations";

interface ReservationContextType {
    openReservation: () => void;
    closeReservation: () => void;
    isOpen: boolean;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export function ReservationProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const { goodLabel } = useI18n();

    useEffect(() => {
        const handleHashChange = () => {
            setIsOpen(window.location.hash === "#reservation");
        };

        if (window.location.hash === "#reservation") {
            setIsOpen(true);
        }

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const openReservation = () => {
        if (window.location.hash !== "#reservation") {
            window.location.hash = "reservation";
        } else {
            setIsOpen(true);
        }
    };

    const closeReservation = () => {
        if (window.location.hash === "#reservation") {
            window.history.back();
        } else {
            setIsOpen(false);
        }
    };

    const onOpenChange = (open: boolean) => {
        if (open) {
            openReservation();
        } else {
            closeReservation();
        }
    };

    return (
        <ReservationContext.Provider value={{ openReservation, closeReservation, isOpen }}>
            {children}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="full"
                placement="center"
                backdrop="blur"
                classNames={{
                    base: "bg-[#1a1a1a] z-[60] text-white border border-white/10 relative z-[100] min-h-[80vh]",
                    header: "border-b border-white/10",
                    closeButton: "hover:bg-white/10 active:bg-white/20",
                    wrapper: "z-[60]",
                    backdrop: "z-[60]",
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-cormorant text-2xl">
                                {goodLabel("reserve")}
                            </ModalHeader>
                            <ModalBody className="p-0 overflow-hidden">
                                <iframe
                                    src="https://app.tableo.com/r/8BkhxG"
                                    className="w-full h-full border-none"
                                    title="Reservation"
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </ReservationContext.Provider>
    );
}

export function useReservation() {
    const context = useContext(ReservationContext);
    if (context === undefined) {
        throw new Error("useReservation must be used within a ReservationProvider");
    }
    return context;
}
