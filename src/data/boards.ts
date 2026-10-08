import type { Board, Category } from "@/data/types";

export const BOARDS: Board[] = [
  { id: "ssc", name: "Staff Selection Commission", short: "SSC", url: "https://ssc.gov.in/" },
  {
    id: "upsc",
    name: "Union Public Service Commission",
    short: "UPSC",
    url: "https://upsc.gov.in/",
    portal: "https://upsconline.gov.in/",
  },
  {
    id: "rrb",
    name: "Railway Recruitment Boards",
    short: "RRB",
    url: "https://www.rrbcdg.gov.in/",
    portal: "https://www.rrbapply.gov.in/",
  },
  { id: "ibps", name: "Institute of Banking Personnel Selection", short: "IBPS", url: "https://www.ibps.in/" },
  { id: "bpsc", name: "Bihar Public Service Commission", short: "BPSC", url: "https://bpsc.bihar.gov.in/" },
  { id: "uppsc", name: "Uttar Pradesh Public Service Commission", short: "UPPSC", url: "https://uppsc.up.nic.in/" },
  { id: "rpsc", name: "Rajasthan Public Service Commission", short: "RPSC", url: "https://rpsc.rajasthan.gov.in/" },
  { id: "mppsc", name: "Madhya Pradesh Public Service Commission", short: "MPPSC", url: "https://mppsc.mp.gov.in/" },
  { id: "army", name: "Indian Army", short: "Army", url: "https://joinindianarmy.nic.in/" },
  { id: "navy", name: "Indian Navy", short: "Navy", url: "https://www.joinindiannavy.gov.in/" },
  { id: "iaf", name: "Indian Air Force", short: "IAF", url: "https://afcat.cdac.in/" },
  { id: "icg", name: "Indian Coast Guard", short: "Coast Guard", url: "https://indiancoastguard.gov.in/" },
  { id: "nta", name: "National Testing Agency", short: "NTA", url: "https://nta.ac.in/" },
  { id: "aiims", name: "All India Institute of Medical Sciences", short: "AIIMS", url: "https://www.aiimsexams.ac.in/" },
  { id: "ctet", name: "Central Teacher Eligibility Test", short: "CTET", url: "https://ctet.nic.in/" },
  { id: "sbi", name: "State Bank of India", short: "SBI", url: "https://sbi.co.in/web/careers" },
  { id: "dsssb", name: "Delhi Subordinate Services Selection Board", short: "DSSSB", url: "https://dsssbonline.nic.in/" },
  { id: "kvs", name: "Kendriya Vidyalaya Sangathan", short: "KVS", url: "https://kvsangathan.nic.in/" },
  { id: "nvs", name: "Navodaya Vidyalaya Samiti", short: "NVS", url: "https://navodaya.gov.in/" },
  { id: "fci", name: "Food Corporation of India", short: "FCI", url: "https://fci.gov.in/" },
  { id: "post", name: "India Post", short: "India Post", url: "https://indiapostgdsonline.gov.in/" },
  { id: "esic", name: "Employees' State Insurance Corporation", short: "ESIC", url: "https://www.esic.gov.in/" },
  { id: "epfo", name: "Employees' Provident Fund Organisation", short: "EPFO", url: "https://www.epfindia.gov.in/" },
];

export const CATEGORIES: Category[] = [
  {
    slug: "latest-job",
    label: "Latest Job",
    blurb: "Online forms and recruitment notices. Apply only on the board’s own site.",
  },
  {
    slug: "result",
    label: "Result",
    blurb: "Written, mains, and final results, with the official score link.",
  },
  {
    slug: "admit-card",
    label: "Admit Card",
    blurb: "Hall tickets, city slips, and exam-date notices.",
  },
  {
    slug: "answer-key",
    label: "Answer Key",
    blurb: "Tentative keys and challenge windows.",
  },
  {
    slug: "syllabus",
    label: "Syllabus",
    blurb: "Exam pattern and subject outlines as published by the board.",
  },
  {
    slug: "admission",
    label: "Admission",
    blurb: "Entrance forms and correction windows for courses and national tests.",
  },
  {
    slug: "certificate",
    label: "Certificate",
    blurb: "E-certificates and marksheets hosted by the examining body.",
  },
  {
    slug: "important",
    label: "Important",
    blurb: "Calendars and desk notes that are not a single recruitment.",
  },
];

export const HOME_ROWS: Category["slug"][][] = [
  ["result", "admit-card", "latest-job"],
  ["answer-key", "syllabus", "admission"],
];
