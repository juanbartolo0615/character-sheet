from sqlalchemy.orm import relationship, DeclarativeBase, MappedAsDataclass, Mapped, mapped_column
from sqlalchemy import String

class Base(MappedAsDataclass, DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    username: Mapped[str] = mapped_column(String(20))
    hashed_password: Mapped[str]
