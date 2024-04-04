"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function CopyToClipboardButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [copied]);
  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Something went wrong! Try copying again.",
        isClosable: true,
        variant: "destructive",
      });
    }
  }

  return (
    <Button
      className="absolute bottom-0 right-0 mb-3 mr-3"
      variant={"outline"}
      size={"icon"}
      onClick={() => copyText(text)}
    >
      {copied ? <Check /> : <Copy />}
      <span className="sr-only">Copy</span>
    </Button>
  );
}
