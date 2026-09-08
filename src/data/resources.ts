export interface ResourceItem {
  id: string;
  title: string;
  category: 'DATASETS' | 'APIS' | 'DOCUMENTATION' | 'STARTER_KITS' | 'GITHUB';
  description: string;
  url: string;
  tags: string[];
}

export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: 'sdg-2030-datasets',
    title: 'UN SDG 2030 Data & Indicators Portal',
    category: 'DATASETS',
    description: 'Comprehensive global and national indicators, economic statistics, and sustainability metrics for SDG 2030 target modeling.',
    url: 'https://sdgs.un.org/goals',
    tags: ['SDG 2030', 'Sustainability', 'Indicators', 'Statistics']
  },
  {
    id: 'fintech-api-kit',
    title: 'Financial Services & Open Banking API Kit',
    category: 'APIS',
    description: 'Sandbox REST APIs for digital payment processing, credit scoring telemetry, and micro-investment simulations.',
    url: 'https://skh.sanjivaniuniversity.com',
    tags: ['FinTech', 'REST API', 'Banking', 'Fraud Detection']
  },
  {
    id: 'consumer-analytics-doc',
    title: 'Consumer Behavior & Sentiment Analytics Guide',
    category: 'DOCUMENTATION',
    description: 'Methodology frameworks for ethical AI marketing, sentiment processing, and anti-greenwashing audit tools.',
    url: 'https://skh.sanjivaniuniversity.com',
    tags: ['Analytics', 'NLP', 'Consumer Intel', 'Marketing']
  },
  {
    id: 'supply-chain-kit',
    title: 'Smart Logistics & Route Optimization Starter Kit',
    category: 'STARTER_KITS',
    description: 'Algorithms and open-source boilerplates for fleet routing, GIS mapping, and inventory demand forecasting.',
    url: 'https://skh.sanjivaniuniversity.com',
    tags: ['Logistics', 'GIS', 'Supply Chain', 'Python']
  },
  {
    id: 'pragyan-starter-template',
    title: 'Pragyan 2K26 Official React & Node Template',
    category: 'GITHUB',
    description: 'Clean neo-brutalist starter boilerplate with pre-built UI components, pitch deck templates, and API helpers.',
    url: 'https://github.com',
    tags: ['GitHub', 'Boilerplate', 'React', 'Node.js']
  }
];
