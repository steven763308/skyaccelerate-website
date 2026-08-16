// ---------------------------------------------------------------------------
// SKY ACCELERATE GROUP — 中文内容镜像
// Chinese mirror of site-config.ts. Same exported shapes/keys as the
// English version — only translatable display text differs. Structural
// fields (slug, ref, href, year, category used for filtering) are kept
// identical to English so both locales share the same routing/logic.
// ---------------------------------------------------------------------------

import { company } from "./site-config";

export { company };

export const nav = [
  { label: "首页", href: "/" },
  { label: "关于我们", href: "/about" },
  { label: "服务项目", href: "/services" },
  { label: "CIDB 顾问", href: "/cidb-advisory" },
  { label: "案例回顾", href: "/case-reviews" },
  { label: "行业洞察", href: "/insights" },
  { label: "联系我们", href: "/contact" },
];

export const footerLegalLinks = [
  { label: "隐私政策", href: "/privacy-policy" },
  { label: "使用条款", href: "/terms-of-use" },
  { label: "免责声明", href: "/disclaimer" },
];

export const coreValues = [
  {
    ref: "VAL/01",
    title: "诚信正直",
    body: "无论项目复杂程度或时间压力如何，我们在每一次合作中都秉持诚实与道德责任。",
  },
  {
    ref: "VAL/02",
    title: "专业严谨",
    body: "我们提供结构化、文件记录完善的顾问服务，建立在既定流程之上，而非临时性安排。",
  },
  {
    ref: "VAL/03",
    title: "长期伙伴关系",
    body: "相较于单次的交易性合作，我们更重视与客户建立可持续发展的合作关系。",
  },
];

export const processSteps = [
  {
    ref: "01",
    title: "了解需求",
    body: "在提出建议方案之前，我们会先花时间了解客户的业务、现有状况及目标。",
  },
  {
    ref: "02",
    title: "评估现状",
    body: "我们会检视适用的监管要求，以及客户现有或尚需准备的文件。",
  },
  {
    ref: "03",
    title: "提供建议",
    body: "我们会针对客户的具体情况，制定结构化的合规路径及务实的建议方案。",
  },
  {
    ref: "04",
    title: "协调执行",
    body: "我们会依据约定的服务范围，协助或协调相关流程，无论是内部处理或透过信赖的合作伙伴。",
  },
  {
    ref: "05",
    title: "后续跟进",
    body: "在提交申请后，我们将保持联系，并随情况变化提供相应的后续指导。",
  },
];

export const differentiators = [
  {
    ref: "WHY/01",
    title: "结构化且负责任的顾问方式",
    body: "我们采取以合规为先的方针，配合清晰的文件记录及既定流程——从初次会谈到后续跟进，涵盖了解、评估、准备、执行、跟进五个阶段。",
  },
  {
    ref: "WHY/02",
    title: "务实的实战经验",
    body: "我们的顾问建议立足于实际监管与营运要求的第一手经验，而非纸上谈兵的核对清单。",
  },
  {
    ref: "WHY/03",
    title: "整合式顾问服务",
    body: "客户往往须同时面对多项监管、商业及文件要求。我们提供的是协调统一的顾问支持，而非将各项事务分割处理。",
  },
  {
    ref: "WHY/04",
    title: "合规与职业道德优先",
    body: "遵守法规、准确的文件记录、负责任的顾问建议及风险意识，是我们运营方式的核心，而非事后补充的考量。",
  },
  {
    ref: "WHY/05",
    title: "着眼长期合作关系",
    body: "除了单次申请之外，我们更希望随着客户企业的发展，成为值得信赖的长期顾问伙伴。",
  },
];

export const timeline = [
  {
    year: "2023",
    title: "Sky Consultancy Management & Services 成立",
    body: "成立初衷为提供专业合规顾问及商业支持服务，注册编号为 IP0589323-H。",
  },
  {
    year: "2023–2025",
    title: "经验、能力与客户网络的持续发展",
    body: "持续累积监管顾问经验、拓展服务能力，并建立长期客户关系。",
  },
  {
    year: "2026",
    title: "天擎顾问集团有限公司（Sky Accelerate Group Sdn. Bhd.）正式注册成立",
    body: "作为企业平台正式注册成立，支持业务的进一步扩展与整合。",
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
    title: "CIDB 承包商合规与注册",
    summary: "为承包商注册、更新、等级升级及相关申请提供顾问支持。",
    scope: ["新注册", "更新", "等级升级", "其他相关申请"],
  },
  {
    slug: "cidb-personnel-registration",
    ref: "SVC/02",
    category: "In-House Advisory",
    title: "CIDB 人员注册",
    summary: "涵盖注册与更新事宜的人力资源及人员合规顾问服务。",
    scope: ["新注册", "更新", "其他相关申请"],
  },
  {
    slug: "cidb-product-material-compliance",
    ref: "SVC/03",
    category: "In-House Advisory",
    title: "CIDB 产品与材料合规顾问",
    summary: "就产品与材料相关要求提供监管咨询与合规指导。",
    scope: ["监管咨询", "合规指导"],
    note: "目前暂不提供 CIDB 产品与材料合规的申请代办服务。",
  },
  {
    slug: "regulatory-documentation-advisory",
    ref: "SVC/04",
    category: "In-House Advisory",
    title: "精选监管与文件顾问服务",
    summary: "提供辅助性顾问能力，包括精选的移民及文件相关事宜，例如配偶签证顾问服务。",
    scope: ["精选移民顾问", "精选文件顾问"],
  },
  {
    slug: "corporate-registration-support",
    ref: "SVC/05",
    category: "Partner-Supported Services",
    title: "公司注册支持",
    summary: "透过信赖的专业合作伙伴协调，提供 SSM 有限公司成立及注册服务。",
    scope: ["公司成立", "公司注册"],
  },
  {
    slug: "construction-regulatory-support",
    ref: "SVC/06",
    category: "Partner-Supported Services",
    title: "建筑相关监管支持",
    summary: "就 JKKP、财政部（MOF）及 SPAN 相关事宜，以及其他建筑相关许可提供协调支持。",
    scope: ["JKKP 相关支持", "财政部（MOF）相关支持", "SPAN 相关支持"],
  },
  {
    slug: "licensing-permit-support",
    ref: "SVC/07",
    category: "Partner-Supported Services",
    title: "精选执照与许可支持",
    summary: "如有需要，透过信赖的专业合作伙伴协调提供其他执照及商业支持服务。",
    scope: ["其他相关许可", "其他执照支持"],
  },
];

export type CaseReview = {
  ref: string;
  category: string;
  situation: string;
  requirement: string;
  role: string;
  outcome: string;
};

export const caseReviews: CaseReview[] = [
  {
    ref: "CASE/2026-01",
    category: "CIDB PPK 承包商注册",
    situation: "一家新成立的承包公司须先完成 PPK 注册，方可投标符合其等级的项目。",
    requirement: "根据现行 CIDB 要求，确认申请资格、整理所需文件，并确定适用类别与等级。",
    role: "天擎顾问集团审视了该公司的现状，就适用类别与等级提供建议，并协助准备及整理所需文件。",
    outcome: "申请已依据当时确认的要求，以有条理且结构化的方式提交。",
  },
  {
    ref: "CASE/2026-02",
    category: "承包商等级升级",
    situation: "一家现有 G3 承包商希望升级等级，以承接价值更高的项目。",
    requirement: "评估与较高等级相关的财务、技术及人员条件。",
    role: "天擎顾问集团就升级条件所欠缺的文件提供建议，并协调准备相关支持性申请材料。",
    outcome: "升级申请已依据顾问过程中确认的文件要求，完成结构化整理并提交。",
  },
  {
    ref: "CASE/2026-03",
    category: "注册更新",
    situation: "一家承包商的注册即将到期，但对更新时限及最新文件要求存在内部不确定性。",
    requirement: "在更新的财务及人员文件支持下，及时完成更新申请。",
    role: "天擎顾问集团依据客户现有记录检视更新清单，并协调整理最新所需文件。",
    outcome: "更新申请已在到期前，以结构化且及时的方式完成提交。",
  },
  {
    ref: "CASE/2026-04",
    category: "监管问题处理",
    situation: "一家承包商因文件不符问题，导致一项待审申请陷入停滞。",
    requirement: "厘清文件不符之处，并依据适用要求准备更正后的申请材料。",
    role: "天擎顾问集团审视相关问题，就所需的更正文件提供建议，并协调重新提交。",
    outcome: "已完成更正申请的准备与提交，并以结构化方式解决所发现的问题。",
  },
];

export const insightPlaceholders = [
  {
    ref: "INS/01",
    category: "CIDB 承包商注册",
    title: "理解 CIDB 承包商注册：结构化概览",
    status: "草稿——待验证",
  },
  {
    ref: "INS/02",
    category: "CIDB 更新",
    title: "承包商在更新前常忽略的事项",
    status: "草稿——待验证",
  },
  {
    ref: "INS/03",
    category: "承包商等级要求",
    title: "等级升级：评估流程通常如何进行",
    status: "草稿——待验证",
  },
  {
    ref: "INS/04",
    category: "人员合规",
    title: "人员注册与劳动力合规，一次说清楚",
    status: "草稿——待验证",
  },
  {
    ref: "INS/05",
    category: "建筑合规",
    title: "为何合规应被视为风险管理，而非文书作业",
    status: "草稿——待验证",
  },
  {
    ref: "INS/06",
    category: "监管动态",
    title: "掌握建筑行业监管变化的最新动态",
    status: "草稿——待验证",
  },
];

export const serviceDropdownOptions = [
  "CIDB 承包商注册",
  "CIDB 更新",
  "CIDB 等级升级",
  "CIDB 人员注册",
  "CIDB 产品／材料顾问",
  "其他监管顾问",
  "合作伙伴支持服务",
  "其他询问",
];
