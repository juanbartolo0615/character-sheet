import { SetStateAction, useState, useEffect } from "react";
import { Backgrounds, Classes, Races } from "./objectsDeclaration";
import { Languages } from "@/app/characters/create/page";
import { racialLanguages } from "./raceGrid";

type ClassSkillSelection = {
  [className: string]: {
    skillCount: number;
    skillsAvailable: string;
  };
};
const classSkillSelections: ClassSkillSelection = {
  Barbarian: {
    skillCount: 2,
    skillsAvailable:
      "Animal Handling, Athletics, Intimidation, Nature, Perception, Survival",
  },
  Bard: {
    skillCount: 3,
    skillsAvailable:
      "Acrobatics, Animal Handling, Arcana, Athletics, Deception, History, Insight, Intimidation, Investigation, Medicine, Nature, Perception, Performance, Persuasion, Religion, Sleight of Hand, Stealth",
  },
  Cleric: {
    skillCount: 2,
    skillsAvailable: "History, Insight, Medicine, Persuasion, Religion",
  },
  Druid: {
    skillCount: 2,
    skillsAvailable:
      "Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, Survival",
  },
  Fighter: {
    skillCount: 2,
    skillsAvailable:
      "Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, Survival",
  },
  Monk: {
    skillCount: 2,
    skillsAvailable:
      "Acrobatics, Athletics, History, Insight, Religion, Stealth",
  },
  Paladin: {
    skillCount: 2,
    skillsAvailable:
      "Athletics, Insight, Intimidation, Medicine, Persuasion, Religion",
  },
  Ranger: {
    skillCount: 3,
    skillsAvailable:
      "Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, Survival",
  },
  Rogue: {
    skillCount: 4,
    skillsAvailable:
      "Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, Stealth",
  },
  Sorcerer: {
    skillCount: 2,
    skillsAvailable:
      "Arcana, Deception, Insight, Intimidation, Persuasion, Religion",
  },
  Warlock: {
    skillCount: 2,
    skillsAvailable:
      "Arcana, Deception, History, Intimidation, Investigation, Nature, Religion",
  },
  Wizard: {
    skillCount: 2,
    skillsAvailable:
      "Arcana, History, Insight, Investigation, Medicine, Religion",
  },
};

const ProficiencyGrid = ({
  skills,
  setSkills,
  backgrounds,
  selectedBackgroundId,
  classes,
  selectedClassId,
  languages,
  races,
  selectedRaceId,
}: {
  skills: Record<string, boolean>;
  setSkills: React.Dispatch<SetStateAction<Record<string, boolean>>>;
  backgrounds: Backgrounds[];
  classes: Classes[];
  selectedBackgroundId: number;
  selectedClassId: number;
  languages: Languages;
  races: Races[];
  selectedRaceId: number;
}) => {
  const [limitSkills, setLimitSkills] = useState<number>(
    classSkillSelections[classes[selectedClassId - 1]["name"]]["skillCount"]
  );
  const toggleSkill = (skill: string) => {
    setSkills((prevSkills) => ({
      ...prevSkills,
      [skill]: !prevSkills[skill],
    }));
  };

  const toggleLang = (lange: string) => {
    setSkills((prevLangs) => ({
      ...prevLangs,
      [lange]: !prevLangs[lange],
    }));
  };

  useEffect(() => {
    setLimitSkills(
      classSkillSelections[classes[selectedClassId - 1]["name"]]["skillCount"]
    );
  }, [selectedBackgroundId]);

  return (
    <>
      <div className="w-full grid grid-cols-10 space-x-4">
        <div className="bg-white col-span-2 p-10 rounded-xl">
          <h1 className="text-2xl pb-3">Skills:</h1>
          <p className="pb-2">
            Choose {limitSkills} skills to add your proficiency modifier.
          </p>
          <fieldset>
            <legend className="sr-only">Skills</legend>
            <div className="space-y-5">
              {Object.entries(skills).map(([skill, isActive]) => {
                return (
                  <div
                    className={
                      !classSkillSelections[
                        classes[selectedClassId - 1]["name"]
                      ]["skillsAvailable"].includes(skill)
                        ? "relative flex items-start bg-slate-200"
                        : "relative flex items-start"
                    }
                  >
                    <div className="flex h-6 items-center">
                      <input
                        id={skill}
                        name={skill}
                        type="checkbox"
                        checked={isActive}
                        disabled={
                          !classSkillSelections[
                            classes[selectedClassId - 1]["name"]
                          ]["skillsAvailable"].includes(skill)
                        }
                        onChange={() => toggleSkill(skill)}
                        aria-describedby="comments-description"
                        className={
                          !classSkillSelections[
                            classes[selectedClassId - 1]["name"]
                          ]["skillsAvailable"].includes(skill)
                            ? "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 bg-slate-200"
                            : "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                        }
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor={skill}
                        className="font-medium text-gray-900"
                      >
                        {skill}
                      </label>{" "}
                      {/* <span id="comments-description" className="text-gray-500">
                        <span className="sr-only">New comments </span>so you
                        always know what's happening.
                      </span> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </fieldset>
        </div>
        <div className="bg-white col-span-2 p-10 rounded-xl">
          <h1 className="text-2xl pb-3">Languages:</h1>
          <p className="pb-2">
            Choose {limitSkills} skills to add your proficiency modifier.
          </p>
          <fieldset>
            <legend className="sr-only">Skills</legend>
            <div className="space-y-5">
              {Object.entries(languages).map(([lang, isActive]) => {
                return (
                  <div
                    className={
                      racialLanguages[
                        races[selectedRaceId - 1]["name"]
                      ].includes("any")
                        ? "relative flex items-start bg-slate-200"
                        : "relative flex items-start"
                    }
                  >
                    <div className="flex h-6 items-center">
                      <input
                        id={lang}
                        name={lang}
                        type="checkbox"
                        checked={isActive}
                        disabled={racialLanguages[
                          races[selectedRaceId - 1]["name"]
                        ].includes("any")}
                        onChange={() => toggleLang(lang)}
                        aria-describedby="comments-description"
                        className={
                          racialLanguages[
                            races[selectedRaceId - 1]["name"]
                          ].includes("any")
                            ? "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 bg-slate-200"
                            : "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                        }
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor={lang}
                        className="font-medium text-gray-900"
                      >
                        {lang}
                      </label>{" "}
                      {/* <span id="comments-description" className="text-gray-500">
                        <span className="sr-only">New comments </span>so you
                        always know what's happening.
                      </span> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default ProficiencyGrid;
