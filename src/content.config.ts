import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({ pattern: ["**/*.md", "!**/!.md"], base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z
      .object({
        author: z.string().default(SITE.author),
        pubDatetime: z.date().optional(),
        modDatetime: z.date().optional().nullable(),
        title: z.string(),
        featured: z.boolean().optional(),
        draft: z.boolean().optional(),
        tags: z.array(z.string()).default(["others"]),
        tagLinks: z.array(z.string()).optional(),
        ogImage: image().or(z.string()).optional(),
        description: z.string().default(""),
        canonicalURL: z.string().optional(),
        hideEditPost: z.boolean().optional(),
        timezone: z.string().optional(),
      })
      .refine(data => data.draft || data.pubDatetime, {
        message: "pubDatetime is required for non-draft posts",
        path: ["pubDatetime"],
      })
      .transform(data => ({
        ...data,
        pubDatetime: data.pubDatetime ?? new Date(0),
        tags: data.tagLinks?.length
          ? data.tagLinks.map(link => link.replace(/^\[([^\]]+)\].*$/, "$1"))
          : data.tags,
      })),
});

export const collections = { blog };
