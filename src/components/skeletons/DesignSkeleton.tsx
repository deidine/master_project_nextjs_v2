import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function DesignSkeleton() {
  return (
    <div
      className="size-full relative h-screen rounded-xl  bg-mainColor
    border border-black/10  shadow-sm"
    >
      <SidButtonsSkeleton />
      <TopButtonSkeleton />
      <MidelSkeleton />
      <AddButtonSkelton />
    </div>
  );
}
function AddButtonSkelton() {
  return (
    <div
      className="w-full fixed bottom-0 flex   px-6 
  justify-end   pb-[50px] items-center right-0    h-auto z-10 "
    >
      <div className="bg-white p-1 btn_header ">
        <Skeleton className="w-40 h-14 btn_header text-white flex items-center justify-around font-[14px] text-2xl gap-4 " />{" "}
      </div>
    </div>
  );
}

function TopButtonSkeleton() {
  return (
    <div
      className="bg-white z-30 font-title
      shadow-[inset_0_-1px_0_0_#eaeaea] fixed 
      flex justify-between  h-[60px] border-b-1 
      items-center border-black w-full"
    >
      <div className="flex pl-[15px]  gap-3 justify-start w-[30%] items-center">
        <Skeleton className="h-6 rounded-full w-6" />
        <Skeleton className="h-4 w-[30%]" />
        <Skeleton className="h-4 rounded-full w-[15%]" />
      </div>
      <div className="flex  justify-end pr-[25px]  items-center gap-2 w-[30%]">
        <Skeleton className="h-10 rounded-full w-10" />
        <Skeleton className="h-10 rounded-full w-10" />
        <Skeleton className="w-[30%] h-10 rounded-lg" />
      </div>
    </div>
  );
}

function MidelSkeleton() {
  return (
    <div className=" mx-auto bg-white p-4  max-w-2xl  mt-28 border shadow rounded-xl w-1/2  ">
      <CardEditFormSkeleton   w="w-16"/>
      <CardEditFormSkeleton show={true} w="w-40"/>
      <CardEditFormSkeleton  w="w-60" />
      <CardEditFormSkeleton  w="w-20" show={true}/>
    </div>
  );
}

function SidButtonsSkeleton() {
  return (
    <div
      className="fixed   w-40  border-r-[0.5px]
   border-r-mainColor px-[80px] bg-white  h-full border-l-2 top-10 left-0 z-10"
    >
      <div className="flex flex-col pt-[120px] items-center  justify-between  ">
        <div className=" p-1 rounded-lg z-10 ">
          <Skeleton className="w-20 h-20  rounded-[5px]" />
        </div>{" "}
        <Separator
          orientation="vertical"
          decorative
          className="h-3.5 border-neutral-100"
        />{" "}
        <div className=" p-1 rounded-lg z-10 ">
          <Skeleton className="w-20 h-20  rounded-[5px]" />
        </div>{" "}
        <Separator
          orientation="vertical"
          decorative
          className="h-3.5 border-neutral-100"
        />{" "}
        <div className=" p-1 rounded-lg z-10 ">
          <Skeleton className="w-20 h-20  rounded-[5px]" />
        </div>{" "}
        <Separator
          orientation="vertical"
          decorative
          className="h-3.5 border-neutral-100"
        />
      </div>
    </div>
  );
}

function CardEditFormSkeleton({show,w}: {show?: boolean;w?:string}) {
  return (
    <div className=" flex flex-col relative justify-between w-full p-4 mb-2 border rounded-xl shadow-sm group">
      <div className="flex flex-col justify-start items-start pb-4">
      <Separator
            orientation="vertical"
            decorative
            className="h-3.5 border-neutral-100"
          />
        <Skeleton className={`text-sm text-gray-500 h-4 ${w}`}/>
        <Separator
            orientation="vertical"
            decorative
            className="h-8 border-neutral-100"
          />
        <div className="flex flex-wrap gap-2">
          <Skeleton
            className="
      w-14
      z-10 rounded-lg  h-8 border-2  "
          />
          <Separator
            orientation="vertical"
            decorative
            className="h-3.5 border-neutral-100"
          />
         {show && <div
            className=" z-10 rounded-lg border-red-400 text-red-400  
      w-14
      h-8 text-[13px] font-semibold border-2 flex items-center justify-center"
           > 
           <Skeleton className="text-sm text-gray-500 h-3.5 w-10" />
          </div>}
        </div>
      </div>
    </div>
  );
}
