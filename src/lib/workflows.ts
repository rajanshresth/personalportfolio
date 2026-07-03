// Real per-case-study workflow definitions.
//
// These drive the <WorkflowDiagram> component on both the Work index cards and
// the individual case-study pages, so the flow shown to a visitor is a single
// source of truth that matches the "Stack" section of each write-up. Each node
// is a real stage in the automation (source → orchestration → logic → output),
// not decorative art — which is what makes the diagrams read as legitimate and
// gives search engines concrete, relevant on-page text to index.

export interface WorkflowStep {
  /** Main node label — the tool or artifact at this stage. */
  label: string;
  /** Small type tag rendered above the label (Source, Orchestration, …). */
  meta: string;
  /** Highlight this node as the automation engine (copper fill). */
  highlight?: boolean;
}

export interface Workflow {
  /** One-line description used for the figure caption and the diagram's aria-label. */
  caption: string;
  steps: WorkflowStep[];
}

export const workflows: Record<string, Workflow> = {
  'capacity-based-pricing-engine': {
    caption:
      'Live utilization data flows from PM and time-tracking tools through n8n into a Python pricing model, landing as a recommended rate range in the CRM.',
    steps: [
      { label: 'PM & Time-Tracking', meta: 'Source' },
      { label: 'n8n', meta: 'Orchestration', highlight: true },
      { label: 'Python · capacity index', meta: 'Pricing logic' },
      { label: 'Recommended rate', meta: 'Compute' },
      { label: 'CRM quote field', meta: 'Output' },
    ],
  },

  'ad-portfolio-allocator': {
    caption:
      'A daily n8n cycle pulls performance data from every ad platform, scores each campaign in Python, and pushes a rebalanced budget back out through the APIs.',
    steps: [
      { label: 'Ad platform APIs', meta: 'Source' },
      { label: 'n8n · daily', meta: 'Orchestration', highlight: true },
      { label: 'Python · score & rank', meta: 'Allocation logic' },
      { label: 'Rebalance budget', meta: 'Compute' },
      { label: 'Ad platforms', meta: 'Output' },
    ],
  },

  'ai-business-operating-system': {
    caption:
      'n8n syncs CRM, invoicing, and ops tools while Python handles scoring and anomaly detection, surfacing decisions in Slack, email, and CRM fields.',
    steps: [
      { label: 'CRM · Invoicing · Ops', meta: 'Sources' },
      { label: 'n8n', meta: 'Orchestration', highlight: true },
      { label: 'Python · scoring & anomaly', meta: 'Business logic' },
      { label: 'Slack · Email · CRM', meta: 'Output' },
    ],
  },

  'route-optimizer': {
    caption:
      'A scheduled n8n run feeds the daily stop list into a Python optimizer that calls the Google Routes API, then delivers routes to drivers and dispatch.',
    steps: [
      { label: 'Daily stop list', meta: 'Source' },
      { label: 'n8n · schedule', meta: 'Orchestration', highlight: true },
      { label: 'Python optimizer', meta: 'Routing logic' },
      { label: 'Google Routes API', meta: 'Traffic data' },
      { label: 'Driver app · Dispatch', meta: 'Output' },
    ],
  },

  'lead-follow-up-automation': {
    caption:
      'The moment a lead comes in, n8n enriches and scores it in Python, routes it to the right rep, and fires an instant Slack alert plus a first-touch reply.',
    steps: [
      { label: 'Inbound lead', meta: 'Trigger' },
      { label: 'n8n', meta: 'Orchestration', highlight: true },
      { label: 'Enrich + Python score', meta: 'Qualification' },
      { label: 'Route to rep', meta: 'Decision' },
      { label: 'Slack + instant reply', meta: 'Output' },
    ],
  },

  'morning-digest': {
    caption:
      'On an early-morning schedule, n8n pulls overnight data, Python computes trend and anomaly deltas, and a one-page digest is delivered to Slack or email.',
    steps: [
      { label: 'Production · Fulfillment · CRM', meta: 'Sources' },
      { label: 'n8n · 5am', meta: 'Schedule', highlight: true },
      { label: 'Python · trend & anomaly', meta: 'Analysis' },
      { label: 'One-page digest', meta: 'Format' },
      { label: 'Slack · Email', meta: 'Output' },
    ],
  },
};
