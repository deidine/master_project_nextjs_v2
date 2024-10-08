// DesignerContext.tsx
"use client";

import { lnaguageGenerator } from "@/data/data";
import { openNotification } from "@/utils/utils";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useRef, useState } from "react";

type DesignerContextType = {
  elements: FormElement[];
  setElements: Dispatch<SetStateAction<FormElement[]>>;

  addElement: (index: number, element: FormElement) => void;
  removeElement: (id: string) => void;
  setSubmitBtn: (value: string) => void;
  submitBtn: string;
  setCodeForLanguage: (value: string) => void;
  codeForLanguage: string;
  selectedElement: FormElement | null;
  setSelectedElement: Dispatch<SetStateAction<FormElement | null>>;
 
  updateElement: (name: string, element: SelectElement | InputElement) => void;
  undo: () => void;
  redo: () => void;
  redoStack: FormElement[][];
  undoStack: FormElement[][];
  copyElement: (id: string) => void;
  duplicateElement: (index: number, id: string) => void;
  cutElement: (id: string) => void;
  isSidebarVisible:boolean; setIsSidebarVisible:(value: boolean) => void;
  pasteElement: (index: number) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<FormElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<FormElement | null>(null);
  const [submitBtn, setSubmitBtn] = useState<string>("Submit");
  const [codeForLanguage, setCodeForLanguage] = useState<string>( lnaguageGenerator[0].label);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); 
  const undoStack = useRef<FormElement[][]>([]);
  const redoStack = useRef<FormElement[][]>([]);
  const copiedElement = useRef<FormElement | null>(null);

  const addElement = (index: number, element: FormElement) => {
  
    setElements((prev) => {
      undoStack.current.push(prev);
      redoStack.current = [];
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };
  

  const removeElement = (name: string) => {
    setElements((prev) => {
      undoStack.current.push(prev);
      redoStack.current = [];
      return prev.filter((element) => element.elementType.name !== name);
    });
    openNotification("topRight",'success', 'Élément supprimé', `Élément ${elements.filter((el) => el.elementType.name === name)[0].elementType.label} supprimé avec succès`);
  };

  const updateElement = (name: string, element: SelectElement | InputElement) => {
    const updatedElements = [...elements];
     
    setElements((prev) => {
      undoStack.current.push(prev);
      redoStack.current = [];
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.elementType.name === name);
      updatedElements[index].elementType = element;
      
      setElements(updatedElements);
      return newElements;
    });
  };

  const undo = () => {
    setElements((prev) => {
      if (undoStack.current.length > 0) {
        redoStack.current.push(prev);
        return undoStack.current.pop() as FormElement[];
      }
      return prev;
    });
  };

  const redo = () => {
    setElements((prev) => {
      if (redoStack.current.length > 0) {
        undoStack.current.push(prev);
        return redoStack.current.pop() as FormElement[];
      }
      return prev;
    });
  };

  const copyElement = (name: string) => {
    const element = elements.find((el) => el.elementType.name === name);
    if (element) {
      copiedElement.current = { ...element };
    }
  };

  const duplicateElement = (index: number, name: string) => {
    const element = elements.find((el) => el.elementType.name === name);
    if (element) {
      addElement(index, { ...element });
    }
  };

  const cutElement = (name: string) => {
    const element = elements.find((el) => el.elementType.name === name);
    if (element) {
      copiedElement.current = { ...element };
      removeElement(name);
    }
  };

  const pasteElement = (index: number) => {
    if (copiedElement.current) {
      addElement(index, copiedElement.current);
      copiedElement.current = null;
    }
  };

  return (
    <DesignerContext.Provider
      value={{codeForLanguage, setCodeForLanguage,isSidebarVisible, setIsSidebarVisible,
        elements, 
        submitBtn,
        setSubmitBtn,
        setElements,
        addElement,
        removeElement, 
        selectedElement,
        setSelectedElement,
        updateElement,
        undo,
        redo,
        redoStack: redoStack.current,
        undoStack: undoStack.current,
        copyElement,
        duplicateElement,
        cutElement,
        pasteElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
