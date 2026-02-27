export type BrndlyLeadPayload = {
  name: string;
  company: string;
  email: string;
  region: "Dubai / Middle East" | "Romania" | "Europe (other)" | "Other / remote";
  budget: "€2,000 – €5,000" | "€5,000 – €10,000" | "€10,000 – €25,000" | "€25,000+";
  message: string;
};