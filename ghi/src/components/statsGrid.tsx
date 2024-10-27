import { useState, SetStateAction, useEffect } from "react";
import StatModifier from "./modfierFunc";
import classStats from "./classStats";

interface Tab {
  name: string;
  href: string;
  current: boolean;
}

const tabs: Tab[] = [
  { name: "Dice Rolling", href: "#", current: true },
  { name: "Point Buying", href: "#", current: true },
];
interface PointCostDec {
  [key: number]: number;
}
const PointCost: PointCostDec = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Stats = ({
  diceStrength,
  diceDexterity,
  diceConstitution,
  diceIntelligence,
  diceWisdom,
  diceCharisma,
  setDiceStrength,
  setDiceDexterity,
  setDiceConstitution,
  setDiceIntelligence,
  setDiceWisdom,
  setDiceCharisma,
  setDisplayBackgrounds,
  setDisplayStats,
  setSelectedTab,
  setTab,
  selectedClassId,
  pointsStrength,
  pointsDexterity,
  pointsConstitution,
  pointsIntelligence,
  pointsWisdom,
  pointsCharisma,
  setPointsStrength,
  setPointsDexterity,
  setPointsConstitution,
  setPointsIntelligence,
  setPointsWisdom,
  setPointsCharisma,
  setDisplaySkills,
}: {
  diceStrength: number;
  diceDexterity: number;
  diceConstitution: number;
  diceIntelligence: number;
  diceWisdom: number;
  diceCharisma: number;
  setDiceStrength: React.Dispatch<SetStateAction<number>>;
  setDiceDexterity: React.Dispatch<SetStateAction<number>>;
  setDiceConstitution: React.Dispatch<SetStateAction<number>>;
  setDiceIntelligence: React.Dispatch<SetStateAction<number>>;
  setDiceWisdom: React.Dispatch<SetStateAction<number>>;
  setDiceCharisma: React.Dispatch<SetStateAction<number>>;
  setDisplayBackgrounds: React.Dispatch<SetStateAction<boolean>>;
  setDisplayStats: React.Dispatch<SetStateAction<boolean>>;
  setSelectedTab: React.Dispatch<SetStateAction<string>>;
  setTab: string;
  selectedClassId: number;
  pointsStrength: number;
  pointsDexterity: number;
  pointsConstitution: number;
  pointsIntelligence: number;
  pointsWisdom: number;
  pointsCharisma: number;
  setPointsStrength: React.Dispatch<SetStateAction<number>>;
  setPointsDexterity: React.Dispatch<SetStateAction<number>>;
  setPointsConstitution: React.Dispatch<SetStateAction<number>>;
  setPointsIntelligence: React.Dispatch<SetStateAction<number>>;
  setPointsWisdom: React.Dispatch<SetStateAction<number>>;
  setPointsCharisma: React.Dispatch<SetStateAction<number>>;
  setDisplaySkills: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const SetTab = (tabName: string) => setSelectedTab(tabName);

  const StrengthDiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setDiceStrength(value);
  };
  const DexterityDiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setDiceDexterity(value);
  };
  const ConstitutionDiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setDiceConstitution(value);
  };
  const IntelligenceDiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setDiceIntelligence(value);
  };
  const WisdomDiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setDiceWisdom(value);
  };
  const CharismaDiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setDiceCharisma(value);
  };
  const StrengthPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setPointsStrength(value);
  };
  const DexterityPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setPointsDexterity(value);
  };
  const ConstitutionPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setPointsConstitution(value);
  };
  const IntelligencePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setPointsIntelligence(value);
  };
  const WisdomPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setPointsWisdom(value);
  };
  const CharismaPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setPointsCharisma(value);
  };

  const NextPage = () => {
    setDisplayStats(false);
    setDisplaySkills(true);
  };

  const PrevPage = () => {
    setDisplayStats(false);
    setDisplayBackgrounds(true);
  };

  const [cost, setCost] = useState<number>(0);

  const Cost = () => {
    let total =
      PointCost[pointsStrength] +
      PointCost[pointsDexterity] +
      PointCost[pointsConstitution] +
      PointCost[pointsIntelligence] +
      PointCost[pointsWisdom] +
      PointCost[pointsCharisma];

    setCost(total);
  };

  useEffect(() => {
    Cost();
  }, [
    pointsStrength,
    pointsDexterity,
    pointsConstitution,
    pointsIntelligence,
    pointsWisdom,
    pointsCharisma,
  ]);

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
        <h1 className="text-3xl px-5 pb-3">Stats:</h1>
        <p className="px-5">
          In Dungeons & Dragons, your character's stats (or ability scores) are
          the foundation for how they perform both in and out of combat. These
          scores represent six core attributes that define your character’s
          strengths and weaknesses, shaping their skills, saving throws, and
          combat effectiveness. Choosing the right stats ensures your character
          functions well in their role and fits your concept. Whichever tab you
          have selected below will be the stats used when you finish creation.
        </p>
      </div>
      <div className="w-full pb-6 py-8">
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav
              aria-label="Tabs"
              className="-mb-px flex bg-slate-100 rounded-t-3xl"
            >
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  onClick={() => SetTab(tab.name)}
                  aria-current={tab.name === setTab ? "page" : undefined}
                  className={classNames(
                    tab.name === setTab
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "border-b-2 px-1 py-4 text-center text-sm font-medium w-full cursor-pointer"
                  )}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {setTab === "Dice Rolling" ? (
        <div className="grid grid-cols-2 w-full space-x-7">
          <div className="flex justify-center flex-col px-10 bg-white rounded-lg py-4 col-span-1">
            <p className="p-2">
              The dice rolling method is the traditional way of generating a
              character's ability scores in D&D 5e. It introduces an element of
              randomness, which can lead to both powerful or flawed characters.
            </p>
            <ul className="list-disc px-9 py-4">
              <li>Roll 4d6 (four six-sided dice).</li>
              <li>Drop the lowest die result.</li>
              <li>Sum the remaining three dice to get an ability score.</li>
              <li>
                Repeat the process six times to generate scores for Strength,
                Dexterity, Constitution, Intelligence, Wisdom, and Charisma.
              </li>
              <li>Assign the scores to the abilities of your choice.</li>
            </ul>
          </div>
          <div className="col-span-1 bg-white rounded-lg px-10 py-4">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    Stats
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    {"Allocate your stats here. "}
                    {selectedClassId > 0
                      ? classStats[selectedClassId - 1]["explanation"]
                      : null}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="mt-8 flow-root col-span-1">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                            >
                              Stat
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Modifier
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          <tr key="strength">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              <div>
                                <label
                                  htmlFor="diceStrength"
                                  className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Strength
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="diceStrength"
                                    name="diceStrength"
                                    type="number"
                                    value={diceStrength}
                                    onChange={StrengthDiceChange}
                                    min={0}
                                    max={20}
                                    placeholder="8"
                                    className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900 text-md font-medium">
                                STR: {diceStrength > 11 ? "+" : null}
                                {StatModifier(diceStrength)}
                              </div>
                            </td>
                          </tr>
                          <tr key="dexterity">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              <div>
                                <label
                                  htmlFor="diceDexterity"
                                  className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Dexterity
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="diceDexterity"
                                    name="diceDexterity"
                                    type="number"
                                    value={diceDexterity}
                                    onChange={DexterityDiceChange}
                                    min={0}
                                    max={20}
                                    placeholder="8"
                                    className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900 text-md font-medium">
                                DEX: {diceDexterity > 11 ? "+" : null}
                                {StatModifier(diceDexterity)}
                              </div>
                            </td>
                          </tr>
                          <tr key="constitution">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              <div>
                                <label
                                  htmlFor="diceConstitution"
                                  className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Constitution
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="diceConstitution"
                                    name="diceConstitution"
                                    type="number"
                                    value={diceConstitution}
                                    onChange={ConstitutionDiceChange}
                                    min={0}
                                    max={20}
                                    placeholder="8"
                                    className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900 text-md font-medium">
                                CON: {diceConstitution > 11 ? "+" : null}
                                {StatModifier(diceConstitution)}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flow-root col-span-1">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                            >
                              Stat
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Modifier
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          <tr key="intelligence">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              <div>
                                <label
                                  htmlFor="diceIntelligence"
                                  className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Intelligence
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="diceIntelligence"
                                    name="diceIntelligence"
                                    type="number"
                                    value={diceIntelligence}
                                    onChange={IntelligenceDiceChange}
                                    min={0}
                                    max={20}
                                    placeholder="8"
                                    className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900 text-md font-medium">
                                INT: {diceIntelligence > 11 ? "+" : null}
                                {StatModifier(diceIntelligence)}
                              </div>
                            </td>
                          </tr>
                          <tr key="wisdom">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              <div>
                                <label
                                  htmlFor="diceWisdom"
                                  className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Wisdom
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="diceWisdom"
                                    name="diceWisdom"
                                    type="number"
                                    value={diceWisdom}
                                    onChange={WisdomDiceChange}
                                    min={0}
                                    max={20}
                                    placeholder="8"
                                    className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900 text-md font-medium">
                                WIS: {diceWisdom > 11 ? "+" : null}
                                {StatModifier(diceWisdom)}
                              </div>
                            </td>
                          </tr>
                          <tr key="charisma">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              <div>
                                <label
                                  htmlFor="diceCharisma"
                                  className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Charisma
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="diceCharisma"
                                    name="diceCharisma"
                                    type="number"
                                    value={diceCharisma}
                                    onChange={CharismaDiceChange}
                                    min={0}
                                    max={20}
                                    placeholder="8"
                                    className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900 text-md font-medium">
                                CHA: {diceCharisma > 11 ? "+" : null}
                                {StatModifier(diceCharisma)}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {setTab === "Point Buying" ? (
        <div className="grid grid-cols-2 w-full space-x-7">
          <div className="flex justify-center flex-col px-10 bg-white rounded-lg py-4 col-span-1">
            <p className="p-2">
              The Point Buy System is a method used to generate a character's
              ability scores with more control and balance than rolling dice. It
              gives players 27 points to spend across six ability scores and
              ensures fairness by limiting how high or low these scores can be.
            </p>
            <ul className="list-decimal px-9 py-4">
              <li>
                Starting Score & Range:
                <ul className="list-disc px-4">
                  <li>Every ability score starts at 8</li>
                  <li>
                    Players can increase each ability score up to 15 using
                    points.
                  </li>
                  <li>
                    No score can be lower than 8 or higher than 15 before
                    bonuses are applied
                  </li>
                </ul>
              </li>
              <li>
                Point Costs:
                <div className="mt-8 flow-root col-span-1">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                            >
                              Ability Score
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Cost
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                            >
                              Ability Score
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Cost
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          <tr key="1">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              8
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {PointCost[8]}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              12
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {PointCost[12]}
                            </td>
                          </tr>
                          <tr key="2">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              9
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {PointCost[9]}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              13
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {PointCost[13]}
                            </td>
                          </tr>
                          <tr key="3">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              10
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {PointCost[10]}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              14
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {PointCost[14]}
                            </td>
                          </tr>
                          <tr key="4">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              11
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {PointCost[11]}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              15
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {PointCost[15]}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                Total Points Available:
                <ul className="list-disc px-4">
                  <li>
                    You get 27 points to distribute across the six ability
                    scores.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="col-span-1 bg-white rounded-lg px-10 py-4">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <div className="w-full flex justify-between">
                    <h1 className="font-semibold leading-6 text-gray-900 text-xl">
                      Stats
                    </h1>
                    <h2 className="text-indigo-900 text-xl">Cost: {cost}/27</h2>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    {"Allocate your stats here. "}
                    {selectedClassId > 0
                      ? classStats[selectedClassId - 1]["explanation"]
                      : null}
                  </p>
                </div>
              </div>
              <div className="grid-cols-2 grid">
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                            >
                              Stat
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Modifier
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          <tr key="strength">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              <div>
                                <label
                                  htmlFor="pointStrength"
                                  className="ml-px block pl-3 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Strength
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="pointStrength"
                                    name="pointStrength"
                                    type="number"
                                    value={pointsStrength}
                                    onChange={StrengthPointChange}
                                    min={8}
                                    max={cost === 27 ? pointsStrength : 15}
                                    placeholder="8"
                                    className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900 text-md font-medium">
                                STR: {pointsStrength > 11 ? "+" : null}
                                {StatModifier(pointsStrength)}
                              </div>
                            </td>
                          </tr>
                          <tr key="dexterity">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              <div>
                                <label
                                  htmlFor="pointDexterity"
                                  className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Dexterity
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="pointDexterity"
                                    name="pointDexterity"
                                    type="number"
                                    value={pointsDexterity}
                                    onChange={DexterityPointChange}
                                    min={8}
                                    max={cost === 27 ? pointsDexterity : 15}
                                    placeholder="8"
                                    className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900 text-md font-medium">
                                DEX: {pointsDexterity > 11 ? "+" : null}
                                {StatModifier(pointsDexterity)}
                              </div>
                            </td>
                          </tr>
                          <tr key="constitution">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              <div>
                                <label
                                  htmlFor="pointConstitution"
                                  className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Constitution
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="pointConstitution"
                                    name="pointConstitution"
                                    type="number"
                                    value={pointsConstitution}
                                    onChange={ConstitutionPointChange}
                                    min={8}
                                    max={cost === 27 ? pointsConstitution : 15}
                                    placeholder="8"
                                    className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900 text-md font-medium">
                                CON: {pointsConstitution > 11 ? "+" : null}
                                {StatModifier(pointsConstitution)}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flow-root col-span-1">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                            >
                              Stat
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Modifier
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          <tr key="intelligence">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              <div>
                                <label
                                  htmlFor="pointIntelligence"
                                  className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Intelligence
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="pointIntelligence"
                                    name="pointIntelligence"
                                    type="number"
                                    value={pointsIntelligence}
                                    onChange={IntelligencePointChange}
                                    min={8}
                                    max={cost === 27 ? pointsIntelligence : 15}
                                    placeholder="8"
                                    className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900 text-md font-medium">
                                INT: {pointsIntelligence > 11 ? "+" : null}
                                {StatModifier(pointsIntelligence)}
                              </div>
                            </td>
                          </tr>
                          <tr key="wisdom">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              <div>
                                <label
                                  htmlFor="pointWisdom"
                                  className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Wisdom
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="pointWisdom"
                                    name="pointWisdom"
                                    type="number"
                                    value={pointsWisdom}
                                    onChange={WisdomPointChange}
                                    min={8}
                                    max={cost === 27 ? pointsWisdom : 15}
                                    placeholder="8"
                                    className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900 text-md font-medium">
                                WIS: {pointsWisdom > 11 ? "+" : null}
                                {StatModifier(pointsWisdom)}
                              </div>
                            </td>
                          </tr>
                          <tr key="charisma">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              <div>
                                <label
                                  htmlFor="pointCharisma"
                                  className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Charisma
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="pointCharisma"
                                    name="pointCharisma"
                                    type="number"
                                    value={pointsCharisma}
                                    onChange={CharismaPointChange}
                                    min={8}
                                    max={cost === 27 ? pointsCharisma : 15}
                                    placeholder="8"
                                    className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900 text-md font-medium">
                                CHA: {pointsCharisma > 11 ? "+" : null}
                                {StatModifier(pointsCharisma)}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Stats;
