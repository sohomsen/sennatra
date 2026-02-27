import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface HomeContent {
  heroTagline: string;
  heroSubline: string;
  ctaText: string;
  ctaHref: string;
  featuredReleaseHeading: string;
  featuredReleaseBlurb: string;
  nextShowHeading: string;
  nextShowBlurb: string;
  aboutSnippetHeading: string;
  aboutSnippetBlurb: string;
  seoTitle: string;
  seoDescription: string;
}

const DEFAULTS: HomeContent = {
  heroTagline: "",
  heroSubline: "",
  ctaText: "Listen Now",
  ctaHref: "/music",
  featuredReleaseHeading: "Latest Release",
  featuredReleaseBlurb: "",
  nextShowHeading: "Next Show",
  nextShowBlurb: "",
  aboutSnippetHeading: "About",
  aboutSnippetBlurb: "",
  seoTitle: "sennatra",
  seoDescription: "Official website of sennatra",
};

export function getHomeContent(): HomeContent {
  const filePath = path.join(process.cwd(), "content/home/home.mdx");
  if (!fs.existsSync(filePath)) return DEFAULTS;
  const { data } = matter(fs.readFileSync(filePath, "utf-8"));
  return { ...DEFAULTS, ...data } as HomeContent;
}
