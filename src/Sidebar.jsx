import './Sidebar.css'; 
import { getInitials } from './utils.js';

const Sidebar = ({ groups, onGroupSelect, selectedGroup, onCreateGroupClick }) => {
    return (
        <div className="sidebar-container">
            <div className="sidebar-header"><h1>Pocket Notes</h1></div>
            <div className="group-list">
                {groups.map(group => (
                    <div key={group.id} onClick={() => onGroupSelect(group)} className={`group-item ${selectedGroup?.id === group.id ? 'selected' : ''}`}>
                        <div className="group-icon" style={{ backgroundColor: group.color }}>{getInitials(group.name)}</div>
                        <span className="group-name">{group.name}</span>
                    </div>
                ))}
            </div>
            <div className="sidebar-footer">
                <button onClick={onCreateGroupClick} className="create-button create-group-button">
                    <span>+</span>
                    <span>Create New Group</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;