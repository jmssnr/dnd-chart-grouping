"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

const Header = (props: {
  isGrouped: boolean;
  handleRemoveGrouping: () => void;
}) => {
  const { isGrouped, handleRemoveGrouping } = props;
  return (
    <header className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium  text-xl">
            Temperature in American Cities
          </h1>
          <h2 className="text-muted-foreground">
            using data from 2012 and 2013
          </h2>
        </div>
        {isGrouped && (
          <Button variant="outline" onClick={handleRemoveGrouping}>
            <X /> Remove Grouping
          </Button>
        )}
      </div>
      <Separator />
    </header>
  );
};

export default Header;
