import { SetStateAction } from "react";
import { Classes, Races } from "./objectsDeclaration";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ClassesGrid = ({
  classes,
  classId,
  setClassId,
  setDisplayClasses,
  setDisplayBackgrounds,
  setDisplayRaces,
  selectedClassId,
  setSelectedClassId,
  races,
  selectedRaceId,
  setDisplaySubRace,
}: {
  classes: Classes[];
  classId: number;
  setClassId: React.Dispatch<SetStateAction<number>>;
  setDisplayClasses: React.Dispatch<SetStateAction<boolean>>;
  setDisplayBackgrounds: React.Dispatch<SetStateAction<boolean>>;
  setDisplayRaces: React.Dispatch<SetStateAction<boolean>>;
  selectedClassId: number;
  setSelectedClassId: React.Dispatch<SetStateAction<number>>;
  setDisplaySubRace: React.Dispatch<SetStateAction<boolean>>;
  races: Races[];
  selectedRaceId: number;
}) => {
  const setSelectedClass = (class_id: number) => {
    setClassId(class_id);
    setSelectedClassId(class_id);
  };

  const NextPage = () => {
    setDisplayClasses(false);
    setDisplayBackgrounds(true);
  };

  const PrevPage = () => {
    if (selectedRaceId !== 0) {
      if (races[selectedRaceId - 1]["subraces"] === null) {
        setDisplayClasses(false);
        setDisplayRaces(true);
      } else {
        setDisplayClasses(false);
        setDisplaySubRace(true);
      }
    } else {
      setDisplayClasses(false);
      setDisplayRaces(true);
    }
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
        <h1 className="text-3xl px-5 pb-3">Classes:</h1>
        <p className="px-5">
          Choosing a class is one of the most exciting parts of creating your
          Dungeons & Dragons character. Your class defines what role your
          character plays in the world—how they fight, what skills they bring to
          the party, and how they interact with others.
        </p>
      </div>
      <div className="flex w-full space-x-4 pt-8">
        <ul
          role="list"
          className="grid gap-6 grid-cols-2 justify-start h-min w-4/5"
        >
          {classes.map((classs) => (
            <li
              key={classs.id}
              className={classNames(
                classs.id === selectedClassId
                  ? "col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow border-indigo-500 border-double border-2"
                  : "col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow border-indigo-500"
              )}
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {classs.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 truncate text-wrap">
                    {classs.description}
                  </p>
                </div>
              </div>
              <div className="flex divide-x divide-grey-500">
                <div className="flex w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      setClassId(classs.id);
                    }}
                    className="-mr-px inline-flex w-0 flex-1 justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-indigo-600 bg-indigo-50 px-2.5 shadow-sm hover:bg-indigo-100"
                  >
                    More Info
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => setSelectedClass(classs.id)}
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
                {classes[classId - 1]["name"]}
              </h2>
              <p className="mt-4 text-gray-500">
                {classes[classId - 1]["description"]}
              </p>

              <dl className="mt-16 grid gap-x-6 gap-y-10 grid-cols-3">
                {classes[classId - 1]["features"].map((feature) => (
                  <div
                    key={feature.id}
                    className="border-t border-gray-200 pt-4"
                  >
                    <dt className="font-medium text-gray-900">
                      {feature.feature}
                    </dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {feature.description}
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
export default ClassesGrid;
