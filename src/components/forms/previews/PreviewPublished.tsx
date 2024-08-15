import React from 'react'

import {  Button,  Form } from "antd";
import { useSearchParams } from 'next/navigation' 
import SelectPrev from "@/components/forms/previews/elementTypePreview/SelectPrev";
import CheckBoxPrev from "@/components/forms/previews/elementTypePreview/CheckBoxPrev";
import DatePrev from "@/components/forms/previews/elementTypePreview/DatePrev";
import InputPrev from "@/components/forms/previews/elementTypePreview/InputPrev";
import RadioPrev from "@/components/forms/previews/elementTypePreview/RadioPrev";
export default function PreviewPublished({
    form,onFinish}: {
    form: Form,onFinish: (values: any) => void}) {
  return (
  <Form
    onFinish={onFinish}
    layout="vertical" // Set the layout to vertical
    className={ 
         "mt-3 flex flex-col  justify-center mx-auto bg-white border shadow rounded-xl w-1/2 h-auto p-10 "
        
     }
     style={form.style!}
  >
  <span className="text-md font-semibold"> {form!.content.length==0 && "No elements to Preview"}</span> 

    {form!.content.map((element: any, index) => (
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
       <InputPrev styleForm={form.elementStyle} element={element} />
     )}

     {["datetime-local", "date"].includes(element.elementType.type) && (
       <DatePrev styleForm={form.elementStyle} element={element} />
     )}

     {element.elementType.type === "time" && (
       <DatePrev styleForm={form.elementStyle} element={element} isTime={true} />
     )}

     {element.elementType.type === "select" && (
       <SelectPrev styleForm={form.elementStyle} element={element} />
     )}
     {element.elementType.type === "select_multiple" && (
       <SelectPrev styleForm={form.elementStyle} element={element} isMultiple={true} />
     )}
     {element.elementType.type === "checkbox" && (
       <CheckBoxPrev styleForm={form.elementStyle} element={element} />
     )}
     {element.elementType.type === "radio" && (
       <RadioPrev styleForm={form.elementStyle} element={element} />
     )}
   </div>
    ))}
    <div className="flex justify-center pt-6">
   
        <Button
          type="primary"
          htmlType="submit"
          className="h-10 font-bold py-2 px-4 w-1/2"
        >
          submit 
        </Button>

    </div>

  </Form>
  )
}
