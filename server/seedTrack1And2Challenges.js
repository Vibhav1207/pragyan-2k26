import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import { HackathonChallenge } from './models.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vibhavpateltechfest_db_user:TechfestPass2026@task1web.qqdtxkg.mongodb.net/pragyan?retryWrites=true&w=majority&appName=task1web';

const TRACK_1_AND_2_CHALLENGES = [
  // =========================================================================
  // TRACK 1 — FINTECH & FINANCIAL INNOVATION
  // =========================================================================

  // PS ID: TRACK 1-01
  {
    psId: 'TRACK-1-01',
    trackId: 'TRK-01',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Define two contrasting worker personas and map income cycles, expense shocks and current coping mechanisms. Establish a measurable baseline for missed essentials, emergency savings or harmful borrowing using ethical, anonymised research.',
        deliverables: ['Worker persona journey map (income cycles & shocks)', 'Baseline audit for emergency savings & harmful borrowing'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Create a transparent cash-flow dataset or simulator with seasonality, delayed wages, medical shocks and family obligations. Compare rule-based forecasting with an explainable AI approach; state what data must never be collected.',
        deliverables: ['Cash-flow volatility simulator dataset', 'Rule-based vs explainable AI model comparison & data privacy boundary'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Prototype a multilingual resilience planner with scenario simulation, safe nudges and referrals to verified formal services. Show how users can correct data and understand why a recommendation was generated.',
        deliverables: ['Multilingual financial resilience planner prototype', 'Transparent recommendation audit trail & user correction workflow'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Stress-test low-income, zero-income and unexpected-expense scenarios. Evaluate forecast error, accessibility, bias, privacy, offline operation and whether recommendations could increase financial harm.',
        deliverables: ['Zero-income & shock simulation stress test results', 'Accuracy, offline usability & harm mitigation benchmark'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Present a sustainable model for employers, worker collectives, NGOs or financial institutions. Include who pays, consent and governance, unit costs, non-predatory safeguards, adoption plan and measurable SDG 1/8/10 outcomes.',
        deliverables: ['Stakeholder financial sustainability model & unit costs', 'Non-predatory governance plan & SDG 1/8/10 pitch deck'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 1-02
  {
    psId: 'TRACK-1-02',
    trackId: 'TRK-01',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Map the financing journey for a defined MSME segment and identify documentation, cash-flow visibility and trust barriers. Distinguish credit readiness from actual lender underwriting.',
        deliverables: ['MSME financing journey friction breakdown', 'Credit readiness vs underwriting separation framework'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Build a synthetic or consented dataset representing seasonality, late payments, thin-file businesses and missing records. Define fair, relevant features and prohibited proxies; document data provenance.',
        deliverables: ['Thin-file MSME synthetic transaction dataset', 'Fair feature registry & prohibited proxies definition'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Develop an explainable readiness dashboard that highlights documentation gaps, cash-flow stress and actionable improvements, with uncertainty and reasons visible to the user.',
        deliverables: ['Explainable credit readiness dashboard prototype', 'Actionable documentation gap analyzer with uncertainty scores'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Test for disparate outcomes across plausible business profiles, missing-data sensitivity, manipulation and misleading confidence. Compare results with a transparent rule-based baseline and conduct a privacy threat review.',
        deliverables: ['Disparate outcome & manipulation stress test report', 'Benchmark comparison against rule-based baseline & threat review'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Design a B2B2B model for incubators, accountants, MSME associations or lenders. Specify pricing, verification cost, liability boundaries, consent, financial assumptions and impact measures without promising loan approval.',
        deliverables: ['B2B2B commercial deployment model & verification pricing', 'Liability disclaimer framework & impact metrics pitch'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 1-03
  {
    psId: 'TRACK-1-03',
    trackId: 'TRK-01',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Map a realistic scam journey and identify the moment when a user can still prevent harm. Define threat actors, user groups, acceptable false-positive/false-negative trade-offs and the limits of a 24-hour prototype.',
        deliverables: ['Digital payment scam journey & critical intervention point', 'Threat actor taxonomy & false-positive tolerance boundary'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Create a safe, synthetic corpus of scam and legitimate examples, including regional-language variations and adversarial wording. Establish labelling rules and a privacy-safe evaluation set.',
        deliverables: ['Synthetic scam vs legitimate message corpus (regional languages)', 'Annotation rubric & privacy-safe evaluation split'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Prototype a multimodal or text-first risk triage tool that explains warning signs, suggests independent verification and routes users to a safe response checklist rather than automatically blocking transactions.',
        deliverables: ['Risk triage assistant prototype with warning explanations', 'Independent verification wizard & safe response checklist'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Evaluate precision, recall, false alarms, language performance, prompt-injection/adversarial cases and user comprehension. Demonstrate that it never requests PINs, passwords, OTPs or full payment credentials.',
        deliverables: ['Adversarial prompt injection & precision/recall audit', 'Credential privacy security guarantee certification'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Propose distribution through banks, merchants, campuses or consumer organisations. Model cost per user, incident escalation, content updates, liability, trust and measurable harm-reduction outcomes.',
        deliverables: ['Distribution partnership roll-out plan & unit economics', 'Incident escalation protocol & harm-reduction pitch deck'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 1-04
  {
    psId: 'TRACK-1-04',
    trackId: 'TRK-01',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Select a crop/livelihood and define the shock, affected geography and financial loss pathway. Map current coping strategies and establish the difference between a weather trigger and actual loss.',
        deliverables: ['Crop climate-shock pathway & geographical boundary', 'Weather trigger vs actual yield loss basis analysis'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Use public or synthetic weather/yield data to study trigger candidates, historical coverage gaps and potential basis risk. Document data resolution, missing observations and limitations.',
        deliverables: ['Historical weather trigger candidate dataset', 'Basis risk documentation & resolution limitations analysis'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Prototype a transparent trigger simulator that explains when a payout would or would not occur, shows uncertainty and lets users compare alternative trigger designs.',
        deliverables: ['Parametric trigger simulator prototype', 'Transparent payout rationale comparator with uncertainty bounds'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Back-test the concept on held-out periods or simulated extreme events. Measure missed-event and false-payout rates, affordability, accessibility and impacts on different producer profiles.',
        deliverables: ['Extreme weather historical back-test simulation', 'False payout vs missed event error rate matrix'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Develop a responsible partnership model involving licensed insurers, cooperatives, data providers or public programmes. Include distribution costs, consumer disclosures, grievance handling, regulatory dependencies and SDG impact metrics.',
        deliverables: ['Licensed insurer / cooperative distribution model', 'Consumer grievance handling, disclosures & SDG impact pitch'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 1-05
  {
    psId: 'TRACK-1-05',
    trackId: 'TRK-01',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Choose a clearly defined user group and map the journey from awareness to application, including language, disability, connectivity and documentation barriers.',
        deliverables: ['Entitlement access barrier journey map', 'Language, disability & connectivity friction point inventory'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Create a verified sample knowledge base from publicly available official information. Define a source/date/version protocol and identify ambiguous rules that require human review.',
        deliverables: ['Verified welfare scheme knowledge base dataset', 'Rule ambiguity taxonomy & source versioning protocol'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Build a multilingual retrieval-and-guidance prototype that cites its source, date and eligibility caveats, asks only necessary questions and provides a printable/offline action plan.',
        deliverables: ['Multilingual entitlement guidance prototype with citations', 'Printable/offline application checklist generator'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Test factual accuracy, stale-information handling, ambiguous cases, accessibility, hallucination resistance and privacy. The prototype must abstain and refer users to official channels when evidence is insufficient.',
        deliverables: ['Hallucination resistance & outdated rule handling stress test', 'Official channel escalation & abstention reliability benchmark'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Model deployment through community service centres, colleges, NGOs or local bodies. Explain verification operations, update responsibilities, funding, user support and safeguards against charging vulnerable users for free entitlements.',
        deliverables: ['CSC/NGO community deployment operating plan', 'Anti-predatory zero-fee safeguards & public funding pitch'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // =========================================================================
  // TRACK 2 — MARKETING & CONSUMER INTELLIGENCE
  // =========================================================================

  // PS ID: TRACK 2-01
  {
    psId: 'TRACK-2-01',
    trackId: 'TRK-02',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Select a producer category and map product economics, capacity, seasonality, buyer types and current route-to-market constraints. Define the commercial decision the system must improve.',
        deliverables: ['Producer economics & route-to-market constraint map', 'Core commercial pricing/channel decision boundary'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Combine synthetic or permissioned sales data with structured customer research and competitor observations. Segment buyers and distinguish demonstrated demand from clicks, likes or stated interest.',
        deliverables: ['Synthetic multi-tier sales & demand dataset', 'Buyer segmentation matrix (actual purchases vs click vanity metrics)'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Prototype an AI-assisted market intelligence workflow that recommends a target segment, product positioning, price tests and channel mix while exposing evidence and confidence.',
        deliverables: ['Market intelligence recommendation engine prototype', 'Transparent pricing & channel mix confidence dashboard'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Run scenario tests for low demand, rising logistics costs, competitor entry and production limits. Evaluate forecast error, recommendation stability, customer acquisition cost and producer margin.',
        deliverables: ['Logistics surge & low-demand stress test benchmarks', 'Recommendation stability & net producer margin evaluation'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Build a go-to-market model with producer onboarding, quality assurance, channel partners, fulfilment, pricing/commission, returns and repeat-purchase economics. Show how value reaches the producer, not only the platform.',
        deliverables: ['Fair producer-first commercial business model', 'Fulfilment economics, quality assurance & margin pitch deck'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 2-02
  {
    psId: 'TRACK-2-02',
    trackId: 'TRK-02',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Map surplus generation, timing, food categories, current disposal routes and recipient constraints for one setting. Define baseline waste, safe handling boundaries and the decision window.',
        deliverables: ['Surplus generation lifecycle & disposal route mapping', 'Safe handling boundary & decision window baseline'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Develop a time-sensitive synthetic dataset for surplus volume, shelf-life, distance, recipient demand, transport capacity and missed pickups. Identify uncertainty and data owners.',
        deliverables: ['Time-sensitive food surplus & perishability dataset', 'Transport capacity, distance & missed pickup uncertainty matrix'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Build a forecasting-and-matching prototype that prioritises safe, feasible transfers using time, distance, capacity and recipient need; include fallback handling when no match is possible.',
        deliverables: ['Surplus food allocation & routing prototype', 'Safe feasibility score engine & emergency fallback protocols'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Simulate peak days, cancelled pickups, traffic delays and demand mismatch. Measure edible quantity recovered, spoilage, delivery cost, match completion and safety-rule compliance.',
        deliverables: ['Peak cancellation & traffic disruption simulation', 'Recovery rate, spoilage reduction & compliance benchmarks'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Design a viable multi-sided operating model with kitchens/retailers, logistics providers, recipient organisations and funders. Specify liability, verification, cold-chain dependencies, incentives and auditable SDG 12.3 metrics.',
        deliverables: ['Multi-stakeholder operating & funding model', 'Food-safety liability terms & auditable SDG 12.3 pitch'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 2-03
  {
    psId: 'TRACK-2-03',
    trackId: 'TRK-02',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Map a customer decision journey and define a measurable outcome such as repeat purchase, service completion or reduced complaint resolution time. Identify sensitive data and unacceptable forms of targeting.',
        deliverables: ['Customer decision journey & core outcome metrics', 'Sensitive data boundary & prohibited targeting registry'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Construct a synthetic customer dataset with missingness, imbalance and consent preferences. Define aggregation, retention, access control and deletion requirements before modelling.',
        deliverables: ['Synthetic consumer dataset with consent preferences', 'Access control, retention & deletion compliance framework'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Prototype a segmentation or next-best-action tool that uses explainable features, supports consent choices and provides a non-personalised alternative. Make recommendations actionable for a small business.',
        deliverables: ['Privacy-first next-best-action prototype', 'Consent choice manager & non-personalized fallback interface'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Test lift against a simple baseline, segment stability, bias, privacy leakage risks and performance when users opt out. Evaluate whether recommendations could exploit vulnerability or discriminate.',
        deliverables: ['Opt-out performance & privacy leakage stress test', 'Fairness audit against consumer vulnerability exploitation'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Present a business model for SMEs or sector associations, including implementation burden, pricing, data governance, measurable incremental value and a clear policy for prohibited uses.',
        deliverables: ['SME commercial SaaS / subscription model', 'Data governance policy, prohibited uses & incremental ROI pitch'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 2-04
  {
    psId: 'TRACK-2-04',
    trackId: 'TRK-02',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Choose a product category and claim types with meaningful consumer or environmental consequences. Map how claims reach consumers and define the harm caused by unsupported claims.',
        deliverables: ['Product claim typology & distribution channel mapping', 'Consumer harm & greenwashing impact baseline'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Build a small, traceable corpus of public claims and reliable primary sources. Establish claim categories, source credibility rules, date/version tracking and human review procedures.',
        deliverables: ['Traceable public claims vs primary sources corpus', 'Source credibility rubric & human review protocol'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Prototype a retrieval-based claim-checking assistant that quotes or links evidence, explains confidence and disagreement, translates carefully and abstains when sources are inadequate.',
        deliverables: ['Retrieval-grounded green-claim verification prototype', 'Evidence citation panel & abstention confidence display'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Evaluate source faithfulness, translation fidelity, false certainty, stale evidence, adversarial phrasing and user comprehension. Test whether the tool can distinguish absence of evidence from evidence of absence.',
        deliverables: ['Adversarial claim phrasing & stale evidence stress test', 'Epistemic certainty audit (absence of evidence distinction)'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Design a sustainable verification model for consumer groups, marketplaces, media, educational institutions or brands. Include reviewer costs, conflict-of-interest safeguards, correction procedures and trust/impact metrics.',
        deliverables: ['Independent verification business & revenue model', 'Conflict-of-interest safeguards & trust metric pitch deck'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  },

  // PS ID: TRACK 2-05
  {
    psId: 'TRACK-2-05',
    trackId: 'TRK-02',
    challenges: [
      {
        num: 1,
        title: 'Challenge 1: Problem discovery and baseline',
        description: 'Map the visitor journey across arrival, accommodation, local transport, food, worship and departure. Identify stakeholder needs and candidate indicators without collecting sensitive religious profiles.',
        deliverables: ['Shirdi visitor pilgrimage journey map', 'Stakeholder indicator inventory without sensitive personal profiling'],
        timeframe: 'Milestone Phase 1'
      },
      {
        num: 2,
        title: 'Challenge 2: Evidence, data and system analysis',
        description: 'Create a synthetic demand model using arrival peaks, transport capacity, public-service constraints, weather and event calendars. Identify what data would require permissions and what can be estimated safely.',
        deliverables: ['Synthetic festival peak & transport capacity demand dataset', 'Data permission requirements & estimation boundaries'],
        timeframe: 'Milestone Phase 2'
      },
      {
        num: 3,
        title: 'Challenge 3: Prototype and technical/operational design',
        description: 'Build a decision-support prototype for demand scenarios, multilingual service information, crowd-aware recommendations or local-business discovery; avoid claiming real-time accuracy without live data.',
        deliverables: ['Pilgrim crowd-flow & local commerce decision-support prototype', 'Multilingual service discovery & congestion advisory dashboard'],
        timeframe: 'Milestone Phase 3'
      },
      {
        num: 4,
        title: 'Challenge 4: Stress test, validation and impact',
        description: 'Stress-test festival peaks, disruptions, accessibility needs and low-connectivity conditions. Measure queue or travel-time proxies, local-spend distribution, waste/service load and fairness of recommendations.',
        deliverables: ['Festival crowding & network disruption stress test', 'Queue proxy reduction & local merchant spend distribution audit'],
        timeframe: 'Milestone Phase 4'
      },
      {
        num: 5,
        title: 'Challenge 5: Business model, deployment and investment pitch',
        description: 'Propose a public-private-community business model that benefits small local enterprises while protecting public-interest functions. Include data governance, stakeholder incentives, operational costs and SDG 8/11/12 indicators.',
        deliverables: ['Public-private-community regional governance model', 'Local artisan / vendor economic empowerment & SDG 8/11/12 pitch'],
        timeframe: 'Milestone Phase 5'
      }
    ]
  }
];

async function seedTrack1And2() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas.');

    let insertedCount = 0;
    for (const group of TRACK_1_AND_2_CHALLENGES) {
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

    console.log(`✅ Successfully seeded ${insertedCount} PS-specific challenges for Track 1 and Track 2!`);
    const totalCount = await HackathonChallenge.countDocuments();
    console.log(`📊 Total Challenges in MongoDB: ${totalCount} (5 per PS across all 20 Problem Statements).`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding Track 1 and 2 challenges:', err);
    process.exit(1);
  }
}

seedTrack1And2();
