import React, { useState } from "react";
import { Button, Form, Slider } from "antd";
import useDesigner from "@/hooks/useDesigner";
import InputPrev from "./elementTypePreview/InputPrev";
import DatePrev from "./elementTypePreview/DatePrev";
import SelectPrev from "./elementTypePreview/SelectPrev";
import CheckBoxPrev from "./elementTypePreview/CheckBoxPrev";
import RadioPrev from "./elementTypePreview/RadioPrev"; 
import useStyle from "@/hooks/useStyle";
import LogoPrev from "./elementTypePreview/LogoPrev";
import HeadingTitlePrev from "./elementTypePreview/HeadingPrevTitle";
import HeadingPrev from "./elementTypePreview/ParagraphPrev";
import { Separator } from "@/components/ui/separator";
export default function PreviewformStyles( )  {
const  { formStyle,elementStyle,buttonStyle,paragraphStyle}=useStyle(); 
  const { elements, submitBtn } = useDesigner();
  const logoElement = elements.find(
    (element) => element.elementType.type === "logo"  
  );  const HeadTitleElement = elements.find(
    (element) => element.elementType.type === "headingTitle"
  );

  const getFormStyles = () => {
    return {
      paddingLeft: formStyle?.paddingX  ,
      paddingRight: formStyle?.paddingX  ,
      paddingTop: formStyle?.paddingY  ,
      paddingBottom: formStyle?.paddingY ,
      color: formStyle?.color, 
      border: formStyle?.border ,
      borderRadius: formStyle?.borderRadius ,
      backgroundColor: formStyle?.backgroundColor,
    };
  };

  const getButtonStyles = () => {
    return {
      paddingLeft: buttonStyle?.paddingX  ,
      paddingRight: buttonStyle?.paddingX  ,
      paddingTop: buttonStyle?.paddingY  ,
      paddingBottom: buttonStyle?.paddingY ,
      color: buttonStyle?.color, 
      border: buttonStyle?.border ,
      borderRadius: buttonStyle?.borderRadius ,
      backgroundColor: buttonStyle?.backgroundColor,
    };
  };

  return (
   
      <Form
        layout="vertical"
        className={`${"max-w-2xl -ml-44 justify-between  mt-3 bg-white border shadow rounded-xl w-1/2 h-full p-10 "}`}
        style={getFormStyles()}
      >
    
 {elements.length   === 0 &&    <div className=" text-center p-10 w-full text-md font-title"> 
   
   Aucun élément n’a encore été ajouté 
    </div>} 
      
        <div
            style={{ gap: logoElement?.elementType
              .headingLogGap+"px",justifyContent: logoElement?.elementType.headingLogJustify!,alignItems: logoElement?.elementType.headingLogJustify!  }}
            className={`flex flex-${logoElement?.elementType
              .headingLogFlex!}  justify-start pb-2`}
          >
        {logoElement?.elementType.type === "logo"  && (
          <LogoPrev
            element={logoElement}
            styleForm={  getFormStyles()}
          />
        )}
        { HeadTitleElement?.elementType.type === "headingTitle" && (
          <HeadingTitlePrev   element={HeadTitleElement}
          styleForm={ elementStyle}/>)
        }
        </div>
         
        {elements.map((element: any, index) => (
          <div key={index}>
             {[
              "text",
              "number",
              "email",
              "password",
              "file",
              "textarea",
              "url",
            ].includes(element.elementType.type) && (
              <InputPrev styleForm={elementStyle} element={element} />
            )}

            {["datetime-local", "date"].includes(element.elementType.type) && (
              <DatePrev styleForm={elementStyle} element={element} />
            )}

            {element.elementType.type === "time" && (
              <DatePrev styleForm={elementStyle} element={element} isTime={true} />
            )}

            {element.elementType.type === "select" && (
              <SelectPrev styleForm={elementStyle} element={element} />
            )}
            {element.elementType.type === "select_multiple" && (
              <SelectPrev styleForm={elementStyle} element={element} isMultiple={true} />
            )}
            {element.elementType.type === "checkbox" && (
              <CheckBoxPrev styleForm={elementStyle} element={element} />
            )}
            {element.elementType.type === "radio" && (
              <RadioPrev styleForm={elementStyle} element={element} />
            )}
                {element.elementType.type === "paragraph" && (
              <HeadingPrev
                             element={element}
                 styleParagraph={paragraphStyle}
              />
            )}
               {element.elementType.type === "divider" && (
              <Separator
              orientation="vertical"
              decorative
              className={`   `}
              style={{height: element.elementType.heightDivider+"px"}}
              />
            )} 
          </div>
        ))}

        <div className="flex justify-center pt-6">
          <Button
            type="primary"
            htmlType="submit"
            className="h-10 font-bold  w-1/2"
            style={getButtonStyles()}
          >
            {submitBtn}
          </Button>
        </div>
      </Form> 
  );
}
