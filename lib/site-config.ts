// ---------------------------------------------------------------------------
// SKY ACCELERATE GROUP — CENTRAL SITE CONFIGURATION
// Edit company details, contact info, navigation, services and case studies
// here. Nothing below should be hard-coded again inside individual pages.
// ---------------------------------------------------------------------------

export const company = {
  legalName: "Sky Accelerate Group Sdn. Bhd.",
  shortName: "Sky Accelerate Group",
  brandInitials: "SAG",
  registrationNo: "202601003591 (1665688-W)",
  incorporated: "January 2026",
  originEntity: "Sky Consultancy Management & Services",
  originRegistrationNo: "IP0589323-H",
  originEstablished: "September 2023",
  address: {
    line1: "No. 10A, 1st Floor, Jalan SS2/67",
    line2: "47300 Petaling Jaya, Selangor, Malaysia",
  },
  contact: {
    email: "enquiry@skyaccelerate.com",
    phoneDisplay: "+6012-558 3398",
    phoneHref: "+60125583398",
    whatsappHref: "https://wa.me/60125583398",
  },
  domain: "skyaccelerate.com",
  siteUrl: "https://skyaccelerate.com",
};

export type NavLink = { label: string; href: string };
// A top-level menu entry; `children` show as a dropdown in the header
// (the parent itself still links to its own page).
export type NavItem = NavLink & { children?: NavLink[] };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Case Reviews", href: "/case-reviews" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services" },
      { label: "CIDB Advisory", href: "/cidb-advisory" },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

// Every page in the menu once, in menu order (for the footer).
export const flattenNav = (items: NavItem[]): NavLink[] => {
  const seen = new Set<string>();
  return items
    .flatMap((item) => (item.children?.length ? item.children : [item]))
    .filter((link) => (seen.has(link.href) ? false : (seen.add(link.href), true)));
};

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export const coreValues = [
  {
    ref: "VAL/01",
    title: "Integrity",
    body: "We act with honesty and ethical responsibility in every engagement, regardless of complexity or timeline pressure.",
  },
  {
    ref: "VAL/02",
    title: "Professionalism",
    body: "We deliver structured, well-documented advisory services built on defined processes rather than ad-hoc arrangements.",
  },
  {
    ref: "VAL/03",
    title: "Long-Term Partnership",
    body: "We value sustainable collaboration with our clients over purely transactional, one-off engagements.",
  },
];

export const processSteps = [
  {
    ref: "01",
    title: "Understand",
    body: "We take time to understand the client's business, current standing and objectives before proposing a path forward.",
  },
  {
    ref: "02",
    title: "Assess",
    body: "We review the applicable regulatory requirements and the documentation the client currently holds or needs to prepare.",
  },
  {
    ref: "03",
    title: "Advise",
    body: "We set out a structured compliance pathway and practical recommendations specific to the client's circumstances.",
  },
  {
    ref: "04",
    title: "Coordinate",
    body: "We assist or coordinate the relevant process in line with the agreed service scope, in-house or through trusted partners.",
  },
  {
    ref: "05",
    title: "Follow Through",
    body: "We maintain communication after submission and provide relevant follow-up guidance as circumstances evolve.",
  },
];

export const differentiators = [
  {
    ref: "WHY/01",
    title: "Structured & Responsible Advisory",
    body: "We adopt a compliance-first approach with clear documentation and a defined process from first conversation to follow-up — Understand, Assess, Prepare, Execute, Follow Up.",
  },
  {
    ref: "WHY/02",
    title: "Practical, Hands-On Experience",
    body: "Our advisory is grounded in practical exposure to real regulatory and operational requirements, not theoretical checklists.",
  },
  {
    ref: "WHY/03",
    title: "Integrated Advisory",
    body: "Clients often face multiple regulatory, business and documentation requirements at once. We provide a coordinated point of advisory rather than treating each matter in isolation.",
  },
  {
    ref: "WHY/04",
    title: "Compliance & Ethics First",
    body: "Regulatory adherence, accurate documentation, responsible advisory and risk awareness sit at the centre of how we operate — this is a core differentiator, not an afterthought.",
  },
  {
    ref: "WHY/05",
    title: "Long-Term Partnership",
    body: "Beyond individual applications, we aim to become a reliable advisory partner as our clients' businesses evolve.",
  },
];

export const timeline = [
  {
    year: "2023",
    title: "Sky Consultancy Management & Services established",
    body: "Founded to provide professional compliance advisory and business support services, registered as IP0589323-H.",
  },
  {
    year: "2023–2025",
    title: "Experience, capability and client network development",
    body: "Continued development of regulatory advisory experience, service capabilities and long-term client relationships.",
  },
  {
    year: "2026",
    title: "Sky Accelerate Group Sdn. Bhd. incorporated",
    body: "Incorporated as the corporate platform to support the further expansion and integration of the business.",
  },
];

export type ServiceItem = {
  slug: string;
  ref: string;
  category: "In-House Advisory" | "Partner-Supported Services";
  title: string;
  summary: string;
  scope: string[];
  note?: string;
};

export const services: ServiceItem[] = [
  {
    slug: "cidb-contractor-compliance",
    ref: "SVC/01",
    category: "In-House Advisory",
    title: "CIDB Contractor Compliance & Registration",
    summary:
      "Advisory support for contractor registration, renewal, grade upgrading and related applications.",
    scope: ["New Registration", "Renewal", "Grade Upgrade", "Related Applications"],
  },
  {
    slug: "cidb-personnel-registration",
    ref: "SVC/02",
    category: "In-House Advisory",
    title: "CIDB Personnel Registration",
    summary:
      "Workforce and personnel compliance advisory covering registration and renewal matters.",
    scope: ["New Registration", "Renewal", "Related Applications"],
  },
  {
    slug: "cidb-product-material-compliance",
    ref: "SVC/03",
    category: "In-House Advisory",
    title: "CIDB Product & Material Compliance Advisory",
    summary:
      "Regulatory consultation and compliance guidance on product and material requirements.",
    scope: ["Regulatory Consultation", "Compliance Guidance"],
    note: "Application handling for CIDB product and material compliance is currently not available.",
  },
  {
    slug: "regulatory-documentation-advisory",
    ref: "SVC/04",
    category: "In-House Advisory",
    title: "Selected Regulatory & Documentation Advisory",
    summary:
      "Supporting advisory capabilities including selected immigration and documentation matters, such as spouse visa advisory.",
    scope: ["Selected Immigration Advisory", "Selected Documentation Advisory"],
  },
  {
    slug: "corporate-registration-support",
    ref: "SVC/05",
    category: "Partner-Supported Services",
    title: "Corporate Registration Support",
    summary:
      "SSM Sdn. Bhd. incorporation and registration, coordinated through trusted professional partners.",
    scope: ["Company Incorporation", "Corporate Registration"],
  },
  {
    slug: "construction-regulatory-support",
    ref: "SVC/06",
    category: "Partner-Supported Services",
    title: "Construction-Related Regulatory Support",
    summary:
      "Coordination support for JKKP, MOF and SPAN-related matters and other construction-related permits.",
    scope: ["JKKP-Related Support", "MOF-Related Support", "SPAN-Related Support"],
  },
  {
    slug: "licensing-permit-support",
    ref: "SVC/07",
    category: "Partner-Supported Services",
    title: "Selected Licensing & Permit Support",
    summary:
      "Additional licensing and business support services coordinated with trusted professional partners as required.",
    scope: ["Other Relevant Permits", "Other Licensing Support"],
  },
];

export type CaseReview = {
  ref: string;
  category: string;
  situation: string;
  requirement: string;
  role: string;
  outcome: string;
  /** Optional path (under /public) to a redacted supporting certificate,
   * shown as a small thumbnail on the case card. */
  image?: string;
};

export const caseReviews: CaseReview[] = [
  {
    ref: "CASE/2026-01",
    category: "CIDB PPK Contractor Registration",
    situation:
      "A newly formed contracting company required PPK registration before it could tender for grade-appropriate projects.",
    requirement:
      "Eligibility confirmation, documentation compilation and category/grade determination under prevailing CIDB requirements.",
    role:
      "SAG reviewed the company's standing, advised on the applicable category and grade, and assisted in preparing and organising the required documentation.",
    outcome:
      "Application was submitted in an organised and structured manner in line with the requirements identified at the time.",
    image: "/brand/cidb-ppk-certificate.png",
  },
  {
    ref: "CASE/2026-02",
    category: "Contractor Grade Upgrade",
    situation:
      "An existing G3 contractor sought to upgrade its grade to take on larger-value projects.",
    requirement:
      "Assessment of financial, technical and personnel criteria associated with the higher grade band.",
    role:
      "SAG advised on the documentation gaps against the upgrade criteria and coordinated preparation of the supporting submission.",
    outcome:
      "The upgrade application was structured and submitted according to the documented requirements identified during the advisory process.",
  },
  {
    ref: "CASE/2026-03",
    category: "Registration Renewal",
    situation:
      "A contractor's registration was approaching expiry, with internal uncertainty over renewal timelines and updated document requirements.",
    requirement:
      "Timely renewal filing supported by updated financial and personnel documentation.",
    role:
      "SAG reviewed the renewal checklist against the client's existing records and coordinated the assembly of updated documentation.",
    outcome:
      "The renewal submission was completed in a structured and timely manner ahead of expiry.",
  },
  {
    ref: "CASE/2026-04",
    category: "Regulatory Issue Resolution",
    situation:
      "A contractor encountered a documentation discrepancy that had stalled a pending application.",
    requirement:
      "Clarification of the discrepancy and preparation of a corrected submission in line with applicable requirements.",
    role:
      "SAG reviewed the matter, advised on the corrective documentation required, and coordinated a revised submission.",
    outcome:
      "A corrected submission was prepared and lodged in a structured manner addressing the identified discrepancy.",
  },
  {
    ref: "CASE/2026-05",
    category: "SPKK — Government Work Procurement Certification",
    situation:
      "A G3 contractor wished to tender for government construction projects but had not yet obtained the certification required for government project eligibility.",
    requirement:
      "Assessment of eligibility for Sijil Perolehan Kerja Kerajaan (SPKK) and preparation of the supporting documentation under the applicable CIDB requirements.",
    role:
      "SAG advised on the SPKK eligibility criteria, reviewed the client's existing registration standing, and assisted in preparing and organising the required documentation.",
    outcome:
      "The SPKK application was submitted in an organised and structured manner in line with the requirements identified at the time.",
    image: "/brand/cidb-spkk-certificate.png",
  },
  {
    ref: "CASE/2026-06",
    category: "CIDB Personnel Registration",
    situation:
      "An individual required CIDB Personnel Binaan registration to formalise their standing as registered construction personnel.",
    requirement:
      "Confirmation of the applicable registration category and preparation of the supporting documentation under prevailing CIDB requirements.",
    role:
      "SAG advised on the applicable personnel category and assisted in preparing and organising the required documentation for submission.",
    outcome:
      "The registration was completed and the CIDB Personnel Registration Certificate (ePASS) was issued in line with the requirements identified at the time.",
    image: "/brand/cidb-personnel-epass.jpg",
  },
];

export const insightPlaceholders = [
  {
    ref: "INS/01",
    category: "CIDB Contractor Registration",
    title: "Understanding CIDB Contractor Registration: A Structured Overview",
    status: "Draft — Pending Verification",
  },
  {
    ref: "INS/02",
    category: "CIDB Renewal",
    title: "What Contractors Commonly Overlook Before Renewal",
    status: "Draft — Pending Verification",
  },
  {
    ref: "INS/03",
    category: "Contractor Grade Requirements",
    title: "Grade Upgrading: How the Assessment Process Generally Works",
    status: "Draft — Pending Verification",
  },
  {
    ref: "INS/04",
    category: "Personnel Compliance",
    title: "Personnel Registration and Workforce Compliance, Explained",
    status: "Draft — Pending Verification",
  },
  {
    ref: "INS/05",
    category: "Construction Compliance",
    title: "Why Compliance Should Be Treated as Risk Management, Not Paperwork",
    status: "Draft — Pending Verification",
  },
  {
    ref: "INS/06",
    category: "Regulatory Updates",
    title: "Staying Ahead of Regulatory Change in the Construction Sector",
    status: "Draft — Pending Verification",
  },
];

export const serviceDropdownOptions = [
  "CIDB Contractor Registration",
  "CIDB Renewal",
  "CIDB Grade Upgrade",
  "CIDB Personnel Registration",
  "CIDB Product / Material Advisory",
  "Other Regulatory Advisory",
  "Partner-Supported Services",
  "Other Enquiry",
];
