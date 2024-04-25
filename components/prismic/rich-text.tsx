// ./src/components/RichText.tsx
"use client";
import { RichTextField } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  PrismicLink,
} from "@prismicio/react";
import { BlockWithInlineCode } from "../block-with-inline-code";
import CopyToClipboardButton from "../copy-to-clipboard-button";
import { useEffect } from "react";
import "highlight.js/styles/tomorrow-night-blue.css";
import hljs from "highlight.js";

const REGEX = /`(.*?)`/g;
export const richTextComponents: JSXMapSerializer = {
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code>{children}</code>;
    }
  },
  heading1: ({ children }) => (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-2 text-balance">
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
  paragraph: ({ children, text }) => {
    const plainText = text! as string;
    return !plainText.match(REGEX) ? (
      <p className="scroll-m-20 text-lg leading-relaxed">{children}</p>
    ) : (
      <span>
        <BlockWithInlineCode text={plainText} />
      </span>
    );
  },
  hyperlink: ({ children, node }) => (
    <PrismicLink field={node.data} className="font-bold underline">
      {children}
    </PrismicLink>
  ),
  preformatted: ({ text }) => {
    const plainText = text! as string;

    return (
      <pre className="relative">
        <code className="mt-5 relative rounded bg-primary-foreground px-4 py-6 font-mono text-sm font-semibold border text-wrap">
          {plainText}
        </code>
        <CopyToClipboardButton text={text ?? ""} />
      </pre>
    );
  },
  oList: ({ children }) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
  ),

  oListItem: ({ children, text }) => {
    const plainText = text! as string;
    return !plainText.match(REGEX) ? (
      <li>{children}</li>
    ) : (
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
  useEffect(() => {
    hljs.highlightAll();
  });
  return <PrismicRichText field={field} components={richTextComponents} />;
};
