// ./src/components/Navigation.tsx

import { Client, Content, isFilled } from "@prismicio/client";
import { PrismicLink } from "@prismicio/react";
import { Button } from "../ui/button";

export const Navigation = async ({
  client,
}: {
  client: Client<Content.AllDocumentTypes>;
}): Promise<JSX.Element> => {
  const navigation = await client.getSingle("navigation");

  return (
    <nav className="font-bold text-xl self-center">
      <ul>
        {isFilled.group(navigation.data.menu_items) &&
          navigation.data.menu_items.map((item) => {
            return (
              <li key={item.label}>
                <Button asChild variant={"link"} className="text-xl font-bold">
                  <PrismicLink field={item.link}>{item.label}</PrismicLink>
                </Button>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};