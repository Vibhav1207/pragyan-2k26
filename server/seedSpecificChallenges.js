import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import { HackathonChallenge } from './models.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) { }

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vibhavpateltechfest_db_user:TechfestPass2026@task1web.qqdtxkg.mongodb.net/pragyan?retryWrites=true&w=majority&appName=task1web';

const PS_CHALLENGES = [
  // =========================================================================
  // TRACK 3 — SMART OPERATIONS & SUSTAINABLE SUPPLY CHAIN
  // =========================================================================

  // PS ID: TRACK 3-01
  {
    psId: 'TRACK-3-01',
    trackId: 'TRK-03',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Choose a defined system boundary and map sources, storage, demand groups, losses and service interruptions. Define baseline reliability and an equity measure for allocation.',
        deliverables: ['System boundary map (sources, storage, demand groups)', 'Baseline reliability audit & equity metric definition'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Build a water-balance dataset using sample or synthetic readings, weather scenarios, occupancy/production schedules and leak events. Document uncertainty and missing sensor conditions.',
        deliverables: ['Synthetic water-balance dataset & weather scenarios', 'Sensor uncertainty & missing condition documentation'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Prototype demand forecasting, anomaly detection or allocation scenarios with understandable explanations and a manual override for operators.',
        deliverables: ['Demand forecasting & anomaly detection prototype', 'Explainable alert panel with operator manual override'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Test drought, sudden demand spikes, sensor failure and conflicting stakeholder needs. Measure forecast error, time to detect anomalies, avoided loss estimates and distributional consequences.',
        deliverables: ['Stress test report (drought, spikes, sensor failures)', 'Accuracy metrics (forecast error, detection time, avoided loss)'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Design a deployable model for campuses, industrial clusters, utilities or local bodies. Include sensor/data costs, maintenance, governance, payment mechanism, emergency protocols and SDG 6 outcomes.',
        deliverables: ['Cluster deployment blueprint & maintenance budget', 'Governance, emergency protocol & SDG 6 outcomes pitch deck'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 3-02
  {
    psId: 'TRACK-3-02',
    trackId: 'TRK-03',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Select a perishable commodity and map harvest-to-market stages, loss points, temperature exposure, quality grading and who bears each loss.',
        deliverables: ['Harvest-to-market lifecycle loss mapping', 'Stakeholder loss allocation & temperature exposure analysis'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Create a dataset or simulator combining time-temperature exposure, transit time, storage capacity, price changes and demand. Separate measured values from assumptions and avoid unsupported food-safety claims.',
        deliverables: ['Time-temperature & transit duration simulator dataset', 'Assumptions vs measured data register'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Build a prototype that recommends dispatch, storage, sale, processing or redistribution options with explainable trade-offs and low-tech fallback procedures.',
        deliverables: ['Dynamic routing & post-harvest dispatch engine', 'Explainable trade-off matrix & low-tech fallback protocols'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Stress-test power outages, delayed vehicles, sensor failure, price shocks and incorrect quality data. Compare estimated loss, margin, energy use and service reliability with a baseline.',
        deliverables: ['Outage & delay simulation benchmarks', 'Comparative loss reduction & margin analysis vs baseline'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Present a business model for FPOs, aggregators, cold stores, logistics firms or buyers. Include shared asset utilisation, maintenance, financing, farmer value capture and measurable SDG 2/12 outcomes.',
        deliverables: ['FPO/Aggregator operating financial model', 'Farmer value capture strategy & SDG 2/12 metrics pitch'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 3-03
  {
    psId: 'TRACK-3-03',
    trackId: 'TRK-03',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Select an industrial cluster or plausible group of firms and map inputs, outputs, rejects, energy use and waste disposal routes. Identify the material streams with the strongest potential for circular use.',
        deliverables: ['Industrial cluster input-output flow mapping', 'Priority circular material streams prioritization matrix'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Create a synthetic material-flow inventory with volumes, quality grades, timing, transport distance, handling requirements and indicative costs. Identify data firms may not wish to disclose.',
        deliverables: ['Cluster material-flow inventory dataset', 'Confidentiality boundaries & proprietary data disclosure analysis'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Build a matching and scenario tool that pairs compatible by-products with potential users, estimates logistics and processing costs, and allows firms to share only necessary information.',
        deliverables: ['By-product compatibility matching engine', 'Logistics/processing cost estimator with privacy filters'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Test changes in material quality, irregular supply, transport costs and a buyer withdrawing. Estimate net material diverted, cost savings, additional emissions and contamination/compliance risks.',
        deliverables: ['Supply volatility & buyer withdrawal sensitivity test', 'Net diverted material, emission & cost savings calculation'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Develop a cluster-level revenue and governance model: membership, transaction fee, verification service or shared logistics. Specify quality assurance, liability, confidentiality, dispute resolution and auditable circularity metrics.',
        deliverables: ['Cluster governance charter & fee structure', 'Quality assurance liability, dispute resolution & circularity audit'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 3-04
  {
    psId: 'TRACK-3-04',
    trackId: 'TRK-03',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Choose one equipment/process type and map failure consequences, maintenance practice, energy use and data availability. Define a measurable baseline such as downtime, energy per unit or response time.',
        deliverables: ['Failure mode & consequence map for target machinery', 'Measurable baseline (downtime, specific energy consumption)'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Develop a labelled synthetic or sample dataset of operating signals, maintenance logs and energy patterns. Specify data quality, sampling frequency and plausible fault signatures.',
        deliverables: ['Labelled machine telemetry & energy dataset', 'Sampling frequency & fault signature taxonomy'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Build an anomaly detection or predictive-maintenance prototype with interpretable alerts, confidence levels and a prioritised maintenance queue; add an energy-use scenario comparison.',
        deliverables: ['Predictive anomaly detection prototype', 'Prioritized maintenance queue & energy-use scenario comparator'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Test on unseen scenarios, noisy sensors, changing workloads and rare failures. Evaluate false alarms, missed events, response usefulness, estimated energy savings and total cost of ownership.',
        deliverables: ['Sensor noise & edge-case stress test report', 'Precision/recall metrics & estimated TCO reduction'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Design a service model for MSMEs or facility managers, including installation, calibration, maintenance, subscription or shared-savings pricing, liability and verified performance metrics.',
        deliverables: ['MSME service deployment & calibration roadmap', 'Shared-savings / subscription revenue model & liability terms'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 3-05
  {
    psId: 'TRACK-3-05',
    trackId: 'TRK-03',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Define a commodity and network with suppliers, nodes, capacity, lead times and service commitments. Identify the critical failure modes and the current decision-making bottleneck.',
        deliverables: ['Freight network topology (nodes, routes, lead times)', 'Decision-making bottleneck & failure modes inventory'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Create a reproducible synthetic network dataset with route costs, time windows, demand variability, capacity constraints and disruption scenarios. Define service-level and sustainability objectives.',
        deliverables: ['Multi-node synthetic route cost & capacity dataset', 'Service-level agreement (SLA) & green emissions baseline'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Build a scenario engine or optimisation prototype comparing routing, inventory buffers, alternate suppliers, shipment consolidation and shared transport options.',
        deliverables: ['Multi-modal logistics simulation twin prototype', 'Scenario engine comparing buffers, rerouting & consolidation'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Run stress tests for road closures, supplier failure, demand surges and conflicting objectives. Compare cost, delivery reliability, emissions proxy, resilience and fairness to smaller suppliers.',
        deliverables: ['Network bottleneck & disruption stress test benchmarks', 'Resilience, on-time delivery & small-supplier fairness audit'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Propose a B2B operating model for logistics providers, producer groups or regional buyers. Include onboarding, data-sharing incentives, pricing, implementation effort, cybersecurity and scale-up economics.',
        deliverables: ['B2B logistics platform roll-out blueprint', 'Data-sharing incentives, pricing tiers & scale-up pitch'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // =========================================================================
  // TRACK 4 — ENTREPRENEURSHIP & FUTURE OF MANAGEMENT
  // =========================================================================

  // PS ID: TRACK 4-01
  {
    psId: 'TRACK-4-01',
    trackId: 'TRK-04',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Select one workflow and document time, error rates, bottlenecks, skill requirements and consequences of incorrect output. Define a baseline and what decisions must remain human-approved.',
        deliverables: ['Workflow friction breakdown (hours, error rates, costs)', 'Human-in-the-loop decision boundary definition'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Build a representative synthetic document/task set. Compare general-purpose AI, templates and a deterministic workflow; define evaluation criteria for accuracy, privacy and hallucination risk.',
        deliverables: ['MSME task/document synthetic dataset', 'Comparison matrix: LLM vs deterministic templates (accuracy, privacy)'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Prototype a narrow co-pilot with source-grounded outputs, editable drafts, escalation paths and an audit trail. Demonstrate the end-to-end workflow rather than a generic chatbot.',
        deliverables: ['Source-grounded task co-pilot prototype (not generic chatbot)', 'Auditable draft review & escalation trail'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Test on unseen and adversarial cases, ambiguous instructions and incomplete documents. Measure task completion time, error rate, correction burden, cost per task and data leakage risks.',
        deliverables: ['Adversarial input & data leakage stress test', 'Time/cost per task benchmarks vs human baseline'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Build a commercially credible offering for a defined MSME segment. Include onboarding, human support, pricing, inference/tool costs, integration, liability, measurable ROI and a roadmap for responsible scale.',
        deliverables: ['MSME unit economics & customer acquisition strategy', 'Inference budget, liability terms & ROI pitch deck'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 4-02
  {
    psId: 'TRACK-4-02',
    trackId: 'TRK-04',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Select one material stream and map source volume, seasonality, current handling, contamination and stakeholders. Establish a measurable baseline and identify who controls the material.',
        deliverables: ['Local waste stream volume & seasonality audit', 'Material ownership & contamination stakeholder map'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Research potential products and buyers; estimate collection radius, processing requirements, applicable safety/quality requirements and competing materials. Distinguish verified demand from assumptions.',
        deliverables: ['Buyer demand evidence & collection radius model', 'Regulatory quality requirements vs competing materials analysis'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Build a product/service prototype or process demonstrator and a material-flow model showing yields, rejects, inputs and required equipment.',
        deliverables: ['Product/process demonstrator & material-flow model', 'Equipment sizing, inputs & rejects balance sheet'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Test demand and technical feasibility with samples or simulations. Conduct sensitivity analysis for feedstock shortages, price changes, quality variation, logistics and lifecycle trade-offs.',
        deliverables: ['Feedstock price & supply volatility sensitivity test', 'Lifecycle environmental trade-offs & quality variation report'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Present an investable business model with supply agreements, customer validation, capex/opex, gross margin, working capital, safety/compliance plan, job creation and verified environmental indicators.',
        deliverables: ['Bankable financial plan (Capex, Opex, margins, working capital)', 'Compliance plan, local job creation & verified green metrics'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 4-03
  {
    psId: 'TRACK-4-03',
    trackId: 'TRK-04',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Select one worker group and occupational cluster. Map barriers from skill acquisition to interview, hiring, retention and progression using stakeholder evidence.',
        deliverables: ['Target worker group employment barrier journey map', 'Stakeholder evidence on screening biases & retention drop-offs'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Create synthetic candidate and vacancy profiles with explicit skill evidence, accessibility needs and employer requirements. Define fair matching criteria and sensitive attributes that must not be used as proxies for worth.',
        deliverables: ['Synthetic applicant & vacancy profile repository', 'Algorithmic non-discrimination criteria & sensitive attribute list'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Prototype a skills-evidence portfolio and explainable matching workflow, including practical task verification, candidate correction/appeal and accessible interfaces.',
        deliverables: ['Skills-evidence portfolio & task verification prototype', 'Transparent matching workflow with applicant appeal mechanisms'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Test matching quality, ranking fairness, employer usability, fraudulent credentials, connectivity constraints and performance across different candidate profiles. Avoid claiming job guarantees.',
        deliverables: ['Fairness & credential-tampering stress test results', 'Low-connectivity accessibility & employer usability review'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Build a sustainable model for employers, training providers, colleges or public programmes. Include verification costs, placement/service fees or institutional funding, safeguards against exploitative charges and metrics for job quality and retention.',
        deliverables: ['Institutional / employer partnership revenue model', 'Anti-exploitation fee safeguards & long-term retention impact'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 4-04
  {
    psId: 'TRACK-4-04',
    trackId: 'TRK-04',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Choose one hazard and user group; map exposure, vulnerability, existing coping measures and the decisions that must be made before, during and after an event.',
        deliverables: ['Climate hazard exposure & vulnerable population mapping', 'Pre-, during-, and post-event critical decision register'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Use public or synthetic weather, asset and service data to create scenarios. Document forecast uncertainty, data gaps and which recommendations require expert or official confirmation.',
        deliverables: ['Multi-hazard synthetic climate & asset vulnerability dataset', 'Forecast uncertainty thresholds & expert validation protocol'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Build an actionable decision-support prototype: alerts with confidence, preparedness checklists, resource coordination, continuity planning or a locally appropriate adaptation service.',
        deliverables: ['Actionable climate decision-support prototype', 'Vernacular alert system & cooperative resource coordination dashboard'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Run scenario exercises for false alarms, missed events, power/network loss and unequal access to resources. Measure actionability, response time, inclusion and potential unintended harm.',
        deliverables: ['Blackout / network outage scenario simulation', 'False-alarm audit, response time metrics & inclusion assessment'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Create a business and partnership model with cooperatives, employers, local bodies, insurers or community organisations. Show willingness to pay, service delivery cost, maintenance, safeguards and resilience outcomes.',
        deliverables: ['Community cooperative / local body financing blueprint', 'Service delivery cost, maintenance plan & resilience outcomes pitch'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 4-05
  {
    psId: 'TRACK-4-05',
    trackId: 'TRK-04',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Choose a small organisation and map where AI is used or likely to be adopted, what decisions it influences, who may be harmed and who is accountable.',
        deliverables: ['Small enterprise AI adoption footprint & accountability map', 'Harm assessment & stakeholder risk exposure baseline'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Create a risk taxonomy and sample inventory covering data rights, privacy, bias, security, accuracy, explainability, vendor dependency and human oversight.',
        deliverables: ['Lightweight AI risk taxonomy (privacy, bias, hallucination)', 'Vendor dependency & data rights audit inventory'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Prototype a lightweight assessment workflow, evidence register, model/vendor card, testing checklist or incident log that generates prioritised actions rather than a generic policy document.',
        deliverables: ['Automated governance checklist & vendor card prototype', 'Prioritized action generator & incident log workflow'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Run the toolkit against two contrasting synthetic use cases and a failure scenario. Test completeness, usability, auditability, false assurance and the time required for a small team to operate it.',
        deliverables: ['Dual use-case stress test (fintech vs HR AI deployment)', 'Usability time audit, false assurance checks & auditability report'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Design a viable product or managed-service model for SMEs, colleges, NGOs or professional advisers. Include update costs, expert escalation, liability limits, customer acquisition and measurable improvement in governance maturity.',
        deliverables: ['Managed compliance service model for small organizations', 'Pricing tiers, liability boundaries & governance maturity roadmap'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  }
];

async function seedChallenges() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    // Remove legacy generic challenges that had no psId
    const delRes = await HackathonChallenge.deleteMany({
      $or: [
        { psId: { $in: ['', null, 'all'] } },
        { psId: { $exists: false } }
      ]
    });
    console.log(`Cleaned up ${delRes.deletedCount} legacy generic challenges.`);

    let insertedCount = 0;
    for (const group of PS_CHALLENGES) {
      for (const chal of group.challenges) {
        const challengeId = `CHAL-${group.psId}-${chal.num}`;
        await HackathonChallenge.findOneAndUpdate(
          { challengeId },
          {
            $set: {
              challengeId,
              challengeNumber: chal.num,
              trackId: group.trackId,
              psId: group.psId,
              title: chal.title,
              subtitle: `Dedicated Challenge ${chal.num} for ${group.psId}`,
              description: chal.description,
              deliverables: chal.deliverables,
              timeframe: chal.timeframe,
              isEnabled: false,
              order: chal.num,
              updatedAt: new Date()
            }
          },
          { upsert: true }
        );
        insertedCount++;
      }
    }

    console.log(`✅ Successfully seeded ${insertedCount} PS-specific challenges into MongoDB!`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding challenges:', err);
    process.exit(1);
  }
}

seedChallenges();
