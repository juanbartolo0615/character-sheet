import { Characters } from "./objectsDeclaration";

const CharacterGrid = ({
  characters,
  message,
  router,
}: {
  characters: Characters[];
  message: string;
  router: any;
}) => {
  interface Races {
    [num: number]: string;
  }
  const characterRaceName: Races = {
    1: "Dwarf",
    2: "Elf",
    3: "Hafling",
    4: "Human",
    5: "Dragonborn",
    6: "Gnome",
    7: "Half-Elf",
    8: "Half-Orc",
    9: "Tiefling",
  };
  interface Names {
    [num: number]: string;
  }
  const NameOfClass: Names = {
    1: "Barbarian",
    2: "Bard",
    3: "Cleric",
    4: "Druid",
    5: "Fighter",
    6: "Monk",
    7: "Paladin",
    8: "Ranger",
    9: "Rougue",
    10: "Sorceror",
    11: "Warlock",
    12: "Wizard",
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {characters.map((character) => (
        <div
          key={character.id}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="min-w-0 flex-1">
            <a href="#" className="focus:outline-none">
              <span aria-hidden="true" className="absolute inset-0" />
              <div className="flex space-x-6">
                <p className="text-sm font-medium text-gray-900">
                  {character.name}
                </p>
                <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Level: {character.level}
                </span>
              </div>
              <p className="truncate text-sm text-gray-500">
                {characterRaceName[character.race_id]}{" "}
                {NameOfClass[character.class_id]}
              </p>
            </a>
          </div>
        </div>
      ))}
      <button
        onClick={() => router.push("/characters/create")}
        type="button"
        className="relative flex items-center w-full rounded-lg border-2 border-dashed border-gray-300 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-20"
      >
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
          aria-hidden="true"
          className="h-12 w-12 text-gray-400 px-2"
        >
          <path
            d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="mt-2 flex text-sm font-semibold text-gray-900 px-4">
          {message}
        </span>
      </button>
    </div>
  );
};

export default CharacterGrid;
