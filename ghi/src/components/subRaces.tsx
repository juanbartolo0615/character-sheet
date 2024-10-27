import { SetStateAction } from "react";
import { Races } from "./objectsDeclaration";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SubRacesGrid = ({
  races,
  setDisplayClasses,
  setDisplayRaces,
  selectedRaceId,
  setDisplaySubRace,
  selectedSubRace,
  setSelectedSubRace,
  subRace,
  setSubrace,
}: {
  races: Races[];
  setDisplayClasses: React.Dispatch<SetStateAction<boolean>>;
  setDisplayRaces: React.Dispatch<SetStateAction<boolean>>;
  selectedRaceId: number;
  setDisplaySubRace: React.Dispatch<SetStateAction<boolean>>;
  selectedSubRace: number;
  setSelectedSubRace: React.Dispatch<SetStateAction<number>>;
  subRace: number;
  setSubrace: React.Dispatch<SetStateAction<number>>;
}) => {
  const NextPage = () => {
    setDisplaySubRace(false);
    setDisplayClasses(true);
  };

  const PrevPage = () => {
    setDisplaySubRace(false);
    setDisplayRaces(true);
  };
  const SelectedSubraceId = (subrace_id: number) => {
    setSubrace(subrace_id);
    setSelectedSubRace(subrace_id);
  };
  return (
    <>
      <div className="w-full flex justify-between pb-3">
        <div>
          <button
            type="button"
            onClick={() => PrevPage()}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Previous
          </button>
        </div>
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
        <h1 className="text-3xl px-5 pb-3">Subraces:</h1>
        <p className="px-5">
          Many races in Dungeons & Dragons offer subraces—variations that
          reflect the character’s origin, culture, or specific heritage. A
          subrace not only adds flavor to your character’s story but also grants
          mechanical benefits like bonus abilities, resistances, or skill
          proficiencies.
        </p>
      </div>
      <div className="flex w-full space-x-6 pt-8">
        <ul
          role="list"
          className="grid gap-6 grid-cols-2 justify-start h-min w-4/5"
        >
          {races[selectedRaceId - 1]["subraces"].map((subrace) => (
            <li
              key={subrace.id}
              className={classNames(
                subrace.id === selectedSubRace
                  ? "col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow border-indigo-500 border-double border-2"
                  : "col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow border-indigo-500"
              )}
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {subrace.name}
                    </h3>
                  </div>
                  {/* <p className="mt-1 text-sm text-gray-500 truncate text-wrap">
                    {subrace.traits}
                  </p> */}
                </div>
              </div>
              <div className="flex divide-x divide-grey-500">
                <div className="flex w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSubrace(subrace.id);
                    }}
                    className="-mr-px inline-flex w-0 flex-1 justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-indigo-600 bg-indigo-50 px-2.5 shadow-sm hover:bg-indigo-100"
                  >
                    More Info
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => SelectedSubraceId(subrace.id)}
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
                {/* {races[selectedRaceId - 1]["subraces"][subRace - 1]["name"]} */}
                {races[selectedRaceId - 1]["name"] === "Dragonborn"
                  ? "Draconic Ancestry "
                  : null}
                {races[selectedRaceId - 1]["subraces"].map((subrace) => {
                  if (subrace.id === subRace) {
                    return subrace.name;
                  } else {
                    return null;
                  }
                })}
              </h2>
              <dl className="mt-16 grid gap-x-6 gap-y-10 grid-cols-3">
                {races[selectedRaceId - 1]["subraces"].map((subrace) => {
                  if (subrace.id === subRace) {
                    return subrace["traits"].map((trait) => (
                      <div
                        key={trait.id}
                        className="border-t border-gray-200 pt-4"
                      >
                        <dt className="font-medium text-gray-900">
                          {trait.trait}
                        </dt>
                        <dd className="mt-2 text-sm text-gray-500">
                          {trait.description}
                        </dd>
                      </div>
                    ));
                  } else {
                    return null;
                  }
                })}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubRacesGrid;
