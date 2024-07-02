import React, { useState, useRef } from "react";
import { Button, Select, Input } from "antd";
import { TagOutlined } from "@ant-design/icons";
import useDesigner from "../../hooks/useDesigner";
import OptionPopUp from "../OptionPopUp";

const { Option } = Select;

const SelectElement = ({
  element,
  setElement,
  index,
}: {
  index: number;
  element: SelectElement;
  setElement: (value: SelectElement) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>( element.pattern || [] );
  const [isRequired, setIsRequired] = useState(element.required);
  const [inputLabel, setInputLabel] = useState(element.label);
  const [options, setOptions] = useState(element.options || []);
  const [newOption, setNewOption] = useState("");
  const [selctPlacholder, setSelctPlacholder] = useState("select");
  const [showPatternSelect, setShowPatternSelect] = useState(false);
  
  const { removeElement } = useDesigner();

  const editButtonRef = useRef<HTMLDivElement>(null);
  const patternSelectWrapperRef = useRef(null);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLabel(e.target.value);
    setElement({ ...element, label: e.target.value });
  };

  const handlePatternChange = (value: string[]) => {
    setSelectedPatterns(value);
    setElement({ ...element, pattern: value });
    if (value.length === 0) {
      setShowPatternSelect(false);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    setElement({ ...element, options: updatedOptions });
  };

  const addNewOption = () => {
    if (newOption.trim() !== "") {
      const updatedOptions = [...options, newOption];
      setOptions(updatedOptions);
      setElement({ ...element, options: updatedOptions });
      setNewOption("");
    }
  };

  const removeOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    setElement({ ...element, options: updatedOptions });
  };

  const patternOptions = [
    { value: "required", label: element.required },
    { value: "norequired", label: element.required },
  ];

  return (
    <div
      key={index}
      ref={editButtonRef}
      className={`${
        isEditing ? "" : "hover:bg-slate-200"
      } flex flex-col relative justify-between w-full p-4 mb-2 border rounded shadow-sm group`}
    >
      <div className="flex flex-col">
        {isEditing ? (
          <input
            className="font-semibold mb-2 outline-none"
            value={inputLabel}
            onChange={handleLabelChange}
          />
        ) : (
          <>
            <span className="font-semibold mb-2">{inputLabel}</span>
            <div className="flex space-x-2 flex-row">
              <Button size="small">{element.type}</Button>
              <Button size="small">{selectedPatterns.join(", ")}</Button>
            </div>
          </>
        )}

        <OptionPopUp
          name={element.name}
          required={element.required}
          toggleRequired={() => {
            setElement({ ...element, required: !isRequired });
            setIsRequired(!isRequired);
          }}
          removeElement={(name: string) => {
            removeElement(name);
          }}
          isEditingSate={isEditing}
          setIsEditingState={(value: boolean) => {
            setIsEditing(value);
          }}
          isSelectElement={true}
          toggleIsMultiple={() => {
            setElement({ ...element, multiple: !element.multiple });
          }}
          isSelectMultiple={element.multiple}
        />

        {isEditing && (
          <>
            <Input
              placeholder="Select"
              value={selctPlacholder}
              onChange={(e) => {
                setElement({ ...element, placeholder: selctPlacholder });
                setSelctPlacholder(e.target.value);
              }}
              style={{ marginBottom: "8px" }}
            />

            <div className="w-full mb-1 rounded-md border-2 p-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Input
                    value={option}
                    onPressEnter={addNewOption}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    style={{ marginRight: "8px" }}
                  />
                  <Button onClick={() => removeOption(index)}>Remove</Button>
                </div>
              ))}
              <div className="w-full mb-1">
                <Input
                  placeholder="New option"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <Button className="w-full mb-1" onClick={addNewOption}>
                  Add Option
                </Button>
              </div>
            </div>

            <div className="w-full mb-1">
              {showPatternSelect ? (
                <Select
                  ref={patternSelectWrapperRef}
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select patterns"
                  value={selectedPatterns}
                  onChange={handlePatternChange}
                >
                  {patternOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              ) : (
                <Button
                  icon={<TagOutlined />}
                  size="small"
                  onClick={() => setShowPatternSelect(true)}
                >
                  Pattern
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectElement;
