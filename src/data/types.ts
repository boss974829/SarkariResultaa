export type CategorySlug =
  | "latest-job"
  | "result"
  | "admit-card"
  | "answer-key"
  | "syllabus"
  | "admission"
  | "certificate"
  | "important";

export type Qualification = "10th" | "12th" | "graduate" | "iti" | "any";

export type Row = { label: string; value: string };

export type Board = {
  id: string;
  name: string;
  short: string;
  url: string;
  portal?: string;
};

export type Notice = {
  slug: string;
  title: string;
  headline: string;
  boardId: string;
  category: CategorySlug;
  qualification: Qualification;
  posts?: number;
  postDate: string;
  lastDate?: string;
  flag?: string;
  summary: string;
  dates: Row[];
  fees: Row[];
  ageAsOn?: string;
  age: Row[];
  vacancies: Row[];
  qualifications: Row[];
  selection: string[];
  howToApply: string[];
  links: { label: string; href: string }[];
  zones?: { name: string; href: string }[];
};

export type Category = {
  slug: CategorySlug;
  label: string;
  blurb: string;
};
