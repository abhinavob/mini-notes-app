"""Pydantic schemas for request and response data.

These classes describe the note data used by the API.
"""

from pydantic import BaseModel, Field


class NoteBase(BaseModel):
    title: str
    content: str
    tags: list[str] = Field(default_factory=list)


class NoteCreate(NoteBase):
	"""Data needed to create a note."""

	pass


class NoteOut(NoteBase):
	"""Data returned when a note is read from the API."""

	id: int

	model_config = {"from_attributes": True}

