import React, { useEffect, useRef, useState } from 'react';
import './NotesView.css';
import { getInitials } from './utils.js';

const NotesView = ({ selectedGroup, notes, onAddNote }) => {
    const [newNote, setNewNote] = useState('');
    const notesEndRef = useRef(null);

    useEffect(() => {
        notesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [notes]);

    const handleAddNote = () => {
        if (newNote.trim()) {
            onAddNote(newNote);
            setNewNote('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAddNote();
        }
    };

    if (!selectedGroup) {
        return (
            <div className="notes-view-wrapper">
                <div className="welcome-view">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-1-5h.01"></path></svg>
                    <h2>Pocket Notes</h2>
                    <p>Select a group to view notes, or create a new group to start your journey.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="notes-view-wrapper">
            <header className="notes-header">
                <div className="group-icon" style={{ backgroundColor: selectedGroup.color }}>{getInitials(selectedGroup.name)}</div>
                <h2>{selectedGroup.name}</h2>
            </header>
            <main className="notes-body">
                {notes.map(note => (
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
                    <button onClick={handleAddNote} disabled={!newNote.trim()} className="send-button" aria-label="Send note">
                        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default NotesView;