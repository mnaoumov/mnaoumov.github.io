import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconDiscord from "@/assets/icons/IconDiscord.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconMastodon from "@/assets/icons/IconMastodon.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/mnaoumov",
    linkTitle: `${SITE.title} on GitHub`,
    icon: IconGitHub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mnaoumov",
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: IconLinkedin,
  },
  {
    name: "X",
    href: "https://x.com/mnaoumov",
    linkTitle: `${SITE.title} on X`,
    icon: IconBrandX,
  },
  {
    name: "Mastodon",
    href: "https://mastodon.social/@mnaoumov",
    linkTitle: `${SITE.title} on Mastodon`,
    icon: IconMastodon,
  },
  {
    name: "Discord",
    href: "https://discord.com/users/331702070065364993",
    linkTitle: `${SITE.title} on Discord`,
    icon: IconDiscord,
  },
  {
    name: "Mail",
    href: "mailto:mnaoumov@gmail.com",
    linkTitle: `Send an email to ${SITE.author}`,
    icon: IconMail,
  },
] as const;

interface Project {
  title: string;
  href: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    title: "obsidian-resources",
    href: "https://github.com/mnaoumov/obsidian-resources",
    description:
      "Curated list of my Obsidian plugins, tools, and learning resources for plugin developers.",
  },
  {
    title: "obsidian-dev-utils",
    href: "https://mnaoumov.dev/obsidian-dev-utils/",
    description: "Essential utilities for building Obsidian plugins.",
  },
  {
    title: "obsidian-integration-testing",
    href: "https://mnaoumov.dev/obsidian-integration-testing/",
    description:
      "Run your plugin's tests inside a real, running Obsidian — desktop or Android.",
  },
  {
    title: "obsidian-test-mocks",
    href: "https://mnaoumov.dev/obsidian-test-mocks/",
    description:
      "In-memory implementations of every class and function in obsidian.d.ts.",
  },
  {
    title: "MathDoku Online Calculator",
    href: "https://mnaoumov.dev/mathdoku-online-calculator/",
    description: "Online solver and calculator for MathDoku (KenKen) puzzles.",
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Share this post via WhatsApp`,
    icon: IconWhatsapp,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: `Share this post on Facebook`,
    icon: IconFacebook,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    icon: IconTelegram,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: `Share this post on Pinterest`,
    icon: IconPinterest,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
] as const;
