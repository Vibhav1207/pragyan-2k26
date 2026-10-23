import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import { ProblemStatement, Track, SystemSettings, Admin, User } from './models.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vibhavpateltechfest_db_user:TechfestPass2026@task1web.qqdtxkg.mongodb.net/pragyan?retryWrites=true&w=majority&appName=task1web';

const PROBLEM_STATEMENTS = [
  // --- TRACK 1: FINTECH & FINANCIAL INNOVATION ---
  {
    psId: 'TRACK-1-01',
    trackId: 'TRK-01',
    trackTitle: 'FINTECH & FINANCIAL INNOVATION',
    subTrack: 'Financial Resilience',
    title: 'TRACK 1-01: AI-Enabled Financial Resilience Infrastructure for Informal and Seasonal Workers',
    description: 'Design and build an AI-driven financial resilience platform tailored for informal and seasonal workers with irregular cash flows, providing micro-savings, dynamic liquidity buffers, and emergency micro-credit with explainable decisioning.',
    difficulty: 'Advanced',
    order: 1,
    isVisible: true
  },
  {
    psId: 'TRACK-1-02',
    trackId: 'TRK-01',
    trackTitle: 'FINTECH & FINANCIAL INNOVATION',
    subTrack: 'MSME Credit Readiness',
    title: 'TRACK 1-02: Explainable Alternative-Data Credit Readiness for MSMEs Without Black-Box Lending',
    description: 'Construct an alternative-data credit assessment system using utility, GST, supplier transaction history, and business metrics without proprietary black-box scoring, ensuring full explainability and fair access for credit-invisible enterprises.',
    difficulty: 'Advanced',
    order: 2,
    isVisible: true
  },
  {
    psId: 'TRACK-1-03',
    trackId: 'TRK-01',
    trackTitle: 'FINTECH & FINANCIAL INNOVATION',
    subTrack: 'Digital Commerce Security',
    title: 'TRACK 1-03: Fraud-Resilient Digital Commerce: AI Scam Detection with Human-Verified Response',
    description: 'Develop a real-time behavioral fraud and phishing detection engine for instant payments and digital commerce, coupling autonomous anomaly detection with structured human-in-the-loop verification to prevent financial losses.',
    difficulty: 'Intermediate',
    order: 3,
    isVisible: true
  },
  {
    psId: 'TRACK-1-04',
    trackId: 'TRK-01',
    trackTitle: 'FINTECH & FINANCIAL INNOVATION',
    subTrack: 'Parametric Insurance',
    title: 'TRACK 1-04: Climate- and Crop-Sensitive Parametric Protection for Small Producers',
    description: 'Engineer a weather-index and satellite-anchored parametric insurance architecture that triggers automated, tamper-proof micro-payouts for smallholder farmers during unseasonal rains, drought, or heat stress events.',
    difficulty: 'Advanced',
    order: 4,
    isVisible: true
  },
  {
    psId: 'TRACK-1-05',
    trackId: 'TRK-01',
    trackTitle: 'FINTECH & FINANCIAL INNOVATION',
    subTrack: 'Financial Inclusion',
    title: 'TRACK 1-05: Interoperable Benefits and Entitlement Navigation for Financial Inclusion',
    description: 'Build an open and accessible digital entitlements navigator allowing citizens to discover, verify eligibility, and claim central and state social safety net benefits seamlessly with vernacular voice and text guidance.',
    difficulty: 'Intermediate',
    order: 5,
    isVisible: true
  },

  // --- TRACK 2: MARKETING & CONSUMER INTELLIGENCE ---
  {
    psId: 'TRACK-2-01',
    trackId: 'TRK-02',
    trackTitle: 'MARKETING & CONSUMER INTELLIGENCE',
    subTrack: 'Market Access & Demand',
    title: 'TRACK 2-01: AI Market-Access and Demand Intelligence for Regional MSMEs and Artisans',
    description: 'Create an intelligent localized demand forecasting and market-access discovery engine empowering regional artisans and micro-producers with pricing guidance, trend forecasting, and direct consumer channel linkage.',
    difficulty: 'Intermediate',
    order: 6,
    isVisible: true
  },
  {
    psId: 'TRACK-2-02',
    trackId: 'TRK-02',
    trackTitle: 'MARKETING & CONSUMER INTELLIGENCE',
    subTrack: 'Food-Surplus Exchange',
    title: 'TRACK 2-02: Predictive Food-Surplus Exchange with Dynamic Allocation and Food-Safety Controls',
    description: 'Formulate a hyper-local surplus food redistribution network with real-time demand-supply matching, cold-chain safety validation, shelf-life prediction, and transparent allocation to charities and food banks.',
    difficulty: 'Advanced',
    order: 7,
    isVisible: true
  },
  {
    psId: 'TRACK-2-03',
    trackId: 'TRK-02',
    trackTitle: 'MARKETING & CONSUMER INTELLIGENCE',
    subTrack: 'Responsible Personalisation',
    title: 'TRACK 2-03: Privacy-Preserving Consumer Intelligence for Responsible Personalisation',
    description: 'Build a zero-knowledge or federated consumer recommendation framework delivering personalized user experiences without collecting or centralizing raw personally identifiable customer browsing records.',
    difficulty: 'Advanced',
    order: 8,
    isVisible: true
  },
  {
    psId: 'TRACK-2-04',
    trackId: 'TRK-02',
    trackTitle: 'MARKETING & CONSUMER INTELLIGENCE',
    subTrack: 'Consumer Verification',
    title: 'TRACK 2-04: Multilingual Misinformation and Green-Claims Verification for Consumers',
    description: 'Architect a multilingual factual verification system analyzing claims made in e-commerce product listings and sustainability certifications, flagging greenwashing and deceptive marketing in real time.',
    difficulty: 'Intermediate',
    order: 9,
    isVisible: true
  },
  {
    psId: 'TRACK-2-05',
    trackId: 'TRK-02',
    trackTitle: 'MARKETING & CONSUMER INTELLIGENCE',
    subTrack: 'Regional Tourism & Economy',
    title: 'TRACK 2-05: Tourism Demand, Carrying Capacity and Local-Value Optimisation for Shirdi Region',
    description: 'Develop a smart footfall estimation, crowding forecast, and local commerce aggregator for the Shirdi religious tourism circuit that balances pilgrim flow with local vendor economic opportunity.',
    difficulty: 'Intermediate',
    order: 10,
    isVisible: true
  },

  // --- TRACK 3: SMART OPERATIONS & SUSTAINABLE SUPPLY CHAIN ---
  {
    psId: 'TRACK-3-01',
    trackId: 'TRK-03',
    trackTitle: 'SMART OPERATIONS & SUSTAINABLE SUPPLY CHAIN',
    subTrack: 'Water Intelligence',
    title: 'TRACK 3-01: Climate-Resilient Water Intelligence for Campuses, Towns and Small Industries',
    description: 'Build an IoT and predictive water monitoring platform for industrial clusters and educational campuses, tracking aquifer extraction, leakages, greywater recycling quality, and weather-driven replenishment.',
    difficulty: 'Advanced',
    order: 11,
    isVisible: true
  },
  {
    psId: 'TRACK-3-02',
    trackId: 'TRK-03',
    trackTitle: 'SMART OPERATIONS & SUSTAINABLE SUPPLY CHAIN',
    subTrack: 'Cold-Chain & Post-Harvest',
    title: 'TRACK 3-02: AI-Driven Cold-Chain and Post-Harvest Loss Prevention for Perishable Producers',
    description: 'Design an end-to-end perishable farm-to-table transit monitor leveraging low-cost temperature sensors and AI remaining-shelf-life calculation to dynamically reroute expiring produce to closest markets.',
    difficulty: 'Advanced',
    order: 12,
    isVisible: true
  },
  {
    psId: 'TRACK-3-03',
    trackId: 'TRK-03',
    trackTitle: 'SMART OPERATIONS & SUSTAINABLE SUPPLY CHAIN',
    subTrack: 'Circular Manufacturing',
    title: 'TRACK 3-03: Circular Manufacturing Intelligence for MSME Industrial Clusters',
    description: 'Create an industrial symbiosis exchange platform where byproduct waste, scrap materials, and thermal energy from one MSME facility can be automatically matched and traded with nearby facilities requiring them.',
    difficulty: 'Intermediate',
    order: 13,
    isVisible: true
  },
  {
    psId: 'TRACK-3-04',
    trackId: 'TRK-03',
    trackTitle: 'SMART OPERATIONS & SUSTAINABLE SUPPLY CHAIN',
    subTrack: 'Predictive Maintenance',
    title: 'TRACK 3-04: AI-Enabled Predictive Maintenance and Energy Optimisation for Small Facilities',
    description: 'Deploy vibration and energy load anomaly models for light manufacturing machines and solar pump installations to pre-empt critical breakdowns and reduce operational energy waste.',
    difficulty: 'Advanced',
    order: 14,
    isVisible: true
  },
  {
    psId: 'TRACK-3-05',
    trackId: 'TRK-03',
    trackTitle: 'SMART OPERATIONS & SUSTAINABLE SUPPLY CHAIN',
    subTrack: 'Logistics Digital Twin',
    title: 'TRACK 3-05: Disruption-Aware Logistics Twin for Regional Supply Networks',
    description: 'Develop a simulation twin for regional freight and tier-2/3 distribution hubs that dynamically suggests multi-modal rerouting and buffer restocking when weather or highway congestion strikes.',
    difficulty: 'Intermediate',
    order: 15,
    isVisible: true
  },

  // --- TRACK 4: ENTREPRENEURSHIP & FUTURE OF MANAGEMENT ---
  {
    psId: 'TRACK-4-01',
    trackId: 'TRK-04',
    trackTitle: 'ENTREPRENEURSHIP & FUTURE OF MANAGEMENT',
    subTrack: 'MSME Productivity',
    title: 'TRACK 4-01: AI Co-Pilot for MSME Productivity with Verifiable Return on Investment',
    description: 'Build an intuitive operational co-pilot for micro-enterprise founders that automates tax compliance, quotation generation, vendor reconciliations, and provides quantifiable time/cost savings audits.',
    difficulty: 'Intermediate',
    order: 16,
    isVisible: true
  },
  {
    psId: 'TRACK-4-02',
    trackId: 'TRK-04',
    trackTitle: 'ENTREPRENEURSHIP & FUTURE OF MANAGEMENT',
    subTrack: 'Circular Enterprise',
    title: 'TRACK 4-02: Circular Enterprise Launchpad: Convert Local Waste Streams into Bankable Businesses',
    description: 'Formulate an incubation toolkit and financial feasibility modeling engine that guides grassroots entrepreneurs in converting agricultural biomass, plastic, or organic waste into commercially viable products.',
    difficulty: 'Advanced',
    order: 17,
    isVisible: true
  },
  {
    psId: 'TRACK-4-03',
    trackId: 'TRK-04',
    trackTitle: 'ENTREPRENEURSHIP & FUTURE OF MANAGEMENT',
    subTrack: 'Skills & Livelihood',
    title: 'TRACK 4-03: Inclusive Skills-to-Livelihood Marketplace with Proof of Competence',
    description: 'Architect a verifiable competency credentialing engine connecting vocational learners and gig professionals with local employment opportunities based on demonstrated project evidence over resume screening.',
    difficulty: 'Intermediate',
    order: 18,
    isVisible: true
  },
  {
    psId: 'TRACK-4-04',
    trackId: 'TRK-04',
    trackTitle: 'ENTREPRENEURSHIP & FUTURE OF MANAGEMENT',
    subTrack: 'Climate Adaptation',
    title: 'TRACK 4-04: AI-Assisted Climate Adaptation Enterprise for Vulnerable Communities',
    description: 'Develop a community climate resilience planner and project finance matching portal helping vulnerable local councils, cooperatives, and SHGs fund and implement micro-solar, rainwater, and soil regeneration.',
    difficulty: 'Advanced',
    order: 19,
    isVisible: true
  },
  {
    psId: 'TRACK-4-05',
    trackId: 'TRK-04',
    trackTitle: 'ENTREPRENEURSHIP & FUTURE OF MANAGEMENT',
    subTrack: 'Responsible AI Governance',
    title: 'TRACK 4-05: Responsible AI Governance and Compliance Toolkit for Small Organisations',
    description: 'Engineer a lightweight automated compliance audit suite checking algorithmic bias, DPDP/GDPR data security, model drift, and explainability for emerging tech startups with limited compliance budgets.',
    difficulty: 'Advanced',
    order: 20,
    isVisible: true
  }
];

async function seedData() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    // 1. Ensure dhirajpatil7170@gmail.com is granted admin access
    const adminEmails = [
      { email: 'vibhav07patel@gmail.com', name: 'Vibhav Patel' },
      { email: 'dhirajpatil7170@gmail.com', name: 'Dhiraj Patil' },
      { email: 'shirajpatil7170@gmail.com', name: 'Shiraj Patil' },
      { email: 'admin@sanjivani.edu.in', name: 'PRAGYAN Super Admin' }
    ];

    for (const adm of adminEmails) {
      await Admin.findOneAndUpdate(
        { email: adm.email },
        { 
          $set: { role: 'ADMIN', name: adm.name },
          $setOnInsert: { passwordHash: 'oauth-google-managed' } 
        },
        { upsert: true }
      );
      await User.findOneAndUpdate(
        { email: adm.email },
        { $set: { role: 'ADMIN', name: adm.name } },
        { upsert: false }
      );
    }
    console.log('✅ Admin privileges guaranteed for dhirajpatil7170@gmail.com');

    // 2. Upsert each Problem Statement
    for (const ps of PROBLEM_STATEMENTS) {
      await ProblemStatement.findOneAndUpdate(
        { psId: ps.psId },
        { 
          $set: {
            trackId: ps.trackId,
            trackTitle: ps.trackTitle,
            subTrack: ps.subTrack,
            title: ps.title,
            description: ps.description,
            difficulty: ps.difficulty,
            order: ps.order,
            isVisible: true,
            updatedAt: new Date()
          },
          $setOnInsert: {
            documentName: '',
            documentUrl: '',
            documentSize: '',
            fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            createdAt: new Date()
          }
        },
        { upsert: true }
      );
    }
    console.log(`✅ Upserted ${PROBLEM_STATEMENTS.length} official problem statements across all 4 tracks.`);

    // 3. Ensure global PS visibility in SystemSettings is enabled
    await SystemSettings.updateOne({}, { $set: { psGlobalVisible: true } }, { upsert: true });
    console.log('✅ SystemSettings psGlobalVisible set to true');

    console.log('🎉 Seeding successfully finished!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
}

seedData();
