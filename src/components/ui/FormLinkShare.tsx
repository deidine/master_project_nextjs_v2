"use client";

import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";

function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // avoiding window not defined error
  }

  const shareLink = `/submit/${shareUrl}`;
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />
      <Button
        className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          // toast({
          //   title: "Copied!",
          //   description: "Link copied to clipboard",
          // });
        }}
      >
        {/* <ImShare className="mr-2 h-4 w-4" /> */}
        Share link
      </Button>
    </div>
  );
}

export default FormLinkShare;
