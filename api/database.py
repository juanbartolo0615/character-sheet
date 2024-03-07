from sqlalchemy import create_engine
import os
from sqlalchemy.orm import sessionmaker

engine = create_engine(os.environ["DATABASE_URL"], echo=True)

SessionLocal = sessionmaker(engine)
