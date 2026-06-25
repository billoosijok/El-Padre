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
import labels from "@/config/labels.json";
import supported_languages from "@/config/supported_languages.json";

const doneLabel = labels.action_done;

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
                          loading="lazy"
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
  return <img alt="" aria-hidden="true" src={`/${src}`} width="20" />;
};

export const LanguageSelectorDropdown = ({ theme = "dark" }: { theme?: "light" | "dark" }) => {
  const { language, setLanguage, goodLabel } = useI18n();
  const isLight = theme === "light";

  const [isOpen, onOpenChange] = useState(false);

  const onSelect = useCallback((lang: Key) => {
    setLanguage(lang as SupportedLanguages);
  }, []);

  return (
    <Dropdown
      onOpenChange={onOpenChange}
      classNames={{
        content: isLight
          ? "bg-white border border-black/10 text-zinc-800 rounded-sm p-2 min-w-[150px]"
          : "bg-black/90 border border-white/10 text-white rounded-sm p-2 min-w-[150px]"
      }}
    >
      <DropdownTrigger>
        <Button
          aria-label={goodLabel("select_language")}
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
          className={isLight ? "bg-black/5 text-zinc-800" : "bg-white/10 text-white"}
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
          <DropdownItem
            key={lang}
            className={isLight ? "text-zinc-800 hover:text-padre-primary" : "text-white hover:text-padre-primary"}
            startContent={<StartImage src={icon} />}
          >
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
