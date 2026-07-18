import dr1 from "@/assets/Drainge1.png";
import img1 from "@/assets/rst_img_1.webp";
import img2 from "@/assets/rst_img_2.webp";
import img3 from "@/assets/rst_img_3.webp";
import img4 from "@/assets/rst_img_4.webp";
import img5 from "@/assets/rst_img_5.webp";
import img6 from "@/assets/rst_img_6.webp";
import img7 from "@/assets/rst_img_7.webp";

// Commercial
import comm1 from "@/assets/sectors/comm/comm1.jpg";
import comm2 from "@/assets/sectors/comm/comm2.png";
import comm3 from "@/assets/sectors/comm/Comm3.JPG";
import comm4 from "@/assets/sectors/comm/comm4.jpg";
import comm5 from "@/assets/sectors/comm/comm5.jpg";
import comm6 from "@/assets/sectors/comm/comm6.JPG";
import comm7 from "@/assets/sectors/comm/comm7.JPG";
import comm8 from "@/assets/sectors/comm/comm8.webp";

// Industrial
import indus1 from "@/assets/sectors/indus/indus1.JPG";
import indus2 from "@/assets/sectors/indus/indus2.JPG";
import indus3 from "@/assets/sectors/indus/indus3.JPG";
import indus4 from "@/assets/sectors/indus/indus4.JPG";
import indus5 from "@/assets/sectors/indus/indus5.jpg";

// Institutional
import insti6 from "@/assets/sectors/insiti/insiti6.webp";
import insti1 from "@/assets/sectors/insiti/insti1.JPG";
import insti2 from "@/assets/sectors/insiti/insti2.JPG";
import insti3 from "@/assets/sectors/insiti/insti3.JPG";
import insti4 from "@/assets/sectors/insiti/insti4.png";
import insti5 from "@/assets/sectors/insiti/insti5.jpg";

// Residential
import res1 from "@/assets/sectors/resi/res1.jpg";
import res10 from "@/assets/sectors/resi/res10.JPG";
import res11 from "@/assets/sectors/resi/res11.JPG";
import res12 from "@/assets/sectors/resi/res12.webp";
import res2 from "@/assets/sectors/resi/res2.jpg";
import res3 from "@/assets/sectors/resi/res3.png";
import res4 from "@/assets/sectors/resi/res4.png";
import res5 from "@/assets/sectors/resi/res5.png";
import res6 from "@/assets/sectors/resi/res6.png";
import res7 from "@/assets/sectors/resi/res7.JPG";
import res8 from "@/assets/sectors/resi/res8.JPG";
import res9 from "@/assets/sectors/resi/res9.JPG";

export type Sector = "Commercial" | "Residential" | "Industrial" | "Institutional";

export interface Project {
  id: string;
  title: string;
  sector: Sector;
  scope: string;
  description: string;
  cover: string;
  gallery: string[];
}

// Real project photography supplied by RST. Titles/scopes are placeholders
// that RST can edit - the imagery is real.
export const projects: Project[] = [
  {
    id: "framing-01",
    title: "Two-Storey Residential Frame",
    sector: "Residential",
    scope: "Timber & steel framing, structural design",
    description:
      "Structural design and framing detailing for a two-storey residential build, combining LVL beams with structural steel where openings and spans required.",
    cover: res2,
    gallery: [img1, img4, img2, img3, img5, img6, img7],
  },
  {
    id: "townhouse-01",
    title: "Springvale Townhouse",
    sector: "Residential",
    scope: "Structural design, brick veneer detailing",
    description:
      "Completed double-storey townhouse. Structural documentation covered footings, upper-floor framing and window/opening reinforcement.",
    cover: img2,
    gallery: [img2],
  },
  {
    id: "roof-truss-01",
    title: "Cathedral Truss Retrofit",
    sector: "Residential",
    scope: "Roof truss redesign, HVAC coordination",
    description:
      "Structural redesign of an existing roof space to accommodate raked ceilings, new trusses and coordinated HVAC ducting.",
    cover: img3,
    gallery: [img3, img7],
  },
  {
    id: "commercial-frame-01",
    title: "Commercial Steel & Timber Frame",
    sector: "Commercial",
    scope: "Portal frame, mixed-material structure",
    description:
      "Hybrid steel portal and timber-framed commercial structure. Design covered lateral bracing, connections and slab tie-downs.",
    cover: comm1,
    gallery: [img4, img1],
  },
  {
    id: "apartment-01",
    title: "Balcony Apartment Block",
    sector: "Commercial",
    scope: "Full structural design & documentation",
    description:
      "Three-storey apartment development. Structural scope included cantilevered balcony slabs, party-wall reinforcement and stair cores.",
    cover: img6,
    gallery: [img6],
  },
  {
    id: "warehouse-01",
    title: "Warehouse Wall Frame",
    sector: "Industrial",
    scope: "Load-bearing wall framing over basement",
    description:
      "Load-bearing wall framing built over a masonry basement carpark. Braced panels and cross-strapping designed for lateral loads.",
    cover: indus4,
    gallery: [img5],
  },
  {
    id: "hvac-fitout-01",
    title: "Institutional Roof & Services",
    sector: "Institutional",
    scope: "Truss retrofit, services coordination",
    description:
      "Structural coordination for an institutional fitout: existing timber trusses reinforced to accommodate new mechanical services.",
    cover: insti4,
    gallery: [img7, img3],
  },
];

export interface SectorGallery {
  sector: Sector;
  description: string;
  cover: string;
  gallery: string[];
}

export const sectorGalleries: SectorGallery[] = [
  {
    sector: "Residential",
    description:
      "Framing, renovations and full structural design for homes across Melbourne, from single-storey extensions to multi-unit townhouse builds.",
    cover: res1,
    gallery: [res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, res11, res12],
  },
  {
    sector: "Commercial",
    description:
      "Structural documentation for fitouts, apartment developments and mixed-use builds, covering everything from portal frames to cantilevered slabs.",
    cover: comm1,
    gallery: [comm1, comm2, comm3, comm4, comm5, comm6, comm7, comm8],
  },
  {
    sector: "Industrial",
    description:
      "Load-bearing frames and structural design for warehouses and industrial facilities, built for the loads the job actually demands.",
    cover: indus1,
    gallery: [indus1, indus2, indus3, indus4, indus5],
  },
  {
    sector: "Institutional",
    description:
      "Structural coordination for institutional fitouts and retrofits, working around existing services and occupied buildings.",
    cover: insti1,
    gallery: [insti1, insti2, insti3, insti4, insti5, insti6],
  },
];

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Gus To",
    rating: 5,
    text: "RST Consulting has always delivered what was promised, and also at a fraction of what other engineers charges, hence why we have been using them for the past 10 years.",
  },
  {
    name: "Stephen W",
    rating: 5,
    text: "Excellent communication and very knowledgeable. Would highly recommend Ratana and RST Design and Build. Keep up the good work.",
  },
  {
    name: "Tara Nguyen",
    rating: 5,
    text: "Excellent service and very knowledgeable. Would highly recommend this company to all my friends and family.",
  },
  {
    name: "Justine Montague",
    rating: 5,
    text: "Highly professional team, reliable and responsible at all times. Highly recommended.",
  },
  {
    name: "Graham Steel",
    rating: 5,
    text: "Top company, know what they are doing and very polite.",
  },
  {
    name: "Janageeth Logeshwaran",
    rating: 5,
    text: "Attention to detail is impeccable.",
  },
  {
    name: "dan Mario",
    rating: 5,
    text: "One place to go with any construction, building or engineering needs. Panat goes above and beyond!",
  },
  {
    name: "sophoan cao",
    rating: 5,
    text: "Excellent and professional work.",
  },
];

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
}

export const services: Service[] = [
  {
    slug: "structural-design",
    title: "Structural Design",
    short: "Foundations to frameworks - safe, durable, code-compliant.",
    description:
      "Expert structural design services for residential, commercial and industrial projects. From footings and slabs through to framing, beams and connections, we deliver documentation that is safe, durable and fully code-compliant.",
    image: img4,
  },
  {
    slug: "civil-drainage",
    title: "Civil & Drainage Design",
    short: "Site development and compliance engineering.",
    description:
      "Civil engineering and drainage design supporting site development - stormwater, sewer, site grading, BlueFactor Report, WSUD, water detention systems, and Council-compliant civil documentation for a smooth approval process.",
    image: dr1,
  },
  {
    slug: "renovations",
    title: "Renovations",
    short: "From minor upgrades to complete overhauls.",
    description:
      "Professional renovation design services tailored to your budget and vision. Whether it's opening up a load-bearing wall or a full second-storey addition, we engineer changes that respect the existing structure.",
    image: img3,
  },
  {
    slug: "property-development",
    title: "Property Development",
    short: "End-to-end engineering from concept to completion.",
    description:
      "End-to-end involvement across property development projects - from feasibility and concept engineering through documentation, Council liaison and delivery on site.",
    image: img6,
  },
  {
    slug: "inspections",
    title: "Inspections",
    short: "Issuance of certificate of compliance, regulations 126",
    description:
      "On-site building and structural inspections. Independent assessment reports for existing buildings, pre-purchase checks and construction-phase compliance sign-offs.",
    image: img2,
  },
];

// EDITABLE_STAT - RST to confirm final numbers.
export const stats: { label: string; value: number; suffix?: string }[] = [
  { label: "Years operating", value: 22, suffix: "+" },
  { label: "Projects delivered", value: 7500, suffix: "+" },
  { label: "Sectors served", value: 4 },
  { label: "Google rating", value: 5, suffix: ".0" },
];

export const contact = {
  address: "Shop 11, 134 Springvale Road, Springvale VIC 3171, Australia",
  phone: "(+61) 04024 52824.",
  phoneHref: "tel:+61402452824",
  mobile: "+61 04024 52824",
  mobileHref: "tel:+61402452824",
  email: "admin@rstconsulting.com.au",
  emailHref: "mailto:admin@rstconsulting.com.au",
  hours: "Monday–Friday 9:00 AM – 5:00 PM · Saturday by appointment",
  facebook: "https://facebook.com/rstcondb",
};
