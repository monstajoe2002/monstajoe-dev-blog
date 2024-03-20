// ./src/components/RichText.tsx

import { RichTextField } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  PrismicLink,
} from "@prismicio/react";
import { BlockWithInlineCode } from "../block-with-inline-code";

export const richTextComponents: JSXMapSerializer = {
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code>{children}</code>;
    }
  },
  heading1: ({ children }) => (
    <h1 className="font-bold text-4xl">{children}</h1>
  ),
  heading2: ({ children }) => <h2 className="font-bold text-xl">{children}</h2>,
  heading3: ({ children }) => <h3 className="font-bold text-lg">{children}</h3>,
  paragraph: ({ text }) => {
    const plainText = text! as string;
    return (
      <p>
        <BlockWithInlineCode text={plainText} />
      </p>
    );
  },
  hyperlink: ({ children, node }) => (
    <PrismicLink field={node.data} className="font-bold underline">
      {children}
    </PrismicLink>
  ),
  preformatted: ({ children }) => (
    <pre className="relative rounded bg-primary-foreground px-4 py-6 font-mono text-sm font-semibold border">
      {children}
    </pre>
  ),
  oList: ({ children }) => <ol className="list-decimal">{children}</ol>,

  oListItem: ({ text }) => {
    const plainText = text! as string;

    return (
      <li>
        <BlockWithInlineCode text={plainText} />
      </li>
    );
  },
};

interface RichTextProps {
  field: RichTextField;
}

export const RichText = ({ field }: RichTextProps) => {
  return <PrismicRichText field={field} components={richTextComponents} />;
};
