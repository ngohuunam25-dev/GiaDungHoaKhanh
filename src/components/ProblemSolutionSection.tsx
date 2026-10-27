"use client";

import { PROBLEM_SOLUTION_CONTENT } from "@/content/siteContent";
import { Comparison } from "@/types/landingPage.type";
import { Check, CheckCircle, X, XCircle } from "lucide-react";

export default function ProblemSolutionSection({
  title,
  oldProduct,
  newProduct,
}: Comparison) {
  return (
    <section className="flex flex-col px-4 py-8 max-w-4xl mx-auto w-full gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1.5 text-center items-center">
        <span className="text-xs font-extrabold text-secondary uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          {PROBLEM_SOLUTION_CONTENT.sectionBadge}
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
          {title || "title"}
        </h2>
        {/* <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
          {PROBLEM_SOLUTION_CONTENT.sectionSubtitle}
        </p> */}
      </div>
      {/* Side-by-side or stacked Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Problem Card */}
        <div className="flex flex-col p-4 sm:p-5 rounded-2xl bg-surface-container-low/90 border border-error/20 shadow-xs gap-4">
          <div className="flex items-center gap-2.5 text-error">
            <XCircle className="w-6 h-6 shrink-0" />
            <span className="font-extrabold text-base sm:text-lg">
              {/* {PROBLEM_SOLUTION_CONTENT.problemCard.title} */}
              {oldProduct?.name ?? "oldProduct.name"}
            </span>
          </div>

          <ul className="flex flex-col gap-3 text-sm text-on-surface-variant">
            {/* {PROBLEM_SOLUTION_CONTENT.problemCard.items.map((item, idx) => ( */}
            {oldProduct?.points.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-error/10 text-error flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
                <p>
                  <strong className="text-on-surface font-semibold">
                    {item.title}
                  </strong>{" "}
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Solution Card */}
        <div className="flex flex-col p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border-2 border-primary/30 shadow-md gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary-fixed/20 rounded-bl-full pointer-events-none" />

          <div className="flex items-center gap-2.5 text-primary">
            <CheckCircle className="w-6 h-6 shrink-0 text-primary" />
            <span className="font-extrabold text-base sm:text-lg">
              {/* {PROBLEM_SOLUTION_CONTENT.solutionCard.title} */}
              {newProduct?.name ?? "newProduct.name"}
            </span>
          </div>

          <ul className="flex flex-col gap-3 text-sm text-on-surface">
            {/* {PROBLEM_SOLUTION_CONTENT.solutionCard.items.map((item, idx) => ( */}
            {newProduct?.points.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 font-extrabold" />
                </div>
                <p>
                  <strong className="text-primary font-extrabold">
                    {item.title}
                  </strong>{" "}
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
