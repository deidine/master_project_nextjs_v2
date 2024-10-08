import {   DatePicker } from "antd";
import moment from "moment";
import {  useState } from "react";
import { LabelValue } from "./LabelValue";

export  function DateChoicePeriodInput({ element }: { element: any }) { 
    const [dates, setDates] = useState<{ [key: string]: string }>({
      start: "",
      end: "",
      current: "",
    });
    const handleDateChange = (
      date: moment.Moment | null,
      dateString: string,
      key: string
    ) => {
      setDates({ ...dates, [key]: dateString });
      updateElementPattern(key, dateString);
    };
  
    const updateElementPattern = (key: string, dateString: string) => {
      if (key === "start") {
        element.startDate = `${dateString}`;
      } else if (key === "end") {
        element.endDate = `${dateString}`;
      }  
    };
  
    return (
      <div>
          <LabelValue value="Date minimale" />
   
            <DatePicker
              placeholder="Select min date"
              value={element.startDate ? moment(element.startDate) : null} 
              
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              onChange={(date: moment.Moment, dateString: any) =>
                handleDateChange(date, dateString, "start")
              }
            />
          <LabelValue value="Date maximale" />
         
            <DatePicker
              placeholder="Select max date"
              value={element.endDate ? moment(element.endDate) : null} 
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              onChange={(date: moment.Moment, dateString: any) =>
                handleDateChange(date, dateString, "end")
              }

            /> 
      </div>
    );
  }
  