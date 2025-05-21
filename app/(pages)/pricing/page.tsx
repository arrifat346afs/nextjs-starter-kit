import { AccordionComponent } from "@/components/homepage/accordion-component";
import Pricing from "@/components/homepage/pricing";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { polar } from "@/lib/polar";
import { Check, DollarSign } from "lucide-react";

export default async function PricingPage() {
  const { result } = await polar.products.list({
    organizationId: process.env.POLAR_ORGANIZATION_ID!,
  });

  return (
    <PageWrapper>
      <div className="w-full bg-gradient-to-t from-background to-background/40">
        <div className="w-full container">
          <section className="relative flex flex-col items-center justify-center p-5">
            {/* Background gradient */}

            <div className=" text-center">
              {/* Pill badge */}
              <div className="mx-auto w-fit rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 mb-6">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-200">
                  <DollarSign className="h-4 w-4" />
                  <span>Simple, Transparent Pricing</span>
                </div>
              </div>
            </div>
            <div>
              <Pricing result={result as any} />
            </div>
          </section>

          <section>
          </section>

          <section className="pb-20">
            <AccordionComponent />
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
