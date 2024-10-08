import { Form, Radio } from 'antd'
import React from 'react'

export default function RadioPrev(
    {
        element,
          styleForm,
    }: {
        element: FormElement;
          styleForm?: FormStyle;
    }
) {
  const getInputStyles = () => {
    return {
      paddingLeft: styleForm?.paddingX  || '8px',
      paddingRight: styleForm?.paddingX  || '8px',
      paddingTop: styleForm?.paddingY  || '8px',
      paddingBottom: styleForm?.paddingY || '8px',
      color: styleForm?.color, 
      border: styleForm?.border ,
      borderRadius: styleForm?.borderRadius ,
      // backgroundColor: styleForm?.backgroundColor,
    };
  };
  const getInputStyles2 = () => {
    return { 
      color: styleForm?.color, 
      border: styleForm?.border ,
      borderRadius: styleForm?.borderRadius ,
          };
  };
  const getLabelStyles = () => {
    return {
     
      color: styleForm?.color, 
      fontSize:  '16px', 
      fontWeight: 'bold',
      fontFamily: 'sans-serif',
      fontStyle: 'bold',

    
    };
  };

  return (
    <div>
             <Form.Item
 label={<span style={getLabelStyles()} >{element.elementType.label}</span>}
 labelCol={{ span: 24 }} // Adjust label width, or remove for default
              name={element.elementType.name}
              style={{ marginBottom: "10px" }}
              rules={[
                {
                  required: element.elementType.required,
                  message: `${element.elementType.label} is required`,
                },
              ]}
            >
              <Radio.Group
              style={getInputStyles()}
              >
                {element.elementType.options!.map(
                  (option: any, idx: number) => (
                    <div key={idx} className="flex  items-center">
                      <Radio 
              style={getInputStyles2()}
              value={option}>{option}</Radio>
                    </div>
                  )
                )}
              </Radio.Group>
            </Form.Item>
    </div>
  )
}
