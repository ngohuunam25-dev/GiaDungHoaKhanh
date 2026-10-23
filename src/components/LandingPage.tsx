"use client";

import { PRODUCT_PACKAGES, ProductPackage } from "@/content/siteContent";
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

export default function LandingPage() {
  const [selectedPackage, setSelectedPackage] = useState<ProductPackage>(
    PRODUCT_PACKAGES[0],
  );
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Top Fixed Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex flex-col relative w-full pt-14 pb-24 sm:pb-20 bg-surface min-h-screen">
        {/* SECTION 1: HERO & PRIMARY PRODUCT GALLERY */}
        <HeroSection />

        {/* SECTION 2: PRODUCT INTRODUCTION & DEMONSTRATION */}
        <ProductDemoSection />

        {/* SECTION 3: PROBLEM & PRACTICAL SOLUTION */}
        <ProblemSolutionSection />

        {/* SECTION 4: SOCIAL PROOF & SELLER TRUST */}
        <SocialProofSection />

        {/* SECTION 5: PRICING & PRODUCT PACKAGES */}
        <PricingSection
          selectedPackageId={selectedPackage.id}
          onSelectPackage={setSelectedPackage}
          quantity={quantity}
          onQuantityChange={setQuantity}
        />

        {/* SECTION 6: MOBILE ORDER FORM */}
        <OrderFormSection
          selectedPackage={selectedPackage}
          onSelectPackage={setSelectedPackage}
          quantity={quantity}
          onQuantityChange={setQuantity}
        />

        {/* Footer */}
        <Footer />
      </main>

      {/* SECTION 7: STICKY MOBILE CTA BAR */}
      <StickyMobileCTA selectedPackage={selectedPackage} quantity={quantity} />
    </div>
  );
}
