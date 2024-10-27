import { SetStateAction } from "react";
import { Races } from "./objectsDeclaration";
import CreateNavComp from "./createNavcomp";

const CreateNav = ({
  displayRaces,
  setDisplayRaces,
  displaySubRaces,
  setDisplaySubRace,
  displayClasses,
  setDisplayClasses,
  displayBackgrounds,
  setDisplayBackgrounds,
  displayStats,
  setDisplayStats,
  selectedRaceId,
  races,
  displaySkills,
  selectedClassId,
  setDisplaySkills,
  selectedBackgroundId,
}: {
  displayRaces: boolean;
  setDisplayRaces: React.Dispatch<SetStateAction<boolean>>;
  displaySubRaces: boolean;
  setDisplaySubRace: React.Dispatch<SetStateAction<boolean>>;
  displayClasses: boolean;
  setDisplayClasses: React.Dispatch<SetStateAction<boolean>>;
  displayBackgrounds: boolean;
  setDisplayBackgrounds: React.Dispatch<SetStateAction<boolean>>;
  displayStats: boolean;
  setDisplayStats: React.Dispatch<SetStateAction<boolean>>;
  selectedRaceId: number;
  races: Races[];
  displaySkills: boolean;
  selectedClassId: number;
  setDisplaySkills: React.Dispatch<SetStateAction<boolean>>;
  selectedBackgroundId: number;
}) => {
  const pages = [
    { name: "Races", href: "#", current: displayRaces },
    { name: "Subrace", href: "#", current: displaySubRaces },
    { name: "Class", href: "#", current: displayClasses },
    { name: "Background", href: "#", current: displayBackgrounds },
    { name: "Stat Distribution", href: "#", current: displayStats },
    { name: "Skills", href: "#", current: displaySkills },
  ];

  const ClickNav = (page_name: string) => {
    setDisplayRaces(false);
    setDisplaySubRace(false);
    setDisplayClasses(false);
    setDisplayBackgrounds(false);
    setDisplayStats(false);
    setDisplaySkills(false);
    if (page_name === "Races") {
      setDisplayRaces(true);
    } else if (page_name === "Subrace") {
      setDisplaySubRace(true);
    } else if (page_name === "Class") {
      setDisplayClasses(true);
    } else if (page_name === "Background") {
      setDisplayBackgrounds(true);
    } else if (page_name === "Stat Distribution") {
      setDisplayStats(true);
    } else if (page_name === "Skills") {
      setDisplaySkills(true);
    }
  };
  return (
    <nav aria-label="Breadcrumb" className="flex pb-2">
      <ol
        role="list"
        className="flex space-x-4 rounded-md bg-white px-6 shadow"
      >
        {pages.map((page) => {
          if (page.name === "Subrace") {
            if (selectedRaceId !== 0) {
              if (races[selectedRaceId - 1]["subraces"] === null) {
                return null;
              } else {
                return <CreateNavComp page={page} ClickNav={ClickNav} />;
              }
            } else {
              return null;
            }
          } else if (page.name === "Skills") {
            if (
              selectedClassId !== 0 &&
              selectedBackgroundId !== 0 &&
              selectedRaceId !== 0
            ) {
              return <CreateNavComp page={page} ClickNav={ClickNav} />;
            } else {
              return null;
            }
          } else {
            return <CreateNavComp page={page} ClickNav={ClickNav} />;
          }
        })}
      </ol>
    </nav>
  );
};

export default CreateNav;
