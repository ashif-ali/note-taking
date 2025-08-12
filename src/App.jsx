import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./Sidebar.jsx";
import NotesView from "./NotesView.jsx";
import CreateGroupPopup from "./CreateGroupPopup.jsx";

export default function App() {
    // (useState and useEffect hooks for data remain the same)
    const [groups, setGroups] = useState(() => {
        try {
            const savedGroups = localStorage.getItem("notesAppGroups");
            return savedGroups ? JSON.parse(savedGroups) : [];
        } catch (error) {
            console.error("Failed to parse groups from localStorage", error);
            return [];
        }
    });

    const [notes, setNotes] = useState(() => {
        try {
            const savedNotes = localStorage.getItem("notesAppNotes");
            return savedNotes ? JSON.parse(savedNotes) : [];
        } catch (error) {
            console.error("Failed to parse notes from localStorage", error);
            return [];
        }
    });

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // NEW state to manage mobile view
    const [isNotesViewVisible, setIsNotesViewVisible] = useState(false);

    useEffect(() => {
        localStorage.setItem("notesAppGroups", JSON.stringify(groups));
    }, [groups]);

    useEffect(() => {
        localStorage.setItem("notesAppNotes", JSON.stringify(notes));
    }, [notes]);

    const handleGroupCreate = (groupData) => {
        const newGroup = { ...groupData, id: crypto.randomUUID() };
        setGroups([...groups, newGroup]);
    };

    const handleAddNote = (noteText) => {
        if (!selectedGroup) return;
        const newNote = {
            id: crypto.randomUUID(),
            text: noteText,
            groupId: selectedGroup.id,
            createdAt: new Date().toISOString(),
        };
        setNotes([...notes, newNote]);
    };

    // UPDATED to handle mobile view
    const handleGroupSelect = (group) => {
        setSelectedGroup(group);
        setIsNotesViewVisible(true); // Show notes view on mobile
    };

    // NEW function to go back to the group list on mobile
    const handleBackToGroups = () => {
        setIsNotesViewVisible(false);
    };

    const filteredNotes = notes
        .filter((note) => note.groupId === selectedGroup?.id)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return (
        <div className="app-wrapper">
            {showPopup && (
                <CreateGroupPopup
                    onClose={() => setShowPopup(false)}
                    onGroupCreate={handleGroupCreate}
                    existingGroupNames={groups.map((g) => g.name)}
                />
            )}

            {/* --- Mobile Layout --- */}
            <div className="mobile-layout">
                {!isNotesViewVisible ? (
                    <Sidebar
                        groups={groups}
                        onGroupSelect={handleGroupSelect}
                        selectedGroup={selectedGroup}
                        onCreateGroupClick={() => setShowPopup(true)}
                    />
                ) : (
                    <NotesView
                        selectedGroup={selectedGroup}
                        notes={filteredNotes}
                        onAddNote={handleAddNote}
                        onBack={handleBackToGroups} // Pass the back handler
                    />
                )}
            </div>

            {/* --- Desktop Layout --- */}
            <div className="desktop-layout">
                <Sidebar
                    groups={groups}
                    onGroupSelect={handleGroupSelect}
                    selectedGroup={selectedGroup}
                    onCreateGroupClick={() => setShowPopup(true)}
                />
                <NotesView
                    selectedGroup={selectedGroup}
                    notes={filteredNotes}
                    onAddNote={handleAddNote}
                />
            </div>
        </div>
    );
}
