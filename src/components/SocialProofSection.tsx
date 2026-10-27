"use client";

import { ReviewItem, SOCIAL_PROOF_CONTENT } from "@/content/siteContent";
import { SocialProof } from "@/types/landingPage.type";
import { Star } from "lucide-react";

export type { ReviewItem };
const REVIEWS = SOCIAL_PROOF_CONTENT.reviews;

export default function SocialProofSection({
  title,
  soldCountLabel,
  averageRating,
  reviews,
}: Partial<SocialProof>) {
  return (
    <section className="flex flex-col px-4 py-8 bg-surface-container-low/70 border-y border-outline-variant/20 gap-6 w-full">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 text-center items-center">
          <span className="text-xs font-extrabold text-secondary uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            {SOCIAL_PROOF_CONTENT.sectionBadge}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
            {title ?? SOCIAL_PROOF_CONTENT.sectionTitle}
          </h2>

          {/* Rating Summary */}
          <div className="inline-flex items-center gap-1 text-secondary bg-surface-container-lowest px-3.5 py-1.5 rounded-full shadow-xs border border-outline-variant/20">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-500 text-amber-500"
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-on-surface ml-1">
              {averageRating
                ? `${averageRating}/5`
                : SOCIAL_PROOF_CONTENT.ratingSummary.score}{" "}
              (
              {soldCountLabel ??
                SOCIAL_PROOF_CONTENT.ratingSummary.reviewCountText}
              )
            </span>
          </div>
        </div>

        {/* Reviews Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* {REVIEWS.map((rev) => ( */}
          {reviews?.map((rev) => (
            <div
              key={rev._key}
              className="flex flex-col p-4 sm:p-5 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/20 gap-3 justify-between"
            >
              <div className="flex flex-col gap-2.5">
                {/* User Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      // className={`w-9 h-9 rounded-full ${rev.avatarBg} ${rev.avatarText} font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                      className={`w-9 h-9 rounded-full bg-primary-fixed text-primary font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {rev.customerName.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-sm text-on-surface leading-tight">
                        {rev.customerName}
                      </span>
                      <span className="text-[11px] text-on-surface-variant">
                        {rev.location}
                      </span>
                    </div>
                  </div>

                  {/* <span className="text-[11px] font-semibold text-primary flex items-center gap-1 bg-primary-fixed/50 px-2 py-0.5 rounded-full">
                    <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                    <span>
                      {SOCIAL_PROOF_CONTENT.ratingSummary.verifiedPurchase}
                    </span>
                  </span> */}
                  {/* Stars */}
                  <div className="flex  text-amber-500 gap-x-px">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-2.5 h-2.5 fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-on-surface leading-relaxed italic">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Seller Commitment Callout Banner */}
        {/* <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-primary/20 shadow-xs flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base text-on-surface">
              {SOCIAL_PROOF_CONTENT.commitmentBanner.title}
            </span>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
              {SOCIAL_PROOF_CONTENT.commitmentBanner.prefixText}{" "}
              <strong className="text-primary font-semibold">
                {SOCIAL_PROOF_CONTENT.commitmentBanner.highlightText}
              </strong>{" "}
              {SOCIAL_PROOF_CONTENT.commitmentBanner.suffixText}
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
