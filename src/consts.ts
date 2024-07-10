import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Joseph Mudd",
  EMAIL: "josephdanielmudd@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 0,
  NUM_WORKS_ON_HOMEPAGE: 1,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Joseph Mudd - JavaScript and React front-end developer portfolio.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "Insights and articles on web development, design, and technology.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "My professional experience and achievements in front-end development.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A showcase of my projects, with links to code repositories and live demos.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "github",
    HREF: "https://github.com/josephdanielm"
  },
];
