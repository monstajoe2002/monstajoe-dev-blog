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
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  ),
  heading2: ({ children }) => (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  ),
  heading3: ({ children }) => (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  ),
  paragraph: ({ text }) => {
    const plainText = text! as string;
    return (
      <p className="leading-7 [&:not(:first-child)]:mt-6">
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
    <pre className="mt-5 relative rounded bg-primary-foreground px-4 py-6 font-mono text-sm font-semibold border text-wrap">
      {children}
    </pre>
  ),
  oList: ({ children }) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
  ),

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
