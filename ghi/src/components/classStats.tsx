interface DnDClassStats {
  id: number;
  class: string;
  primary: string;
  secondary: string;
  explanation: string;
}

const classStats: DnDClassStats[] = [
  {
    id: 1,
    class: "Barbarian",
    primary: "Strength",
    secondary: "Constitution",
    explanation:
      "Barbarians rely on Strength for melee attacks and Constitution to absorb damage with a larger hit point pool.",
  },
  {
    id: 2,
    class: "Bard",
    primary: "Charisma",
    secondary: "Dexterity",
    explanation:
      "Bards use Charisma for spellcasting and performance abilities, and Dexterity for defense and skill checks.",
  },
  {
    id: 3,
    class: "Cleric",
    primary: "Wisdom",
    secondary: "Constitution",
    explanation:
      "Clerics cast spells with Wisdom and need Constitution to maintain concentration on spells.",
  },
  {
    id: 4,
    class: "Druid",
    primary: "Wisdom",
    secondary: "Constitution",
    explanation:
      "Druids use Wisdom for spellcasting and need Constitution to maintain concentration on spells.",
  },
  {
    id: 5,
    class: "Fighter",
    primary: "Strength or Dexterity",
    secondary: "Constitution",
    explanation:
      "Fighters can use Strength for melee combat or Dexterity for ranged combat, with Constitution needed for survivability.",
  },
  {
    id: 6,
    class: "Monk",
    primary: "Dexterity",
    secondary: "Wisdom",
    explanation:
      "Monks use Dexterity for attacks and AC, and Wisdom for abilities like Stunning Strike and AC bonuses.",
  },
  {
    id: 7,
    class: "Paladin",
    primary: "Strength",
    secondary: "Charisma",
    explanation:
      "Paladins rely on Strength for melee attacks and Charisma for spellcasting and aura abilities.",
  },
  {
    id: 8,
    class: "Ranger",
    primary: "Dexterity",
    secondary: "Wisdom",
    explanation:
      "Rangers use Dexterity for combat and Wisdom for spells like Hunter's Mark.",
  },
  {
    id: 9,
    class: "Rogue",
    primary: "Dexterity",
    secondary: "Intelligence or Charisma",
    explanation:
      "Rogues rely on Dexterity for attacks, AC, and Stealth, with Intelligence or Charisma for certain archetypes.",
  },
  {
    id: 10,
    class: "Sorcerer",
    primary: "Charisma",
    secondary: "Constitution",
    explanation:
      "Sorcerers use Charisma for spellcasting and need Constitution to maintain concentration on spells.",
  },
  {
    id: 11,
    class: "Warlock",
    primary: "Charisma",
    secondary: "Constitution",
    explanation:
      "Warlocks use Charisma for spellcasting and rely on Constitution for maintaining concentration.",
  },
  {
    id: 12,
    class: "Wizard",
    primary: "Intelligence",
    secondary: "Constitution",
    explanation:
      "Wizards rely on Intelligence for spells and need Constitution to maintain concentration on spells.",
  },
];

export default classStats;
