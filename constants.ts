import { Profile } from './types';

export const PROFILE: Profile = {
  name: "Rajan Shrestha",
  role: "Industrial Engineering Undergraduate",
  location: "Pepsicola, Kathmandu, Nepal",
  email: "shrestharajan726@gmail.com",
  phone: "+977 9849867050",
  linkedin: "https://linkedin.com/in/rajan10x",
  github: "https://github.com/rajanshresth",
  summary: "Industrial Engineering undergraduate seeking an internship in Operational Research & Analytical Engineering. Passionate about data-driven decision-making using Operations Research and Simulation. Proficient in Python, SQL, Excel (Solver/Crystal Ball), IoT, and fabrication.",
  education: [
    {
      degree: "Bachelor in Industrial Engineering (BIE)",
      school: "Tribhuvan University, Kathmandu",
      year: "2078–Present",
      details: "Focus: Industrial System Design, Optimization, and Data Analysis.",
      courses: "Operation Research, Probability & Statistics, Production Planning & Control, Supply Chain Management, Project Management, Simulation Modeling, Engineering Economics"
    }
  ],
  skills: {
    "Data Analysis": ["Microsoft Excel (Solver, Data Analysis Toolpak)", "Oracle Crystal Ball (Simulation)", "Regression"],
    "Programming": ["C", "Python (Pandas, NumPy)", "SQL"],
    "Design & Core": ["SolidWorks", "AutoCAD", "Linear Programming", "Network Optimization", "IoT (Arduino)", "Inventory Mgmt"]
  },
  projects: [
    {
      title: "Operations Research & Data Analysis Portfolio",
      type: 'Academic',
      description: "Applied industrial engineering concepts to solve logistical and financial problems.",
      tags: ["Optimization", "Linear Programming", "Crystal Ball", "Analytics"],
      points: [
        "Optimal Route Planning: Utilized Network Optimization algorithms (Shortest Path/MST) to minimize travel time.",
        "Staff Shift Management: Developed a linear programming model to optimize staff scheduling and minimize costs.",
        "Cash Flow & Prediction: Analyzed liquidity using engineering economy; applied Regression/Time Series for demand planning.",
        "Simulation: Used Crystal Ball for stochastic prediction and risk analysis in decision-making models."
      ]
    },
    {
      title: "Automatic Pet Feeder Machine (IoT)",
      type: 'Major',
      description: "Designed and fabricated a smart dispensing system to automate pet feeding intervals.",
      tags: ["IoT", "SolidWorks", "Arduino", "Fabrication"],
      points: [
        "Role: Designed mechanical hopper in SolidWorks; programmed Arduino logic for precise timing.",
        "Fabrication: Managed physical fabrication using workshop tools (Lathe, Drilling, Sheet metal work)."
      ]
    },
    {
      title: "Plastic Brick Making Machine",
      type: 'Design',
      description: "Designed a machine to convert plastic waste into construction bricks, focusing on sustainable manufacturing.",
      tags: ["Sustainability", "Mechanical Design", "Torque Calc"],
      points: [
        "Calculated torque requirements and designed the compression mechanism.",
        "Focus on sustainable manufacturing processes."
      ]
    }
  ],
  achievements: [
    { title: "Winner", event: "Project Demonstration at Yathartha 2080, IOE Thapathali Campus", year: "2080" },
    { title: "Public Choice Winner", event: "BE Project Demonstration at MechTRIX 2080, IOE Pulchowk Campus", year: "2080" }
  ]
};



export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
];
