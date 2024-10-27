export interface Characters {
  id: number;
  level: number;
  name: string;
  race_id: number;
  subrace_id: number | null;
  user_id: number;
  class_id: number;
}

interface Traits {
  id: number;
  race_id: number;
  trait: string;
  description: string;
}
interface SubRaceTraits {
  id: number;
  subrace_id: number;
  trait: string;
  description: string;
}

interface Subraces {
  id: number;
  race_id: number;
  name: string;
  traits: SubRaceTraits[];
}

export interface Races {
  id: number;
  name: string;
  description: string;
  traits: Traits[];
  subraces: Subraces[];
}

interface ClassFeatures {
  id: number;
  class_id: number;
  level: number;
  feature: string;
  description: string;
}

export interface Classes {
  id: number;
  name: string;
  description: string;
  features: ClassFeatures[];
}

export interface Backgrounds {
  id: number;
  name: string;
  description: string;
  feature: string;
  feature_description: string;
  proficiencies: string;
  languages: number;
}
