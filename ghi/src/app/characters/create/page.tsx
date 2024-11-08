"use client"; // This is a client component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RaceGrid from "@/components/raceGrid";
import CreateNav from "@/components/createNav";
import { Races, Classes, Backgrounds } from "@/components/objectsDeclaration";
import ClassesGrid from "@/components/classesGrid";
import BackgroundGrid from "@/components/backgroundGrid";
import Stats from "@/components/statsGrid";
import SubRacesGrid from "@/components/subRaces";
import ProficiencyGrid from "@/components/proficiencyGrid";

const initialSkillsState: Record<string, boolean> = {
  Acrobatics: false,
  "Animal Handling": false,
  Arcana: false,
  Athletics: false,
  Deception: false,
  History: false,
  Insight: false,
  Intimidation: false,
  Investigation: false,
  Medicine: false,
  Nature: false,
  Perception: false,
  Performance: false,
  Persuasion: false,
  Religion: false,
  "Sleight of Hand": false,
  Stealth: false,
  Survival: false,
};

export interface Languages {
  [language: string]: boolean;
}

const dndLanguages: Languages = {
  Common: false,
  Dwarvish: false,
  Elvish: false,
  Giant: false,
  Gnomish: false,
  Goblin: false,
  Halfling: false,
  Orc: false,
  Abyssal: false,
  Celestial: false,
  DeepSpeech: false,
  Draconic: false,
  Infernal: false,
  Primordial: false,
  Sylvan: false,
  Undercommon: false,
  any: false,
};

const Page = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<number>(0);

  const Authenticate = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8000/auth/verify/${token}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserId(data.id);
      } else {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [races, setRaces] = useState<Races[]>([]);
  const [raceId, setRaceId] = useState<number>(1);
  const [selectedRaceId, setSelectedRaceId] = useState<number>(0);
  const [displayRaces, setDisplayRaces] = useState<boolean>(false);

  const getRaces = async () => {
    if (userId !== 0) {
      try {
        const response = await fetch("http://localhost:8000/races/");
        const data = await response.json();
        setRaces(data);
        setDisplayRaces(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [classes, setClasses] = useState<Classes[]>([]);
  const [classId, setClassId] = useState<number>(1);
  const [selectedClassId, setSelectedClassId] = useState<number>(0);
  const [displayClasses, setDisplayClasses] = useState<boolean>(false);

  const getClasses = async () => {
    if (userId !== 0) {
      try {
        const response = await fetch("http://localhost:8000/class/");
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [backgrounds, setBackgrounds] = useState<Backgrounds[]>([]);
  const [backgroundId, setBackgroundId] = useState<number>(1);
  const [selectedBackgroundId, setSelectedBackgroundId] = useState<number>(0);
  const [displayBackgrounds, setDisplayBackgrounds] = useState<boolean>(false);

  const getBackgrounds = async () => {
    if (userId !== 0) {
      try {
        const response = await fetch("http://localhost:8000/backgrounds/");
        const data = await response.json();
        setBackgrounds(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const [setTab, setSelectedTab] = useState<string>("Dice Rolling");
  const [displayStats, setDisplayStats] = useState<boolean>(false);
  const [diceStrength, setDiceStrength] = useState<number>(8);
  const [diceDexterity, setDiceDexterity] = useState<number>(8);
  const [diceConstitution, setDiceConstitution] = useState<number>(8);
  const [diceIntelligence, setDiceIntelligence] = useState<number>(8);
  const [diceWisdom, setDiceWisdom] = useState<number>(8);
  const [diceCharisma, setDiceCharisma] = useState<number>(8);
  const [pointsStrength, setPointsStrength] = useState<number>(8);
  const [pointsDexterity, setPointsDexterity] = useState<number>(8);
  const [pointsConstitution, setPointsConstitution] = useState<number>(8);
  const [pointsIntelligence, setPointsIntelligence] = useState<number>(8);
  const [pointsWisdom, setPointsWisdom] = useState<number>(8);
  const [pointsCharisma, setPointsCharisma] = useState<number>(8);

  const [displaySubRaces, setDisplaySubRace] = useState<boolean>(false);
  const [selectedSubRace, setSelectedSubRace] = useState<number>(0);
  const [subRace, setSubrace] = useState<number>(1);

  const [displaySkills, setDisplaySkills] = useState<boolean>(false);
  const [skills, setSkills] =
    useState<Record<string, boolean>>(initialSkillsState);

  const [languages, SetLanguages] = useState<Languages>(dndLanguages);

  useEffect(() => {
    Authenticate();
  }, []);

  useEffect(() => {
    getRaces();
    getClasses();
    getBackgrounds();
  }, [userId]);

  return (
    <>
      <CreateNav
        displayRaces={displayRaces}
        setDisplayRaces={setDisplayRaces}
        displaySubRaces={displaySubRaces}
        setDisplaySubRace={setDisplaySubRace}
        displayClasses={displayClasses}
        setDisplayClasses={setDisplayClasses}
        displayBackgrounds={displayBackgrounds}
        setDisplayBackgrounds={setDisplayBackgrounds}
        displayStats={displayStats}
        setDisplayStats={setDisplayStats}
        selectedRaceId={selectedRaceId}
        races={races}
        displaySkills={displaySkills}
        selectedClassId={selectedClassId}
        setDisplaySkills={setDisplaySkills}
        selectedBackgroundId={selectedBackgroundId}
      />
      {displayRaces ? (
        <RaceGrid
          races={races}
          raceId={raceId}
          setRaceId={setRaceId}
          setDisplayClasses={setDisplayClasses}
          setDisplayRaces={setDisplayRaces}
          setSelectedRaceId={setSelectedRaceId}
          selectedRaceId={selectedRaceId}
          setDisplaySubRace={setDisplaySubRace}
          SetLanguages={SetLanguages}
          languages={languages}
        />
      ) : null}
      {displaySubRaces ? (
        <SubRacesGrid
          races={races}
          setDisplayRaces={setDisplayRaces}
          setDisplayClasses={setDisplayClasses}
          selectedRaceId={selectedRaceId}
          setDisplaySubRace={setDisplaySubRace}
          selectedSubRace={selectedSubRace}
          setSelectedSubRace={setSelectedSubRace}
          subRace={subRace}
          setSubrace={setSubrace}
        />
      ) : null}
      {displayClasses ? (
        <ClassesGrid
          classes={classes}
          classId={classId}
          setClassId={setClassId}
          setDisplayClasses={setDisplayClasses}
          setDisplayBackgrounds={setDisplayBackgrounds}
          setDisplayRaces={setDisplayRaces}
          selectedClassId={selectedClassId}
          setSelectedClassId={setSelectedClassId}
          races={races}
          selectedRaceId={selectedRaceId}
          setDisplaySubRace={setDisplaySubRace}
        />
      ) : null}
      {displayBackgrounds ? (
        <BackgroundGrid
          backgrounds={backgrounds}
          backgroundId={backgroundId}
          setBackgroundId={setBackgroundId}
          setDisplayBackgrounds={setDisplayBackgrounds}
          setDisplayClasses={setDisplayClasses}
          selectedBackgroundId={selectedBackgroundId}
          setSelectedBackgroundId={setSelectedBackgroundId}
          setDisplayStats={setDisplayStats}
          setDisplaySubRace={setDisplaySubRace}
          setSkills={setSkills}
          skills={skills}
        />
      ) : null}
      {displayStats ? (
        <Stats
          diceStrength={diceStrength}
          diceDexterity={diceDexterity}
          diceConstitution={diceConstitution}
          diceIntelligence={diceIntelligence}
          diceWisdom={diceWisdom}
          diceCharisma={diceCharisma}
          setDiceStrength={setDiceStrength}
          setDiceDexterity={setDiceDexterity}
          setDiceConstitution={setDiceConstitution}
          setDiceIntelligence={setDiceIntelligence}
          setDiceWisdom={setDiceWisdom}
          setDiceCharisma={setDiceCharisma}
          setDisplayBackgrounds={setDisplayBackgrounds}
          setDisplayStats={setDisplayStats}
          setSelectedTab={setSelectedTab}
          setTab={setTab}
          selectedClassId={selectedClassId}
          pointsStrength={pointsStrength}
          pointsDexterity={pointsDexterity}
          pointsConstitution={pointsConstitution}
          pointsIntelligence={pointsIntelligence}
          pointsWisdom={pointsWisdom}
          pointsCharisma={pointsCharisma}
          setPointsStrength={setPointsStrength}
          setPointsDexterity={setPointsDexterity}
          setPointsConstitution={setPointsConstitution}
          setPointsIntelligence={setPointsIntelligence}
          setPointsWisdom={setPointsWisdom}
          setPointsCharisma={setPointsCharisma}
          setDisplaySkills={setDisplaySkills}
        />
      ) : null}
      {displaySkills ? (
        <ProficiencyGrid
          skills={skills}
          setSkills={setSkills}
          backgrounds={backgrounds}
          selectedBackgroundId={selectedBackgroundId}
          classes={classes}
          selectedClassId={selectedClassId}
          languages={languages}
          races={races}
          selectedRaceId={selectedRaceId}
          SetLanguages={SetLanguages}
        />
      ) : null}
      {/* // <img src="/Wizard.svg" className="h-14 w-16"></img>; */}
    </>
  );
};

export default Page;
