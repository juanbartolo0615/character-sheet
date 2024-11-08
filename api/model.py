from sqlalchemy.orm import relationship, DeclarativeBase, MappedAsDataclass, Mapped, mapped_column
from sqlalchemy import String, ForeignKey

class Base(MappedAsDataclass, DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    username: Mapped[str] = mapped_column(String(20))
    hashed_password: Mapped[str]


class Races(Base):
    __tablename__ = "races"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    name: Mapped[str]
    description: Mapped[str]

class RacialTraits(Base):
    __tablename__ = "racialTraits"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    race_id: Mapped[int] = mapped_column(ForeignKey("races.id"))
    trait: Mapped[str]
    description: Mapped[str]

class Subraces(Base):
    __tablename__ = "subraces"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    race_id: Mapped[int] = mapped_column(ForeignKey("races.id"))
    name: Mapped[str]

class SubracesTraits(Base):
    __tablename__ = "subracesTraits"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    subrace_id: Mapped[int] = mapped_column(ForeignKey("subraces.id"))
    trait: Mapped[str]
    description: Mapped[str]

class Classes(Base):
    __tablename__ = "classes"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    name: Mapped[str]
    description: Mapped[str]

class Subclass(Base):
    __tablename__ = "subclass"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    class_id: Mapped[int] = mapped_column(ForeignKey("classes.id"))
    subclass_name: Mapped[str]
    description: Mapped[str]

class ClassFeature(Base):
    __tablename__ = "classFeature"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    class_id: Mapped[int] = mapped_column(ForeignKey("classes.id"))
    level: Mapped[int]
    feature: Mapped[str]
    description: Mapped[str]

class SubclassFeature(Base):
    __tablename__ = "subclassFeature"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    class_id: Mapped[int] = mapped_column(ForeignKey("classes.id"))
    subclass_id: Mapped[int] = mapped_column(ForeignKey("subclass.id"))
    level: Mapped[int]
    feature: Mapped[str]
    description: Mapped[str]

class Character(Base):
    __tablename__ = "characters"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    race_id: Mapped[int] = mapped_column(ForeignKey("races.id"))
    subrace_id: Mapped[int] = mapped_column(ForeignKey("subraces.id"), nullable=True)
    class_id: Mapped[int] = mapped_column(ForeignKey("classes.id"))
    level: Mapped[int]
    name: Mapped[str]
    background: Mapped[int] = mapped_column(ForeignKey("background.id"))
    strength: Mapped[int]
    dexterity: Mapped[int]
    constitution: Mapped[int]
    intelligence: Mapped[int]
    wisdom: Mapped[int]
    charisma: Mapped[int]
    hitpoints: Mapped[int]
    feet: Mapped[int]


class SavingThrowsProficiencies(Base):
    __tablename__ = "savingthrows"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    character_id: Mapped[int] = mapped_column(ForeignKey("characters.id"))
    strenght: Mapped[bool] = mapped_column(default=False)
    dexterity: Mapped[bool] = mapped_column(default=False)
    constitution: Mapped[bool] = mapped_column(default=False)
    intelligence: Mapped[bool] = mapped_column(default=False)
    wisdom: Mapped[bool] = mapped_column(default=False)
    charisma: Mapped[bool] = mapped_column(default=False)


class SkillsProficiencies(Base):
    __tablename__ = "skills"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    character_id: Mapped[int] = mapped_column(ForeignKey("characters.id"))
    acrobatics: Mapped[bool] = mapped_column(default=False)
    animal_handling: Mapped[bool] = mapped_column(default=False)
    arcana: Mapped[bool] = mapped_column(default=False)
    athletics: Mapped[bool] = mapped_column(default=False)
    deception: Mapped[bool] = mapped_column(default=False)
    history: Mapped[bool] = mapped_column(default=False)
    insight: Mapped[bool] = mapped_column(default=False)
    intimidation: Mapped[bool] = mapped_column(default=False)
    investigation: Mapped[bool] = mapped_column(default=False)
    medicine: Mapped[bool] = mapped_column(default=False)
    nature: Mapped[bool] = mapped_column(default=False)
    perception: Mapped[bool] = mapped_column(default=False)
    performance: Mapped[bool] = mapped_column(default=False)
    persuasion: Mapped[bool] = mapped_column(default=False)
    religion: Mapped[bool] = mapped_column(default=False)
    sleight_of_hand: Mapped[bool] = mapped_column(default=False)
    stealth: Mapped[bool] = mapped_column(default=False)
    survival: Mapped[bool] = mapped_column(default=False)

class LanguageProficiencies(Base):
    __tablename__ = "languages"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    character_id: Mapped[int] = mapped_column(ForeignKey("characters.id"))
    common: Mapped[bool] = mapped_column(default=False)
    dwarvish: Mapped[bool] = mapped_column(default=False)
    elvish: Mapped[bool] = mapped_column(default=False)
    giant: Mapped[bool] = mapped_column(default=False)
    gnomish: Mapped[bool] = mapped_column(default=False)
    goblin: Mapped[bool] = mapped_column(default=False)
    halfling: Mapped[bool] = mapped_column(default=False)
    orc: Mapped[bool] = mapped_column(default=False)
    abyssal: Mapped[bool] = mapped_column(default=False)
    celestial: Mapped[bool] = mapped_column(default=False)
    deep_speech: Mapped[bool] = mapped_column(default=False)
    draconic: Mapped[bool] = mapped_column(default=False)
    infernal: Mapped[bool] = mapped_column(default=False)
    primordial: Mapped[bool] = mapped_column(default=False)
    sylvan: Mapped[bool] = mapped_column(default=False)
    undercommon: Mapped[bool] = mapped_column(default=False)

class ArmourProficiencies(Base):
    __tablename__ = "armorProficiencies"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    character_id: Mapped[int] = mapped_column(ForeignKey("characters.id"))
    light: Mapped[bool] = mapped_column(default=False)
    medium: Mapped[bool] = mapped_column(default=False)
    heavy: Mapped[bool] = mapped_column(default=False)
    shield: Mapped[bool] = mapped_column(default=False)

class Background(Base):
    __tablename__ = "background"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    name: Mapped[str]
    description: Mapped[str]
    feature: Mapped[str]
    feature_description: Mapped[str]
    proficiencies: Mapped[str]
    languages: Mapped[int]

class ArtisanTools(Base):
    __tablename__ = "artisanTools"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    name: Mapped[str]
    description: Mapped[str]
    use: Mapped[str]
