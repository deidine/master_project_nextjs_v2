import React, { useState } from "react";
import { Tooltip } from "antd";
import {
  DeleteFilled,
  EditOutlined, 
} from "@ant-design/icons"; 
import { FiSidebar } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import useDesigner from "@/hooks/useDesigner";

export default function OptionPopUp({
  name,
  form,  
  toogleSidBar,removeElement
}: {
  toogleSidBar: () => void; 
  name: string;
  form: FormElement; 
  removeElement: (name: string) => void;
}) { 
  const {  setSelectedElement } = useDesigner();
  return (
    <div className="absolute right-4 flex space-x-2 opacity-0 group-hover:opacity-100"
    onClick={(e) => {
      e.stopPropagation(); 
     }}>
    
      {/* <Tooltip title="Open side bar">
        <Badge
          className="w-auto text-center h-6 hover:text-green-500 bg-white rounded-md"
          onClick={() => {
            toogleSidBar();
            setSelectedElement(form);
          }}
        >
 
          <FiSidebar />
        </Badge>
      </Tooltip> */}
      <Tooltip title="Edit Label">
        <Badge
          className="w-auto text-center hover:text-yellow-500 h-6 bg-white rounded-md"
          // onClick={(e: React.MouseEvent) => {
          //   e.stopPropagation();
          //   setIsEditing(!isEditing);
          
          //   setIsEditFormCard(JSON.stringify(!isEditing));
          //   localStorage.setItem("isEditing", JSON.stringify(!isEditing));
          //   setIsEditingState(!isEditing);
          // }}
          onClick={() => {
            toogleSidBar();
            setSelectedElement(form);
          }}
        >
          <EditOutlined />
        </Badge>
      </Tooltip>
      <Tooltip title="Delete">
        <Badge
          className="hover:text-red-500 bg-white rounded-md w-auto text-center h-6"
          onClick={() => {
            removeElement(name);
          }}
        >
          <DeleteFilled />
        </Badge>
      </Tooltip>
    </div>
  );
}
