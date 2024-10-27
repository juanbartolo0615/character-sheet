import { Races } from "./objectsDeclaration";
import { SetStateAction, useEffect } from "react";
import { Languages } from "@/app/characters/create/page";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface RaceLanguages {
  [race: string]: string;
}

export const racialLanguages: RaceLanguages = {
  Dwarf: "Common, Dwarvish",
  Elf: "Common, Elvish",
  Halfling: "Common, Halfling",
  Human: "Common, any",
  Dragonborn: "Common, Draconic",
  Gnome: "Common, Gnomish",
  HalfElf: "Common, Elvish, any",
  HalfOrc: "Common, Orc",
  Orc: "Common, Orc",
  Tiefling: "Common, Infernal",
};

const RaceGrid = ({
  races,
  raceId,
  setRaceId,
  setDisplayClasses,
  setDisplayRaces,
  setSelectedRaceId,
  selectedRaceId,
  setDisplaySubRace,
  SetLanguages,
  languages,
}: {
  races: Races[];
  raceId: number;
  setRaceId: React.Dispatch<SetStateAction<number>>;
  setDisplayClasses: React.Dispatch<SetStateAction<boolean>>;
  setDisplayRaces: React.Dispatch<SetStateAction<boolean>>;
  setSelectedRaceId: React.Dispatch<SetStateAction<number>>;
  selectedRaceId: number;
  setDisplaySubRace: React.Dispatch<SetStateAction<boolean>>;
  SetLanguages: React.Dispatch<SetStateAction<Languages>>;
  languages: Languages;
}) => {
  const setSelectedRace = (race_id: number) => {
    setRaceId(race_id);
    setSelectedRaceId(race_id);
  };
  const NextPage = () => {
    if (selectedRaceId !== 0) {
      if (races[selectedRaceId - 1]["subraces"] === null) {
        setDisplayRaces(false);
        setDisplayClasses(true);
      } else {
        setDisplayRaces(false);
        setDisplaySubRace(true);
      }
    } else {
      setDisplayRaces(false);
      setDisplayClasses(true);
    }
  };
  const LanguagesKnown = () => {
    if (selectedRaceId !== 0) {
      const langs =
        racialLanguages[races[selectedRaceId - 1]["name"]].split(", ");
      const resetSkills = Object.fromEntries(
        Object.keys(languages).map((language) => [language, false])
      );
      SetLanguages(resetSkills);
      for (const lang of langs) {
        SetLanguages((prevSkills) => ({
          ...prevSkills,
          [lang]: !prevSkills[lang],
        }));
      }
    }
  };

  useEffect(() => {
    LanguagesKnown();
  }, [selectedRaceId]);
  return (
    <>
      <div className="w-full flex justify-end pb-3">
        <div>
          <button
            type="button"
            onClick={() => NextPage()}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Next
          </button>
        </div>
      </div>
      <div className="w-full bg-white rounded-md p-4">
        <h1 className="text-3xl px-5 pb-3">Races:</h1>
        <p className="px-5">
          In Dungeons & Dragons, choosing a race is one of the first steps in
          character creation. A character’s race represents their species or
          ancestry, determining physical traits, personality tendencies, and
          abilities. Races also offer unique bonuses, cultural backgrounds, and
          roleplaying opportunities, making the choice an important part of
          building a memorable character.
        </p>
      </div>
      <div className="flex w-full space-x-6 pt-8">
        <ul
          role="list"
          className="grid gap-6 grid-cols-2 justify-start h-min w-4/5"
        >
          {races.map((race) => (
            <li
              key={race.id}
              className={classNames(
                race.id === selectedRaceId
                  ? "col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow border-indigo-500 border-double border-2"
                  : "col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow border-indigo-500"
              )}
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {race.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 truncate text-wrap">
                    {race.description}
                  </p>
                </div>
              </div>
              <div className="flex divide-x divide-grey-500">
                <div className="flex w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      setRaceId(race.id);
                    }}
                    className="-mr-px inline-flex w-0 flex-1 justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-indigo-600 bg-indigo-50 px-2.5 shadow-sm hover:bg-indigo-100"
                  >
                    More Info
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => setSelectedRace(race.id)}
                    className="-mr-px inline-flex w-0 flex-1 justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-indigo-600 bg-indigo-50 px-2.5 shadow-sm hover:bg-indigo-100"
                  >
                    Select
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="justify-end w-full">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 px-8 py-8 lg:max-w-7xl bg-white rounded-lg">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {races[raceId - 1]["name"]}
              </h2>
              <p className="mt-4 text-gray-500">
                {races[raceId - 1]["description"]}
              </p>

              <dl className="mt-16 grid gap-x-6 gap-y-10 grid-cols-3">
                {races[raceId - 1]["traits"].map((trait) => (
                  <div key={trait.id} className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">{trait.trait}</dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {trait.description}
                      {trait.trait === "Speed" ? " ft" : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RaceGrid;
