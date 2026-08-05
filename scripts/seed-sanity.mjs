import { createReadStream, existsSync } from "node:fs";
import { basename, resolve } from "node:path";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error("Add NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN to .env.local before seeding.");
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-01",
  useCdn: false,
});

const imagePath = (name) => resolve(process.cwd(), "app", "images", name);

async function uploadImage(name, alt, position = "center") {
  const path = imagePath(name);
  if (!existsSync(path)) return undefined;

  const filename = basename(path);
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  );
  const asset = existing
    ? { _id: existing }
    : await client.assets.upload("image", createReadStream(path), { filename });

  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt,
    position,
  };
}

const sectors = [
  ["healthcare", "Healthcare", "Critical environments", 1],
  ["industrial", "Industrial", "Process and production", 2],
  ["energy-and-utilities", "Energy and Utilities", "Safety and resilience", 3],
  ["hospitality", "Hospitality", "Comfort at scale", 4],
  ["residential", "Residential", "Everyday performance", 5],
].map(([slug, name, description, displayOrder]) => ({
  _id: `sector-${slug}`,
  _type: "sector",
  name,
  slug: { _type: "slug", current: slug },
  description,
  displayOrder,
}));

const [agcCover, agcGallery, kapaCover, tsavoCover] = await Promise.all([
  uploadImage("AGC.jpeg", "Entrance to AGC Tenwek Hospital Karen Clinic"),
  uploadImage("karen clinic.jpeg", "Architectural visualization associated with the Karen Clinic project"),
  uploadImage("kapa.jpg", "Kapa Oil Refineries industrial construction site"),
  uploadImage("willson.jpeg", "Architectural rendering used for the Tsavo Delight residential project", "center 44%"),
]);

const ref = (sector) => ({ _type: "reference", _ref: `sector-${sector}` });
const slug = (current) => ({ _type: "slug", current });

const projects = [
  {
    _id: "project-agc-tenwek-hospital-karen-clinic",
    _type: "project",
    title: "AGC Tenwek Hospital, Karen Clinic",
    shortTitle: "Tenwek Hospital",
    slug: slug("agc-tenwek-hospital-karen-clinic"),
    sector: ref("healthcare"),
    projectType: "Hospital or Clinic",
    location: "Karen, Nairobi",
    role: "MEP design, coordination and supervision",
    summary: "Coordinated building-services delivery for a modern healthcare environment.",
    scope: "Quantum prepared mechanical and electrical drawings and specifications, coordinated subcontractor activities and technical submissions, monitored quality and safety records, and supported testing and commissioning.",
    services: ["Mechanical", "Electrical", "Coordination", "Commissioning"],
    tone: "blue",
    coverImage: agcCover,
    gallery: agcGallery ? [{ ...agcGallery, _key: "karen-clinic" }] : [],
    featured: true,
    featuredOrder: 1,
    displayOrder: 1,
  },
  {
    _id: "project-kapa-oil-refineries",
    _type: "project",
    title: "Kapa Oil Refineries",
    shortTitle: "Kapa Oil Refineries",
    slug: slug("kapa-oil-refineries"),
    sector: ref("industrial"),
    projectType: "Industrial Facility",
    location: "Nairobi, Kenya",
    role: "MEP engineering design",
    summary: "Industrial systems designed around operational safety, efficiency and resilience.",
    scope: "Quantum developed oil-handling and firefighting concepts, pump and piping calculations, electrical plans and mechanical drawings, including transformer and switchgear sizing for the facility.",
    services: ["Industrial electrical", "Fire protection", "Mechanical", "Piping"],
    tone: "steel",
    coverImage: kapaCover,
    featured: true,
    featuredOrder: 2,
    displayOrder: 2,
  },
  {
    _id: "project-rubis-petrol-station-kericho",
    _type: "project",
    title: "Rubis Petrol Station, Kericho",
    shortTitle: "Rubis Petrol Station",
    slug: slug("rubis-petrol-station-kericho"),
    sector: ref("energy-and-utilities"),
    projectType: "Petrol Station",
    location: "Kericho, Kenya",
    role: "MEP design",
    summary: "Safe, coordinated fuel, fire, electrical and plumbing systems for a retail-energy site.",
    scope: "Quantum's scope included fuel-system installation design, fire protection, HVAC, power supply and distribution, backup power, lighting, ELV and low-current systems, plumbing and drainage.",
    services: ["Fuel systems", "Fire protection", "Electrical", "Plumbing"],
    tone: "amber",
    featured: false,
    displayOrder: 3,
  },
  {
    _id: "project-pullman-hotel-fit-out",
    _type: "project",
    title: "Pullman Hotel Fit-Out",
    shortTitle: "Pullman Hotel",
    slug: slug("pullman-hotel-fit-out"),
    sector: ref("hospitality"),
    projectType: "Fit-Out",
    location: "Nairobi, Kenya",
    role: "Integrated MEP design",
    summary: "High-performance building services supporting a premium hospitality environment.",
    scope: "Quantum developed coordinated firefighting, electrical distribution, low-current, plumbing, HVAC and wastewater-treatment design, using modern digital design tools to improve safety and operational efficiency.",
    services: ["HVAC", "Fire protection", "Electrical", "Wastewater"],
    tone: "night",
    featured: false,
    displayOrder: 4,
  },
  {
    _id: "project-tsavo-delight",
    _type: "project",
    title: "Tsavo Delight",
    shortTitle: "Tsavo Delight",
    slug: slug("tsavo-delight"),
    sector: ref("residential"),
    projectType: "Apartment Development",
    location: "Kileleshwa, Nairobi, Kenya",
    role: "Electrical systems design",
    summary: "Smart electrical systems for a large-scale, high-rise residential development.",
    scope: "For this 25-storey development of more than 700 homes, Quantum worked on electrical-system design and introduced KNX building-management technology with safety, security and energy performance in mind.",
    services: ["Electrical", "KNX", "Building management", "Solar integration"],
    tone: "green",
    coverImage: tsavoCover,
    featured: true,
    featuredOrder: 3,
    displayOrder: 5,
  },
];

let transaction = client.transaction();
for (const sector of sectors) transaction = transaction.createOrReplace(sector);
for (const project of projects) transaction = transaction.createOrReplace(project);
await transaction.commit();

console.log(`Seeded ${sectors.length} sectors and ${projects.length} projects into ${projectId}/${dataset}.`);
