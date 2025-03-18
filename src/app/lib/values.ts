// src/app/lib/values.ts

// Define the value item type
export interface ValueItem {
  id: string;
  text: string;
  description: string;
  schwartzCategory: string; // Schwartz Values categorization
  gouveiaCategory: string;  // Gouveia Values categorization
}

// Define the importance level type
export type ImportanceLevel = 'very' | 'somewhat' | 'not';

// User's categorized values during sorting
export interface CategorizedValues {
  very: ValueItem[];
  somewhat: ValueItem[];
  not: ValueItem[];
}

// User's ranked values
export interface RankedValue {
  value: ValueItem;
  rank: number;
}

// Complete list of 65 values for sorting
export const VALUES_LIST: ValueItem[] = [
  {
    id: "fun",
    text: "Fun",
    description: "Prioritising enjoyment, playfulness, and lightheartedness in one's life.",
    schwartzCategory: "Hedonism",
    gouveiaCategory: "Excitement"
  },
  {
    id: "happiness",
    text: "Happiness",
    description: "Prioritising well-being, meaningful relationships, fulfilment, and a purposeful, joyful life.",
    schwartzCategory: "Hedonism",
    gouveiaCategory: "Excitement"
  },
  {
    id: "humour",
    text: "Humour",
    description: "Enriching life with positivity, laughter, and creativity through amusement and joy.",
    schwartzCategory: "Hedonism",
    gouveiaCategory: "Excitement"
  },
  {
    id: "challenge",
    text: "Challenge",
    description: "Pushing one's limits and boundaries, appreciating the process of striving beyond one's current capabilities.",
    schwartzCategory: "Stimulation",
    gouveiaCategory: "Excitement"
  },
  {
    id: "intelligence",
    text: "Intelligence",
    description: "Appreciating knowledge and critical thinking, admiring learning, problem-solving, and intellectual growth.",
    schwartzCategory: "Stimulation",
    gouveiaCategory: "Excitement"
  },
  {
    id: "balance",
    text: "Balance",
    description: "Maintaining equilibrium across different aspects of one's life. Striving for a well-rounded life with coexisting components.",
    schwartzCategory: "Security",
    gouveiaCategory: "Existence"
  },
  {
    id: "financialsecurity",
    text: "Financial Security",
    description: "Prioritising the peace of mind and stability that comes from meeting one's own defined needs.",
    schwartzCategory: "Security",
    gouveiaCategory: "Existence"
  },
  {
    id: "healthphysicalwellbeing",
    text: "Health; Physical Wellbeing",
    description: "Prioritising self-care and holistic well-being by taking conscious actions to maintain physical and mental fitness.",
    schwartzCategory: "Security",
    gouveiaCategory: "Existence"
  },
  {
    id: "resilience",
    text: "Resilience",
    description: "Persevering through setbacks healthily through reflection, recuperation, and recalibration. Bouncing back from failures.",
    schwartzCategory: "Security",
    gouveiaCategory: "Existence"
  },
  {
    id: "care",
    text: "Care",
    description: "Prioritising the wellbeing of others, showing compassion, understanding, and genuine concern for their needs.",
    schwartzCategory: "Benevolence",
    gouveiaCategory: "Interactive"
  },
  {
    id: "dependability",
    text: "Dependability",
    description: "Prioritising reliability, consistency, and trustworthiness in oneself and others.",
    schwartzCategory: "Benevolence",
    gouveiaCategory: "Interactive"
  },
  {
    id: "empathy",
    text: "Empathy",
    description: "Understanding others' perspectives and feelings through emotional connection and a common humanity.",
    schwartzCategory: "Benevolence",
    gouveiaCategory: "Interactive"
  },
  {
    id: "family",
    text: "Family",
    description: "Nurturing and cherishing relationships with family members, actively investing time and effort into a family unit.",
    schwartzCategory: "Benevolence",
    gouveiaCategory: "Interactive"
  },
  {
    id: "friendshipsrelationships",
    text: "Friendships; Relationships",
    description: "Forging supportive and fulfilling relationships with others outside of one's immediate family for belonging and happiness.",
    schwartzCategory: "Benevolence",
    gouveiaCategory: "Interactive"
  },
  {
    id: "generosity",
    text: "Generosity",
    description: "Promoting selflessness and giving to foster empathy and interconnectedness between persons.",
    schwartzCategory: "Benevolence",
    gouveiaCategory: "Interactive"
  },
  {
    id: "loveaffection",
    text: "Love; Affection",
    description: "Placing great importance on emotional connection with others; having meaningful relationships that bring joy and emotional fulfilment.",
    schwartzCategory: "Benevolence",
    gouveiaCategory: "Interactive"
  },
  {
    id: "peoplecommunity",
    text: "People; Community",
    description: "Creating lasting change through collective action and shared experiences. Fostering a sense of belonging.",
    schwartzCategory: "Benevolence",
    gouveiaCategory: "Interactive"
  },
  {
    id: "service",
    text: "Service",
    description: "Dedicating one's time, energy, and resources to help others in need in order to make a positive difference.",
    schwartzCategory: "Benevolence",
    gouveiaCategory: "Interactive"
  },
  {
    id: "discipline",
    text: "Discipline",
    description: "Respecting self-control and an adherence to rules and/or structure. Appreciating the importance of being organised.",
    schwartzCategory: "Conformity",
    gouveiaCategory: "Normative"
  },
  {
    id: "honestytrustworthiness",
    text: "Honesty; Trustworthiness",
    description: "Exhibiting transparency by openly sharing thoughts and opinions to cultivate trust, reliability, and mutual respect.",
    schwartzCategory: "Conformity",
    gouveiaCategory: "Normative"
  },
  {
    id: "morality",
    text: "Morality",
    description: "Considering ethical implications, striving to uphold fairness, compassion, honesty, and integrity in actions.",
    schwartzCategory: "Conformity",
    gouveiaCategory: "Normative"
  },
  {
    id: "patience",
    text: "Patience",
    description: "Respecting steady progress and the importance of resolute biding of time to achieve an outcome without immediacy.",
    schwartzCategory: "Conformity",
    gouveiaCategory: "Normative"
  },
  {
    id: "responsibility",
    text: "Responsibility",
    description: "Prioritising accountability and reliability by consistently fulfilling one's commitments to oneself or others.",
    schwartzCategory: "Conformity",
    gouveiaCategory: "Normative"
  },
  {
    id: "integrityrighteousness",
    text: "Integrity; Righteousness",
    description: "Practising honesty and authenticity, maintaining wholeness and moral uprightness in one's words and actions.",
    schwartzCategory: "Tradition",
    gouveiaCategory: "Normative"
  },
  {
    id: "loyalty",
    text: "Loyalty",
    description: "Priorisiting commitment, trust, and faithfulness, and giving unwavering support to a person, group, or cause.",
    schwartzCategory: "Tradition",
    gouveiaCategory: "Normative"
  },
  {
    id: "spiritualityfaith",
    text: "Spirituality; Faith",
    description: "Connecting and believing in a higher power than oneself or the interconnectedness of all life, sacred meanings, and peace.",
    schwartzCategory: "Tradition",
    gouveiaCategory: "Normative"
  },
  {
    id: "tradition",
    text: "Tradition",
    description: "Appreciating long-established customs and practices that serve as a cornerstone for cultural identity and history.",
    schwartzCategory: "Tradition",
    gouveiaCategory: "Normative"
  },
  {
    id: "authority",
    text: "Authority",
    description: "Having a high regard for mandated and/or official leadership. Respecting organisational or hierarchical structures.",
    schwartzCategory: "Power",
    gouveiaCategory: "Promotion"
  },
  {
    id: "influence",
    text: "Influence",
    description: "Seeking to shape opinions and decisions through effective communication and interpersonal skills.",
    schwartzCategory: "Power",
    gouveiaCategory: "Promotion"
  },
  {
    id: "power",
    text: "Power",
    description: "Desiring control and/or influence to attain prominence or dominance in a given aspect of one's life.",
    schwartzCategory: "Power",
    gouveiaCategory: "Promotion"
  },
  {
    id: "prosperitywealth",
    text: "Prosperity; Wealth",
    description: "Prioritising financial success; striving to achieve financial stability and/or abundance.",
    schwartzCategory: "Power",
    gouveiaCategory: "Promotion"
  },
  {
    id: "accountability",
    text: "Accountability",
    description: "Accepting responsibility for mistakes, upholding high standards and grounding one's work in evidence.",
    schwartzCategory: "Achievement",
    gouveiaCategory: "Promotion"
  },
  {
    id: "achievementsuccess",
    text: "Achievement; Success",
    description: "Recognising and appreciating accomplishments. Outcome-driven.",
    schwartzCategory: "Achievement",
    gouveiaCategory: "Promotion"
  },
  {
    id: "competenceefficacy",
    text: "Competence; Efficacy",
    description: "Acquiring and demonstrating knowledge, skills, and expertise with a belief in one's abilities to achieve.",
    schwartzCategory: "Achievement",
    gouveiaCategory: "Promotion"
  },
  {
    id: "competition",
    text: "Competition",
    description: "Being motivated by comparing skills and progress with others in the pursuit to surpass them.",
    schwartzCategory: "Achievement",
    gouveiaCategory: "Promotion"
  },
  {
    id: "grit",
    text: "Grit",
    description: "Committing to persevere and overcome obstacles; resilience to achieve long-term success.",
    schwartzCategory: "Achievement",
    gouveiaCategory: "Promotion"
  },
  {
    id: "mastery",
    text: "Mastery",
    description: "Developing expertise by seeking improvement and excellence through disciplined practice and skill refinement.",
    schwartzCategory: "Achievement",
    gouveiaCategory: "Promotion"
  },
  {
    id: "pragmatism",
    text: "Pragmatism",
    description: "Focusing on realistic improvements, incremental change and inspiring collaboration to foster progress across multiple paths.",
    schwartzCategory: "Achievement",
    gouveiaCategory: "Promotion"
  },
  {
    id: "recognition",
    text: "Recognition",
    description: "Appreciating validation or praise for one's efforts, achievements, or contributions.",
    schwartzCategory: "Achievement",
    gouveiaCategory: "Promotion"
  },
  {
    id: "autonomy",
    text: "Autonomy",
    description: "Valuing the power to make one's own decisions, with an emphasis on self-governance and personal choice.",
    schwartzCategory: "Self-Direction",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "courage",
    text: "Courage",
    description: "Challenging the status quo, speaking truth to power, understanding one's relationships with nature, community, and ancestors to act with inner resolve.",
    schwartzCategory: "Self-Direction",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "creativity",
    text: "Creativity",
    description: "Appreciating the ability to generate new ideas, be expressive, and create.",
    schwartzCategory: "Self-Direction",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "curiosity",
    text: "Curiosity",
    description: "Having the desire to explore, learn, and understand the world, creating richer engagement with life experiences.",
    schwartzCategory: "Self-Direction",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "flexibility",
    text: "Flexibility",
    description: "Appreciating the ability to adapt to changes, have autonomy over one's circumstances, and the fluidity of adjustment.",
    schwartzCategory: "Self-Direction",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "fortitude",
    text: "Fortitude",
    description: "Admiring the quality of mental and emotional strength, appreciating inner resilience and determination.",
    schwartzCategory: "Self-Direction",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "freedom",
    text: "Freedom",
    description: "Not being limited by boundaries. Having the liberty to make decisions however one wishes.",
    schwartzCategory: "Self-Direction",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "growth",
    text: "Growth",
    description: "Developing oneself and pursuing lifelong learning, making progress instead of maintaining a status quo.",
    schwartzCategory: "Self-Direction",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "imagination",
    text: "Imagination",
    description: "Envisioning a just world and bringing innovative ideas, new questions, and storytelling to address challenges.",
    schwartzCategory: "Self-Direction",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "independence",
    text: "Independence",
    description: "Prioritising self-reliance and autonomy to control your actions and destiny without relying on others.",
    schwartzCategory: "Self-Direction",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "Purpose",
    text: "purpose",
    description: "Being motivated by a higher calling, or a deeply held aspiration rooted in intrinsic values and/or upbringing.",
    schwartzCategory: "Self-Direction",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "simplicity",
    text: "Simplicity",
    description: "Appreciating a minimalistic and no-frills approach to life, work, and living. Minimising excess.",
    schwartzCategory: "Self-Direction",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "wisdom",
    text: "Wisdom",
    description: "Appreciating established knowledge, experience, and the judicious application of those to make sound decisions.",
    schwartzCategory: "Self-Direction",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "beauty",
    text: "Beauty",
    description: "Valuing the appearance of something; prioritising the aesthetics.",
    schwartzCategory: "Universalism",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "diversity",
    text: "Diversity",
    description: "Actively recognising and respecting the differences among people. Celebrating the value and uniqueness of each person.",
    schwartzCategory: "Universalism",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "equality",
    text: "Equality",
    description: "Advocating for a society where everyone is treated with the same level of fairness, respect, and equal opportunity.",
    schwartzCategory: "Universalism",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "harmony",
    text: "Harmony",
    description: "Prioritising peace, balance, and unity to foster understanding and cooperation in your life and relationships.",
    schwartzCategory: "Universalism",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "hope",
    text: "Hope",
    description: "Confidently believing in a better future; inspiring perseverance even in difficult moments for a higher purpose.",
    schwartzCategory: "Universalism",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "inclusivity",
    text: "Inclusivity",
    description: "Fostering a sense of genuine welcomeness and belonging; Bridging divides and finding common ground amongst diversity.",
    schwartzCategory: "Universalism",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "interconnectedness",
    text: "Interconnectedness",
    description: "Recognising the intricate connections between people, communities, and ecosystems.",
    schwartzCategory: "Universalism",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "peace",
    text: "Peace",
    description: "Prioritising harmony and cooperation to create safe, tranquil environments free from conflict and violence.",
    schwartzCategory: "Universalism",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "respect",
    text: "Respect",
    description: "Treating others with dignity, empathy, and consideration. Fostering positive relationships built on mutual understanding.",
    schwartzCategory: "Universalism",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "stewardship",
    text: "Stewardship",
    description: "Taking responsibility for managing resources effectively and ethically, being thoughtful and conscientious for the future.",
    schwartzCategory: "Universalism",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "sustainability",
    text: "Sustainability",
    description: "Prioritising practices that ensure long-term health, focusing on renewing and reducing to support the environment and society.",
    schwartzCategory: "Universalism",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "teamworkcollaboration",
    text: "Teamwork; Collaboration",
    description: "Working together toward a common goal, leveraging diverse skills, perspectives, and strengths to achieve better outcomes.",
    schwartzCategory: "Universalism",
    gouveiaCategory: "Suprapersonal"
  },
  {
    id: "security",
    text: "Security",
    description: "Prioritising stability and safety for one's overall wellbeing.",
    schwartzCategory: "Security",
    gouveiaCategory: "Existence"
  },
];

/**
 * Shuffle the values array using Fisher-Yates algorithm
 * @param values Array of values to shuffle
 * @returns Shuffled array of values
 */
export function shuffleValues(values: ValueItem[]): ValueItem[] {
  const shuffled = [...values];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Sort values by their rank
 * @param values Array of ranked values
 * @returns Sorted array of ranked values
 */
export function sortValuesByRank(values: RankedValue[]): RankedValue[] {
  return [...values].sort((a, b) => a.rank - b.rank);
}

/**
 * Format the top values for Gemini API prompt
 * @param values Array of ranked values
 * @returns Formatted string for Gemini prompt
 */
export function formatValuesForGemini(values: RankedValue[]): string {
  const sorted = sortValuesByRank(values);
  return sorted
    .map(({ value, rank }) => `${rank}. ${value.text} - ${value.description}`)
    .join('\n');
}

/**
 * Get value item by ID
 * @param id Value ID to find
 * @returns The value item or undefined if not found
 */
export function getValueById(id: string): ValueItem | undefined {
  return VALUES_LIST.find(value => value.id === id);
}