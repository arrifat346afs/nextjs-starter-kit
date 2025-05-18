"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type IconName = keyof typeof LucideIcons;

interface DynamicIconProps {
  name: IconName;
  className?: string;
}

const DynamicIcon = ({ name, className }: DynamicIconProps) => {
  const Icon = LucideIcons[name] as LucideIcon;
  return Icon ? <Icon className={className} /> : null;
};

type FAQItem = {
  id: string;
  icon: IconName;
  question: string;
  answer: string;
};

export default function FAQsThree() {
  const faqItems: FAQItem[] = [
    {
      id: "item-1",
      icon: "Image",
      question: "How does TagPix AI generate metadata for my images?",
      answer:
        "TagPix AI uses advanced computer vision and natural language processing to analyze your images and generate relevant, SEO-optimized titles, descriptions, and keywords. Our AI models are trained on stock photography standards and marketplace requirements to ensure your metadata meets industry best practices.",
    },
    {
      id: "item-2",
      icon: "CreditCard",
      question: "What pricing plans are available for TagPix AI?",
      answer:
        "TagPix AI offers flexible pricing options including a free tier for occasional users, a monthly subscription for regular contributors, and custom enterprise plans for agencies and high-volume creators. All paid plans include unlimited metadata generation and advanced features like batch processing and platform-specific optimization.",
    },
    {
      id: "item-3",
      icon: "FileText",
      question: "Which stock platforms does TagPix AI support?",
      answer:
        "TagPix AI is optimized for all major stock platforms including Adobe Stock, Shutterstock, Getty Images, iStock, Alamy, and more. Our platform-specific export formats ensure your metadata meets each marketplace&apos;s requirements and character limits for maximum approval rates.",
    },
    {
      id: "item-4",
      icon: "Globe",
      question: "Can TagPix AI generate metadata in multiple languages?",
      answer:
        "Yes, TagPix AI supports metadata generation in multiple languages including English, Spanish, French, German, Italian, Portuguese, Japanese, and Chinese. This allows you to target international markets and increase your global reach without the need for manual translation.",
    },
    {
      id: "item-5",
      icon: "Shield",
      question: "Is my content secure when using TagPix AI?",
      answer:
        "Absolutely. We take your privacy and content security seriously. Your images are processed securely, never stored permanently on our servers, and never used to train our AI models. We use industry-standard encryption and security practices to protect your data at all times.",
    },
  ];

  return (
    <section className=" py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div className="md:w-1/3">
            <div className="sticky top-20">
              <h2 className="mt-4 text-3xl font-bold">
                Frequently Asked Questions About TagPix AI
              </h2>
              <p className="text-muted-foreground mt-4">
                Have more questions about our AI metadata generator? Contact our{" "}
                <Link
                  href="#"
                  className="text-primary font-medium hover:underline"
                >
                  support team
                </Link>
              </p>
            </div>
          </div>
          <div className="md:w-2/3">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className=" shadow-xs rounded-lg border px-4 last:border-b"
                >
                  <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="flex size-6">
                        <DynamicIcon
                          name={item.icon}
                          className="m-auto size-4"
                        />
                      </div>
                      <span className="text-base">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="px-9">
                      <p className="text-base">{item.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
