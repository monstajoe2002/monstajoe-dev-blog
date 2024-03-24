import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
export function MobileNav({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sheet>
        <SheetTrigger className={buttonVariants({ variant: "outline" })}>
          <Menu className="mr-2" />
          <span>Menu</span>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>monstajoe&apos;s Dev Blog</SheetTitle>
          </SheetHeader>
          <div>{children}</div>
        </SheetContent>
      </Sheet>
    </>
  );
}
