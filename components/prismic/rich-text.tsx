// ./src/components/RichText.tsx

import { RichTextField } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  PrismicLink,
} from "@prismicio/react";

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
  paragraph: ({ children, text, key }) => {
    const regex = /`(.*?)`/g;
    const plainText = text! as string;
    const codeMatches = plainText.match(regex);
    if (!codeMatches) {
      return <p>{children}</p>;
    }
    codeMatches?.forEach((match) => {
      const code = match.replace(/`/g, "");
      children.push(
        <code
          key={key}
          className="relative rounded bg-primary-foreground border px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold w-fit"
        >
          {code}
        </code>
      );
    });
    return (
      <p>
        {plainText.split(regex).map((content, i) => {
          if (i % 2 === 0) {
            return content;
          } else {
            return (
              <code
                key={key + i}
                className="relative rounded bg-primary-foreground border px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold w-fit"
              >
                {content}
              </code>
            );
          }
        })}
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
};

interface RichTextProps {
  field: RichTextField;
}

export const RichText = ({ field }: RichTextProps) => {
  return <PrismicRichText field={field} components={richTextComponents} />;
};
