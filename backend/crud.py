from sqlalchemy.orm import Session

from models import Note
from schemas import NoteCreate, NoteUpdate


def get_notes(db: Session) -> list[Note]:
	# Read all notes newest first.
	return db.query(Note).order_by(Note.id.desc()).all()


def create_note(db: Session, note: NoteCreate) -> Note:
	# Make a new note row and save it.
	db_note = Note(title=note.title, content=note.content, tags=note.tags)
	db.add(db_note)
	db.commit()
	db.refresh(db_note)
	return db_note


def update_note(db: Session, note_id: int, note: NoteUpdate) -> Note | None:
	# Find the note first so we can update it safely.
	db_note = db.query(Note).filter(Note.id == note_id).first()
	if db_note is None:
		return None

	db_note.title = note.title
	db_note.content = note.content
	db_note.tags = note.tags
	db.commit()
	db.refresh(db_note)
	return db_note


def delete_note(db: Session, note_id: int) -> bool:
	# Find the note first so we can delete it safely.
	db_note = db.query(Note).filter(Note.id == note_id).first()
	if db_note is None:
		return False

	db.delete(db_note)
	db.commit()
	return True

