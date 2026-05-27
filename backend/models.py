from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.types import JSON

from database import Base


class Note(Base):
	__tablename__ = "notes"

	id = Column(Integer, primary_key=True, index=True)
	title = Column(String, nullable=False)
	content = Column(Text, nullable=False)
	tags = Column(JSON, nullable=False, default=list)

