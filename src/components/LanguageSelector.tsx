import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Radio, RadioGroup, RadioProps } from "@heroui/radio";
import { Key, useCallback, useState } from "react";

import { RightArrow } from "./icons";

import { useI18n, type SupportedLanguages } from "@/hooks/useTranslations";
import { Logo } from "@/components/Logo";
import supported_languages from "@/config/supported_languages.json";

const doneLabel = {
  fr: "C'est parti",
  es: "Aquí vamos",
  en: "Done",
};

export const LanguageSelectorModal = ({
  isOpen,
  onSelectLanguage,
}: {
  isOpen: boolean;
  onSelectLanguage: (language: SupportedLanguages) => void;
}) => {
  const { onOpenChange } = useDisclosure();
  const [language, setLanguage] = useState<SupportedLanguages>();

  const onPressDone = useCallback(() => {
    onSelectLanguage(language as SupportedLanguages);
  }, [language]);

  return (
    <Modal
      hideCloseButton
      isOpen={isOpen}
      placement={"auto"}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <Logo size={70} />
            </ModalHeader>
            <ModalBody>
              <RadioGroup onValueChange={setLanguage as (val: string) => void}>
                {Object.entries(supported_languages).map(
                  ([lang, { name, icon, subtitle }]) => (
                    <LanguageRadio
                      key={lang}
                      description={subtitle}
                      value={lang}
                    >
                      <div className="flex flex-row gap-6">
                        <img
                          alt="icon"
                          aria-hidden="true"
                          src={`/${icon}`}
                          width={"25"}
                        />
                        <span>{name}</span>
                      </div>
                    </LanguageRadio>
                  ),
                )}
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              {language && (
                <Button
                  className="text-white"
                  color="primary"
                  isDisabled={!language}
                  onPress={onPressDone}
                >
                  {doneLabel[language]}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const StartImage = ({ src }: { src: string }) => {
  return <img alt="flag icon" src={`/${src}`} width="20" />;
};

export const LanguageSelectorDropdown = () => {
  const { language, setLanguage } = useI18n();

  const [isOpen, onOpenChange] = useState(false);

  const onSelect = useCallback((lang: Key) => {
    setLanguage(lang as SupportedLanguages);
  }, []);

  return (
    <Dropdown onOpenChange={onOpenChange}>
      <DropdownTrigger>
        <Button
          endContent={
            <RightArrow
              style={{
                transition: "transform 0.2s",
                transform: isOpen ? "rotateZ(270deg)" : "rotateZ(90deg)",
              }}
              width={10}
            />
          }
          size="sm"
          variant="flat"
        >
          <StartImage src={supported_languages[language].icon} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown menu with icons"
        selectedKeys={[language]}
        variant="faded"
        onAction={onSelect}
      >
        {Object.entries(supported_languages).map(([lang, { name, icon }]) => (
          <DropdownItem key={lang} startContent={<StartImage src={icon} />}>
            {name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export const LanguageRadio = (props: RadioProps) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: [
          "inline-flex m-0 bg-content2 hover:bg-content4 items-center justify-between",
          "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary data-[selected=true]:bg-content4",
        ].join(" "),
      }}
    >
      {children}
    </Radio>
  );
};
