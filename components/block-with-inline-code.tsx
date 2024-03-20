export function BlockWithInlineCode({ text }: { text: string }) {
  const regex = /`(.*?)`/g;
  // TODO: render all blocks properly e.g. strong, em
  return (
    <>
      {text.split(regex).map((content, i) => {
        if (i % 2 === 0) {
          return content;
        } else {
          return (
            <code
              key={i}
              className="relative rounded bg-primary-foreground border px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold w-fit"
            >
              {content}
            </code>
          );
        }
      })}
    </>
  );
}
