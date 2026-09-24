import type { NotebookInput } from '../lib/notebooks';

// ── Your notebook projects ────────────────────────────────────────────
// This is the ONLY file you edit to add a project. Two ways to add one:
//
//   1. Just a GitHub blob URL (easiest):
//        'https://github.com/user/My-Repo/blob/main/analysis.ipynb'
//
//   2. An object, to override any field (all optional except `url`):
//        { url: '...', slug: '...', tags: ['...'], publishDate: '2026-08-24' }
//
// Title and description are pulled from the repo's README.md automatically —
// you don't write them here. Override `title`/`description` only if you want
// something different from the README. Projects render in the order below.
// ──────────────────────────────────────────────────────────────────────

export const notebookList: (string | NotebookInput)[] = [
  {
    url: 'https://github.com/rajanshresth/SupplyChainLogestic-Analysis/blob/main/EDA.ipynb',
    slug: 'supply-chain-logistics-eda',
    tags: ['Data Analytics', 'Python', 'pandas', 'EDA'],
    publishDate: '2026-08-24',
  },
  {
    url: 'https://github.com/rajanshresth/Telco-Customer-Churn-Analysis/blob/main/eda.ipynb',
    slug: 'telco-customer-churn-eda',
    tags: ['Data Science', 'Python', 'EDA', 'Churn'],
    publishDate: '2026-08-24',
  },
  {
    url: 'https://github.com/rajanshresth/ds_project/blob/main/EDA/catalogue_analysis.ipynb',
    slug: 'netflix-eda-statistical-analysis',
    title: 'Netflix Movies & TV Shows — EDA & Statistical Analysis',
    description:
      'An exploratory data analysis of the Netflix Movies & TV Shows dataset, focusing on data cleaning, categorical variables, distributions, relationships, and statistical analysis. Covers practical handling of missing values, multi-label fields such as country and listed_in, mixed-format variables like duration, and descriptive statistics to understand the Netflix content catalog.',
    tags: ['Data Science', 'Python', 'EDA', 'Statistics', 'Netflix'],
    publishDate: '2026-09-24',
  }, 
];
