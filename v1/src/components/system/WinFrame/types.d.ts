export type MenuItem = {
  label: string;
  onClick?: () => void;
  subMenu?: MenuItem[];
};

export type MenuConfig = Record<string, MenuItem>;
