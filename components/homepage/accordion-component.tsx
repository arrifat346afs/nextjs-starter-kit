"use client";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {

      question: "How does TagPix AI generate metadata for my images?",
      answer:
        "TagPix AI uses advanced computer vision and natural language processing to analyze your images and generate relevant, SEO-optimized titles, descriptions, and keywords. Our AI models are trained on stock photography standards and marketplace requirements to ensure your metadata meets industry best practices.",
    },
    {

      question: "What pricing plans are available for TagPix AI?",
      answer:
        "TagPix AI offers flexible pricing options including a free tier for occasional users, a monthly subscription for regular contributors, and custom enterprise plans for agencies and high-volume creators. All paid plans include unlimited metadata generation and advanced features like batch processing and platform-specific optimization.",
    },
    {

      question: "Which stock platforms does TagPix AI support?",
      answer:
        "TagPix AI is optimized for all major stock platforms including Adobe Stock, Shutterstock, Getty Images, iStock, Alamy, and more. Our platform-specific export formats ensure your metadata meets each marketplace&apos;s requirements and character limits for maximum approval rates.",
    },
    {

      question: "Can TagPix AI generate metadata in multiple languages?",
      answer:
        "Yes, TagPix AI supports metadata generation in multiple languages including English, Spanish, French, German, Italian, Portuguese, Japanese, and Chinese. This allows you to target international markets and increase your global reach without the need for manual translation.",
    },
    {

      question: "Is my content secure when using TagPix AI?",
      answer:
        "Absolutely. We take your privacy and content security seriously. Your images are processed securely, never stored permanently on our servers, and never used to train our AI models. We use industry-standard encryption and security practices to protect your data at all times.",
    },
];

export function AccordionComponent() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Pill badge */}
          <div className="mx-auto w-fit rounded-full border px-4 py-1 mb-6">
            <div className="flex items-center gap-2 text-sm font-medium dark:text-blue-200">
              <HelpCircle className="h-4 w-4" />
              <span>FAQ</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Everything you need to know about the Next.js Starter Kit.
            Can't find the answer you're looking for? Reach out to our
            team.
          </p>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 px-2"
              >
                <AccordionTrigger className="hover:no-underline py-4 px-2">
                  <span className="font-medium text-left text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
