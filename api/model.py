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
    __tablename__ = "feature"

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
    level: Mapped[int]
    name: Mapped[str]
