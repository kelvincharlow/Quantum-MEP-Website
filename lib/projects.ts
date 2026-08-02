export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  industry: string;
  projectType: string;
  location: string;
  role: string;
  summary: string;
  scope: string;
  services: string[];
  tone: string;
};

export const projects: Project[] = [
  {
    slug: "agc-tenwek-hospital-karen-clinic",
    title: "AGC Tenwek Hospital, Karen Clinic",
    shortTitle: "Tenwek Hospital",
    industry: "Healthcare",
    projectType: "Hospital or Clinic",
    location: "Karen, Nairobi",
    role: "MEP design, coordination and supervision",
    summary:
      "Coordinated building-services delivery for a modern healthcare environment.",
    scope:
      "Quantum prepared mechanical and electrical drawings and specifications, coordinated subcontractor activities and technical submissions, monitored quality and safety records, and supported testing and commissioning.",
    services: ["Mechanical", "Electrical", "Coordination", "Commissioning"],
    tone: "blue",
  },
  {
    slug: "kapa-oil-refineries",
    title: "Kapa Oil Refineries",
    shortTitle: "Kapa Oil Refineries",
    industry: "Industrial",
    projectType: "Industrial Facility",
    location: "Nairobi, Kenya",
    role: "MEP engineering design",
    summary:
      "Industrial systems designed around operational safety, efficiency and resilience.",
    scope:
      "Quantum developed oil-handling and firefighting concepts, pump and piping calculations, electrical plans and mechanical drawings, including transformer and switchgear sizing for the facility.",
    services: ["Industrial electrical", "Fire protection", "Mechanical", "Piping"],
    tone: "steel",
  },
  {
    slug: "wilson-airport-office-hangar",
    title: "Wilson Airport Office Block and Hangar",
    shortTitle: "Wilson Airport Hangar",
    industry: "Aviation",
    projectType: "Office Building and Aircraft Hangar",
    location: "Lang’ata, Nairobi",
    role: "Design, installation, testing and commissioning",
    summary:
      "Integrated environmental, power and safety systems for aviation operations.",
    scope:
      "The project covered HVAC and ventilation for offices and aircraft-maintenance areas, power distribution, high-bay and apron lighting, backup power, earthing, lightning protection, low-current systems, plumbing, drainage and oil-water separation.",
    services: ["HVAC", "Electrical", "Low current", "Plumbing"],
    tone: "sky",
  },
  {
    slug: "rubis-petrol-station-kericho",
    title: "Rubis Petrol Station, Kericho",
    shortTitle: "Rubis Petrol Station",
    industry: "Energy and Utilities",
    projectType: "Petrol Station",
    location: "Kericho, Kenya",
    role: "MEP design",
    summary:
      "Safe, coordinated fuel, fire, electrical and plumbing systems for a retail-energy site.",
    scope:
      "Quantum’s scope included fuel-system installation design, fire protection, HVAC, power supply and distribution, backup power, lighting, ELV and low-current systems, plumbing and drainage.",
    services: ["Fuel systems", "Fire protection", "Electrical", "Plumbing"],
    tone: "amber",
  },
  {
    slug: "pullman-hotel-fit-out",
    title: "Pullman Hotel Fit-Out",
    shortTitle: "Pullman Hotel",
    industry: "Hospitality",
    projectType: "Fit-Out",
    location: "Nairobi, Kenya",
    role: "Integrated MEP design",
    summary:
      "High-performance building services supporting a premium hospitality environment.",
    scope:
      "Quantum developed coordinated firefighting, electrical distribution, low-current, plumbing, HVAC and wastewater-treatment design, using modern digital design tools to improve safety and operational efficiency.",
    services: ["HVAC", "Fire protection", "Electrical", "Wastewater"],
    tone: "night",
  },
  {
    slug: "tsavo-delight",
    title: "Tsavo Delight",
    shortTitle: "Tsavo Delight",
    industry: "Residential",
    projectType: "Apartment Development",
    location: "Kileleshwa, Nairobi, Kenya",
    role: "Electrical systems design",
    summary:
      "Smart electrical systems for a large-scale, high-rise residential development.",
    scope:
      "For this 25-storey development of more than 700 homes, Quantum worked on electrical-system design and introduced KNX building-management technology with safety, security and energy performance in mind.",
    services: ["Electrical", "KNX", "Building management", "Solar integration"],
    tone: "green",
  },
];

export const industries = [
  "All",
  "Healthcare",
  "Industrial",
  "Aviation",
  "Energy and Utilities",
  "Hospitality",
  "Residential",
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
