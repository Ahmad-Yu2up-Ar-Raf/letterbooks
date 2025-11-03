import { OptionItem } from "@/types";
import { GraduationCap, Briefcase } from "lucide-react";

export interface GroupedOptions {
  [key: string]: OptionItem[];
}

export const UserOccupation: OptionItem[] = [
  { 
    value: "student", 
    label: "Student", 
    icon: GraduationCap, 
    subLabel: "High school or university student", 
    description: "Currently pursuing education at a school or university." 
  },
  { 
    value: "worker", 
    label: "Worker / Professional", 
    icon: Briefcase, 
    subLabel: "Employed or self-employed", 
    description: "Actively working in a specific field or company." 
  },
];

export const UserOccupationValue: string[] = UserOccupation.map((item) => item.value);
