import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, Tooltip } from "antd";
import { MoreOutlined, EditOutlined } from "@ant-design/icons";

export default function OptionPopUp({
  
  name, 
  removeElement,
  isEditingSate,
  setIsEditingState,
  isSelectElement,
  toggleIsMultiple,
  isSelectMultiple,
}: {
  
  isEditingSate: boolean;
  isSelectElement?: boolean;
  isSelectMultiple?: boolean;
  name: string;
  setIsEditingState: (value: boolean) => void; 
  toggleIsMultiple?: (required: boolean) => void;
  removeElement: (name: string) => void;
}) { 
  const [isSelectMultipleOption, setIsSelectMultipleOption] = useState(isSelectMultiple);
  const [isEditing, setIsEditing] = useState(isEditingSate);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          onClick={() => {
            removeElement(name);
          }}
        >
          {" "}
          delete item
        </button>
      ),
    },
    
    ...(isSelectElement
      ? [
          {
            key: "3",
            label: (
              <div className="flex items-center justify-between hover:bg-zinc-100 rounded-lg px-1 py-1">
                <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal flex-1 text-zinc-600">
                  Select Multiple {"   "}
                </label>
                <button
                  onClick={() => {
                    toggleIsMultiple!(isSelectMultipleOption!);
                    setIsSelectMultipleOption(!isSelectMultipleOption);
                  }}
                  type="button"
                  role="switch"
                  aria-checked={isSelectMultipleOption}
                  data-state={isSelectMultipleOption ? "checked" : "unchecked"}
                  value="on"
                  className="peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-zinc-900 data-[state=unchecked]:bg-zinc-200 dark:focus-visible:ring-zinc-300 dark:focus-visible:ring-offset-zinc-950 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=unchecked]:bg-zinc-800 h-5 w-10"
                  id="isSelectMultipleOption"
                >
                  <span
                    data-state={isSelectMultipleOption ? "checked" : "unchecked"}
                    className="pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-zinc-950 h-4 w-4"
                  ></span>
                </button>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="absolute right-4 flex space-x-2 opacity-0 group-hover:opacity-100">
      <Tooltip title="Edit Label">
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            setIsEditing(!isEditing);
            setIsEditingState(!isEditing);
          }}
          size="small"
        />
      </Tooltip>
      <Tooltip title="More options">
        <Dropdown
          menu={{ items: menuItems }}
          placement="bottom"
          visible={dropdownVisible} // Controlled visibility
          onVisibleChange={(visible) => setDropdownVisible(visible)}
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} size="small" />
        </Dropdown>
      </Tooltip>
    </div>
  );
}
