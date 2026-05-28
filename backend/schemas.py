from pydantic import BaseModel, Field


class NoteBase(BaseModel):
    title: str
    content: str
    tags: list[str] = Field(default_factory=list)


class NoteCreate(NoteBase):
	pass


class NoteUpdate(NoteBase):
	pass


class NoteOut(NoteBase):
	id: int

