import React, { MouseEventHandler } from "react";
import { Badge } from "../../ui/badge";
import {
  inputTypeOptions,
  patternOptions,
  selectTypeOptions,
  dateInputs,
  otherTypes,
} from "@/data/data";
import { Badge as AntBadge } from "antd";

export default function BadgeElement({
  element,
  onClick,
}: {
  onClick?: MouseEventHandler;
  element: SelectElement | InputElement;
}) {
  const combinedList: InputTypeList[] = [
    ...selectTypeOptions,
    ...inputTypeOptions,
    ...otherTypes,
    ...dateInputs,
  ];
  const elementType: InputTypeList[] = combinedList.filter(
    (option) => option.value === element.type
  );
  const elementPattern = patternOptions.find(
    (option) => option.pattern === element.pattern
  );
  return (
    <div className="flex flex-col    w-full font-bold text-lg h-auto overflow-hidden">
      <div className="flex flex-col justify-start items-start pb-4">
        {element.label}
        <span className="text-sm text-gray-500">{element.type === "paragraph" ?"":element.placeholder }</span>
      </div>
      <div className="flex flex-col w-full items-start space-y-2">
        <div
          className="flex flex-col gap-2 w-full items-start"
          onClick={onClick}
        >
          <div className="flex gap-2 flex-wrap"></div>
          <div className="flex flex-wrap gap-2">
            {elementPattern && (
              <div className="flex flex-wrap gap-2">
                <Badge
                  className="border hover:outline-none  flex items-center gap-2"
                  style={{
                    backgroundColor: elementPattern?.bgColor,
                    color: elementPattern?.textColor,
                  }}
                >
                  {elementPattern?.icon &&
                    React.createElement(elementPattern?.icon)}
                  {elementPattern?.value}
                </Badge>
              </div>
            )}

            <AntBadge
              style={{
                backgroundColor: elementType[0].bgColor,
                color: "black",
              }}
              count={
                element.options && element.options?.length !== 0
                  ? element.options && element.options.length
                  : 0
              }
            >
              <Badge
                className=" shadow-lg z-10 rounded-lg hover:outline-none h-8 text-[13px] font-semibold border-2 flex items-center gap-2"
                style={{
                  backgroundColor: elementType[0].bgColor,
                  color: elementType[0].textColor,
                }}
              >
                {elementType[0].icon &&
                  React.createElement(elementType[0].icon)}
                {element.type}
              </Badge>
            </AntBadge>
            <div className="pl-4">
              {element.required && (
                <Badge
                  variant={"destructive"}
                  className=" shadow-lg  z-10 rounded-lg text-black border-[#36b3fa] hover:outline-none h-8 text-[13px] font-semibold border-2 flex items-center gap-2"
                >
                  Required
                </Badge>
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
