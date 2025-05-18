import {
  Cpu,
  Fingerprint,
  Pencil,
  Settings2,
  Sparkles,
  Zap,
} from "lucide-react";

export default function Features() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-balance text-4xl font-medium lg:text-5xl">
            Powerful AI Features for Stock Contributors
          </h2>
          <p>
            TagPix AI streamlines your workflow with intelligent metadata
            generation, helping you save time and maximize the visibility of
            your content on stock platforms.
          </p>
        </div>

        <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="size-4" />
              <h3 className="text-sm font-medium">Lightning Fast</h3>
            </div>
            <p className="text-sm">
              Generate complete metadata sets in seconds, not hours. Process
              entire batches of images with just a few clicks.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="size-4" />
              <h3 className="text-sm font-medium">AI-Powered</h3>
            </div>
            <p className="text-sm">
              Advanced machine learning algorithms analyze your images to create
              contextually relevant and SEO-optimized metadata.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Fingerprint className="size-4" />
              <h3 className="text-sm font-medium">Secure</h3>
            </div>
            <p className="text-sm">
              Your content remains private and protected. We never store your
              images or use them to train our AI models.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Pencil className="size-4" />
              <h3 className="text-sm font-medium">Customizable</h3>
            </div>
            <p className="text-sm">
              Fine-tune generated metadata to match your style or specific
              requirements before exporting to your preferred platform.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Settings2 className="size-4" />
              <h3 className="text-sm font-medium">Platform Optimized</h3>
            </div>
            <p className="text-sm">
              Tailored for Adobe Stock, Shutterstock, and other major platforms
              with format-specific exports for each marketplace.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4" />
              <h3 className="text-sm font-medium">Multilingual</h3>
            </div>
            <p className="text-sm">
              Generate metadata in multiple languages to expand your global
              reach and tap into international markets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
