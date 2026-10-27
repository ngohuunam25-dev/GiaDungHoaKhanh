import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION || "2026-10-26",
  useCdn: true,
});

export const urlFor = (source: any) =>
  imageUrlBuilder(sanityClient).image(source);
