import { Backgrounds } from "./objectsDeclaration";
import { SetStateAction, useEffect } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BackgroundGrid = ({
  backgrounds,
  backgroundId,
  setBackgroundId,
  setDisplayBackgrounds,
  setDisplayClasses,
  selectedBackgroundId,
  setSelectedBackgroundId,
  setDisplayStats,
  setDisplaySubRace,
  setSkills,
  skills,
}: {
  backgrounds: Backgrounds[];
  backgroundId: number;
  setBackgroundId: React.Dispatch<SetStateAction<number>>;
  setDisplayBackgrounds: React.Dispatch<SetStateAction<boolean>>;
  setDisplayClasses: React.Dispatch<SetStateAction<boolean>>;
  selectedBackgroundId: number;
  setSelectedBackgroundId: React.Dispatch<SetStateAction<number>>;
  setDisplayStats: React.Dispatch<SetStateAction<boolean>>;
  setDisplaySubRace: React.Dispatch<SetStateAction<boolean>>;
  setSkills: React.Dispatch<SetStateAction<Record<string, boolean>>>;
  skills: Record<string, boolean>;
}) => {
  const setSelectedRace = (background_id: number) => {
    setBackgroundId(background_id);
    setSelectedBackgroundId(background_id);
  };
  const NextPage = () => {
    setDisplayBackgrounds(false);
    setDisplayStats(true);
  };

  const PrevPage = () => {
    setDisplayBackgrounds(false);
    setDisplayClasses(true);
  };
  const SkillsProficiency = () => {
    if (selectedBackgroundId !== 0) {
      const proficiencies =
        backgrounds[selectedBackgroundId - 1]["proficiencies"].split(", ");
      const resetSkills = Object.fromEntries(
        Object.keys(skills).map((skill) => [skill, false])
      );
      setSkills(resetSkills);
      for (const prof of proficiencies) {
        setSkills((prevSkills) => ({
          ...prevSkills,
          [prof]: !prevSkills[prof],
        }));
      }
    }
  };

  useEffect(() => {
    SkillsProficiency();
  }, [selectedBackgroundId]);
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
      <div className="flex w-full space-x-6">
        <ul
          role="list"
          className="grid gap-6 grid-cols-3 justify-start h-min basis-5/6"
        >
          {backgrounds.map((background) => (
            <li
              key={background.id}
              className={classNames(
                background.id === selectedBackgroundId
                  ? "col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow border-indigo-500 border-double border-2"
                  : "col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow border-indigo-500"
              )}
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {background.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 truncate text-wrap">
                    {background.description}
                  </p>
                </div>
              </div>
              <div className="flex divide-x divide-grey-500">
                <div className="flex w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      setBackgroundId(background.id);
                    }}
                    className="-mr-px inline-flex w-0 flex-1 justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-indigo-600 bg-indigo-50 px-2.5 shadow-sm hover:bg-indigo-100"
                  >
                    More Info
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => setSelectedRace(background.id)}
                    className="-mr-px inline-flex w-0 flex-1 justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-indigo-600 bg-indigo-50 px-2.5 shadow-sm hover:bg-indigo-100"
                  >
                    Select
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="justify-end basis-3/6">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 px-8 py-8 lg:max-w-7xl bg-white rounded-lg">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {backgrounds[backgroundId - 1]["name"]}
              </h2>
              <p className="mt-4 text-gray-500">
                {backgrounds[backgroundId - 1]["description"]}
              </p>

              <dl className="mt-16 grid gap-x-6 gap-y-10 grid-cols-3">
                <div key="feature" className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">
                    {backgrounds[backgroundId - 1]["feature"]}
                  </dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {backgrounds[backgroundId - 1]["feature_description"]}
                  </dd>
                </div>
                <div
                  key="proficiencies"
                  className="border-t border-gray-200 pt-4"
                >
                  <dt className="font-medium text-gray-900">Proficiencies</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {backgrounds[backgroundId - 1]["proficiencies"]}
                  </dd>
                </div>
                {backgrounds[backgroundId - 1]["languages"] > 0 ? (
                  <div
                    key="languages"
                    className="border-t border-gray-200 pt-4"
                  >
                    <dt className="font-medium text-gray-900">Languages</dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {backgrounds[backgroundId - 1]["languages"]}
                      {" new languages"}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BackgroundGrid;
