// ./src/components/Navigation.tsx

import { Client, Content, isFilled } from "@prismicio/client";
import { PrismicLink } from "@prismicio/react";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";

export const Navigation = async ({
  client,
}: {
  client: Client<Content.AllDocumentTypes>;
}): Promise<JSX.Element> => {
  const navigation = await client.getSingle("navigation");

  return (
    <div className="flex justify-between w-full">
      <nav className="hidden font-bold text-xl self-center md:flex">
        <ul className="flex">
          {isFilled.group(navigation.data.menu_items) &&
            navigation.data.menu_items.map((item) => {
              return (
                <li key={item.label}>
                  <PrismicLink
                    className={buttonVariants({
                      variant: "link",
                      className: "font-bold text-xl",
                    })}
                    field={item.link}
                  >
                    {item.label}
                  </PrismicLink>
                </li>
              );
            })}
        </ul>
      </nav>
      <div className="md:hidden visible">
        <MobileNav>
          <ul className="flex">
            {isFilled.group(navigation.data.menu_items) &&
              navigation.data.menu_items.map((item) => {
                return (
                  <li key={item.label}>
                    <PrismicLink
                      className={buttonVariants({
                        variant: "link",
                        className: "my-4 font-bold text-xl",
                      })}
                      field={item.link}
                    >
                      {item.label}
                    </PrismicLink>
                  </li>
                );
              })}
          </ul>
        </MobileNav>
      </div>
      <ThemeToggle />
    </div>
  );
};
