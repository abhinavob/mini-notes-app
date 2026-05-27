"""FastAPI entry point for the mini notes app.

This file creates the app and exposes the note endpoints.
"""

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from crud import create_note, delete_note, get_notes
from database import Base, SessionLocal, engine
from schemas import NoteCreate, NoteOut

# Create the notes table if it does not exist yet.
Base.metadata.create_all(bind=engine)

def get_db():
	"""Create a database session for each request."""

	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()


app = FastAPI(title="Mini Notes App")

# Add CORS middleware
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],  # In production, specify the exact origins
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

@app.get("/notes", response_model=list[NoteOut])
def read_notes(db: Session = Depends(get_db)):
	# Read all notes from the database.
	return get_notes(db)


@app.post("/notes", response_model=NoteOut, status_code=201)
def add_note(note: NoteCreate, db: Session = Depends(get_db)):
	# Create a new note from the request body.
	return create_note(db, note)


@app.delete("/notes/{note_id}")
def remove_note(note_id: int, db: Session = Depends(get_db)):
	# Delete a note if it exists.
	deleted = delete_note(db, note_id)
	if not deleted:
		raise HTTPException(status_code=404, detail="Note not found")
	return {"message": "Note deleted successfully"}
