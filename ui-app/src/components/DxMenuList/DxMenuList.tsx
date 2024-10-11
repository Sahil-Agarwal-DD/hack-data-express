import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

type DxMenuListItem = {
  label: string;
};

type DxMenuListProps = {
  menuItems: DxMenuListItem[];
  onOptionClick: (menuItem: DxMenuListItem) => void;
  children: React.ReactNode;
  selectedOption?: DxMenuListItem;
};

export const DxMenuList: React.FC<DxMenuListProps> = ({
  selectedOption,
  menuItems,
  onOptionClick,
  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const options = React.useMemo(
    () => menuItems.map((v) => v.label),
    [menuItems]
  );
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    onOptionClick(menuItems[index]);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div onClick={handleClickListItem}>{children}</div>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={selectedOption?.label === option}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
