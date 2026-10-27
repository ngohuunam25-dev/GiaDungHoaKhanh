"use client";

import {
  Package,
  Product,
  type LandingPage as LandingPageType,
} from "@/types/landingPage.type";
import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import OrderFormSection from "./OrderFormSection";
import PricingSection from "./PricingSection";
import ProblemSolutionSection from "./ProblemSolutionSection";
import ProductDemoSection from "./ProductDemoSection";
import SocialProofSection from "./SocialProofSection";
import StickyMobileCTA from "./StickyMobileCTA";

export default function LandingPage({
  hero,
  businessSettings,
  comparison,
  videoShowcase,
  features,
  socialProof,
  packages,
}: LandingPageType) {
  const [selectedPackage, setSelectedPackage] = useState<
    Package<Product> | undefined
  >(packages?.[0]);
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Top Fixed Header */}
      <Header {...hero} />

      {/* Main Content Area */}
      <main className="flex flex-col relative w-full pt-14 pb-24 sm:pb-20 bg-surface min-h-screen">
        {/* SECTION 1: HERO & PRIMARY PRODUCT GALLERY */}
        <HeroSection {...{ brandName: businessSettings?.brandName, ...hero }} />

        {/* SECTION 2: PRODUCT INTRODUCTION & DEMONSTRATION */}
        <ProductDemoSection {...{ ...videoShowcase, ...features }} />

        {/* SECTION 3: PROBLEM & PRACTICAL SOLUTION */}
        <ProblemSolutionSection {...comparison} />

        {/* SECTION 4: SOCIAL PROOF & SELLER TRUST */}
        <SocialProofSection {...socialProof} />

        {/* SECTION 5: PRICING & PRODUCT PACKAGES */}
        <PricingSection
          selectedPackageId={selectedPackage?.id}
          onSelectPackage={setSelectedPackage}
          quantity={quantity}
          onQuantityChange={setQuantity}
          packages={packages}
        />

        {/* SECTION 6: MOBILE ORDER FORM */}
        <OrderFormSection
          onSelectPackage={setSelectedPackage}
          quantity={quantity}
          onQuantityChange={setQuantity}
          selectedPackage={selectedPackage}
          packages={packages}
        />

        {/* Footer */}
        <Footer {...businessSettings} />
      </main>

      {/* SECTION 7: STICKY MOBILE CTA BAR */}
      <StickyMobileCTA selectedPackage={selectedPackage} quantity={quantity} />
    </div>
  );
}
