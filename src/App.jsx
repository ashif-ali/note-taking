import { useState, useEffect } from 'react';
import './App.css'
import NotesView from './NotesView.jsx';
import CreateGroupPopup from './CreateGroupPopup.jsx';
import Sidebar from './Sidebar.jsx';


export default function App() {
    const [groups, setGroups] = useState([]);
    const [notes, setNotes] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // Load state from localStorage on initial render
    useEffect(() => {
        try {
            const savedGroups = localStorage.getItem('notesAppGroups');
            const savedNotes = localStorage.getItem('notesAppNotes');
            if (savedGroups) {
                setGroups(JSON.parse(savedGroups));
            }
            if (savedNotes) {
                setNotes(JSON.parse(savedNotes));
            }
        } catch (error) {
            console.error("Failed to parse from localStorage", error);
            setGroups([]);
            setNotes([]);
        }
    }, []);

    // Save groups to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('notesAppGroups', JSON.stringify(groups));
        } catch (error) {
            console.error("Failed to save groups to localStorage", error);
        }
    }, [groups]);
    
    // Save notes to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('notesAppNotes', JSON.stringify(notes));
        } catch (error) {
            console.error("Failed to save notes to localStorage", error);
        }
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
            createdAt: new Date().toISOString()
        };
        setNotes([...notes, newNote]);
    };

    const handleGroupSelect = (group) => {
        setSelectedGroup(group);
    };

    const filteredNotes = notes
        .filter(note => note.groupId === selectedGroup?.id)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return (
        <div className="app-wrapper">
            {showPopup && (
                <CreateGroupPopup
                    onClose={() => setShowPopup(false)}
                    onGroupCreate={handleGroupCreate}
                    existingGroupNames={groups.map(g => g.name)}
                />
            )}
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
    );
}