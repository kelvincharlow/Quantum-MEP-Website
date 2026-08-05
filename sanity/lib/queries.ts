import { defineQuery } from "next-sanity";

const projectFields = `
  _id,
  title,
  "slug": slug.current,
  shortTitle,
  "industry": sector->name,
  projectType,
  location,
  role,
  summary,
  scope,
  services,
  tone,
  featured,
  featuredOrder,
  displayOrder,
  seoTitle,
  seoDescription,
  coverImage {
    "src": asset->url,
    alt,
    position
  },
  gallery[] {
    "src": asset->url,
    alt,
    position
  }
`;

export const projectsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)]
  | order(coalesce(displayOrder, 9999) asc, title asc) {
    ${projectFields}
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectFields}
  }
`);
