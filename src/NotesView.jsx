import React, { useEffect, useRef, useState } from "react";
import "./NotesView.css";
import { getInitials, formatDateTime } from "./utils.js";
import image from "./assets/image1.png";

const NotesView = ({ selectedGroup, notes, onAddNote, onBack }) => {
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
                    <footer className="welcome-footer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="arcs"
                            className="lock-icon"
                        >
                            <rect
                                x="3"
                                y="11"
                                width="18"
                                height="11"
                                rx="2"
                                ry="2"
                            ></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span>end-to-end encrypted</span>
                    </footer>
                </div>
            </div>
        );
    }

    return (
        <div className="notes-view-wrapper">
            {/* The mobile header is now part of this component */}
            <header className="notes-header">
                {/* The 'onBack' prop controls if the back arrow shows */}
                {onBack && (
                    <button onClick={onBack} className="back-button">
                        &larr;
                    </button>
                )}
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
                        <p className="note-timestamp">
                            {formatDateTime(note.createdAt)}
                        </p>
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
