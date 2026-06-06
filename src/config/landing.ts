const isMenuPath = (path: string) => {
  const clean = path.replace(/\/$/, "");

  return clean === "/menu" || clean === "/en/menu" || clean === "/es/menu";
};

export const initialPathname = window.location.pathname;
export const isEntryOnMenu = isMenuPath(initialPathname);

let hasSelectedMenuOption = false;

export const setMenuOptionSelected = (selected: boolean) => {
  hasSelectedMenuOption = selected;
  window.dispatchEvent(
    new CustomEvent("menu-option-selected-change", { detail: selected }),
  );
};

export const getMenuOptionSelected = () => {
  return hasSelectedMenuOption;
};
