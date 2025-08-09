import { useState, useRef } from 'react';
import { useClickOutside } from './hooks.js';
import './CreateGroupPopup.css';

const CreateGroupPopup = ({ onClose, onGroupCreate, existingGroupNames }) => {

    const [groupName, setGroupName] = useState('');
    const [groupColor, setGroupColor] = useState('#B38BFA');
    const [error, setError] = useState('');
    const popupRef = useRef(null);

    useClickOutside(popupRef, onClose);

    const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

    const handleSubmit = () => {
        if (!groupName.trim()) {
            setError('Group name cannot be empty.');
            return;
        }
        if (existingGroupNames.includes(groupName.trim())) {
            setError('Group name already exists.');
            return;
        }
        onGroupCreate({ name: groupName.trim(), color: groupColor });
        setGroupName('');
        setError('');
        onClose();
    };

    return (
        <div className="popup-overlay">
            <div ref={popupRef} className="popup-container">
                <h2 className="popup-title">Create New Group</h2>
                <div className="form-group">
                    <label className="form-label">Group Name</label>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => { setGroupName(e.target.value); setError(''); }}
                        placeholder="Enter group name"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Choose colour</label>
                    <div className="color-palette">
                        {colors.map(color => (
                            <button
                                key={color}
                                className={`color-button ${groupColor === color ? 'selected' : ''}`}
                                style={{ backgroundColor: color }}
                                onClick={() => setGroupColor(color)}
                                aria-label={`Select color ${color}`}
                            />
                        ))}
                    </div>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button onClick={handleSubmit} className="create-button">Create</button>
            </div>
        </div>
    );
};

export default CreateGroupPopup;