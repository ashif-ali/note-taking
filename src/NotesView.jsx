import React, { useEffect, useRef, useState } from "react";
import "./NotesView.css";
import { getInitials } from "./utils.js";
import image from "./assets/image1.png";

const NotesView = ({ selectedGroup, notes, onAddNote }) => {
    const [newNote, setNewNote] = useState("");
    const notesEndRef = useRef(null);

    useEffect(() => {
        notesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [notes]);

    const handleAddNote = () => {
        if (newNote.trim()) {
            onAddNote(newNote);
            setNewNote("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAddNote();
        }
    };

    if (!selectedGroup) {
        return (
            <div className="notes-view-wrapper">
                <div className="welcome-view">
                    <img
                        src={image}
                        alt="People collaborating on a large notepad"
                        className="welcome-image"
                    />
                    <h2>Pocket Notes</h2>
                    <p>
                        Send and receive messages without keeping your phone
                        online. Use Pocket Notes on up to 4 linked devices and 1
                        mobile phone
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="notes-view-wrapper">
            <header className="notes-header">
                <div
                    className="group-icon"
                    style={{ backgroundColor: selectedGroup.color }}
                >
                    {getInitials(selectedGroup.name)}
                </div>
                <h2>{selectedGroup.name}</h2>
            </header>
            <main className="notes-body">
                {notes.map((note) => (
                    <div key={note.id} className="note-card">
                        <p>{note.text}</p>
                        <p>{new Date(note.createdAt).toLocaleString()}</p>
                    </div>
                ))}
                <div ref={notesEndRef} />
            </main>
            <footer className="notes-footer">
                <div className="note-input-wrapper">
                    <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter your note here..."
                        className="note-textarea"
                    />
                    <button
                        onClick={handleAddNote}
                        disabled={!newNote.trim()}
                        className="send-button"
                        aria-label="Send note"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default NotesView;
