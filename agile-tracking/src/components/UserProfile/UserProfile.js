import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import './UserProfile.css'; // Import CSS

const UserProfile = () => {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserRole, setNewUserRole] = useState('employee');
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/users');
                if (user?.role === 'admin') {
                    setUsers(response.data.filter(user => user?.role !== 'admin'));
                } else {
                    setSelectedUser(user);
                    fetchTasks(user?.id);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [user]);

    const fetchTasks = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/tasks?assignedTo=${userId}`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleGetHistory = (userId) => {
        setSelectedUser(users.find(user => user?.id === userId));
        fetchTasks(userId);
    };

    const handleAddUser = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:4000/users', {
                name: newUserName,
                email: newUserEmail,
                password: newUserPassword,
                role: newUserRole,
            });

            const updatedUsers = await axios.get('http://localhost:4000/users');
            setUsers(updatedUsers.data.filter(user => user?.role !== 'admin'));
            setShowForm(false);
            setNewUserName('');
            setNewUserEmail('');
            setNewUserPassword('');
            setNewUserRole('employee');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className='user'>
        <div className="profile-container">
            <h2>User Profiles</h2>

            {user?.role === 'admin' && (
                <div>
                    <button className="add-user-button" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancel' : 'Add New User'}
                    </button>

                    {showForm && (
                        <form onSubmit={handleAddUser} className="user-form">
                            <div>
                                <label>Name:</label>
                                <input type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} required />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input type="email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} required />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input type="password" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} required />
                            </div>
                            <div>
                                <label>Role:</label>
                                <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)} required>
                                    <option value="employee">Employee</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <button type="submit" className="green-button">Create User</button>
                        </form>
                    )}

                    <ul className="user-list">
                        {users.map(user => (
                            <li key={user?.id}>
                                <strong>Name:</strong> {user?.name} <br />
                                <strong>Email:</strong> {user?.email} <br />
                                <button className="green-button btn btn-success" onClick={() => handleGetHistory(user?.id)}>Get History</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {user?.role !== 'admin' && (
                <div>
                    <h3>Tasks Worked By {user?.name}</h3>
                    <ul className="task-list">
                        {tasks.map(task => (
                            <li key={task.id} className={`task-item ${task.status.replace(/\s+/g, '-').toLowerCase()}`}>
                                <strong>Title:</strong> {task.title} <br />
                                <strong>Description:</strong> {task.description} <br />
                                <strong>Status:</strong> <span className="status-text">{task.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedUser && user?.role === 'admin' && (
                <div>
                    <h3>Tasks Worked By {selectedUser.name}</h3>
                    <ul className="task-list">
                        {tasks.map(task => (
                            <li key={task.id} className={`task-item ${task.status.replace(/\s+/g, '-').toLowerCase()}`}>
                                <strong>Title:</strong> {task.title} <br />
                                <strong>Description:</strong> {task.description} <br />
                                <strong>Status:</strong> <span className="status-text">{task.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        </div>
    );
};

export default UserProfile;
