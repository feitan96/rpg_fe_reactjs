import type React from 'react';
import UserTable from './components/UserTable';
import useUser from './hooks/useUser';
import { useState } from 'react';
import type { User } from './types/User';
import { userService } from './services/userService';
import UserForm from './components/UserForm';

const UserManagement: React.FC = () => {
    const { users, loading, error, refreshUsers } = useUser();
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleCreate = async (userData: Omit<User, 'id' | 'is_deleted'>) => {
        try {
            await userService.createUser(userData as User);
            await refreshUsers();
            setIsFormVisible(false);
        } catch (err) {
            console.error('Failed to create user:', err);
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsFormVisible(true);
    };    const handleUpdate = async (userData: Omit<User, 'id' | 'is_deleted'>) => {
        if (editingUser) {
            try {
                await userService.updateUser(editingUser.id, { ...userData, id: editingUser.id } as User);
                await refreshUsers();
                setEditingUser(null);
                setIsFormVisible(false);
            } catch (err) {
                console.error('Failed to update user:', err);
            }
        }
    }

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await userService.softDeleteUser(id);
                await refreshUsers();
            } catch (err) {
                console.error('Failed to delete user:', err);
            }
        }
    }



    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">User Management</h1>
                <button
                    onClick={() => {
                        setEditingUser(null);
                        setIsFormVisible(!isFormVisible);
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    {isFormVisible ? 'Cancel' : 'Add New User'}
                </button>
            </div>

            {isFormVisible && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingUser ? 'Edit User' : 'Create New User'}
                    </h2>
                    <UserForm
                        onSubmit={editingUser ? handleUpdate : handleCreate}
                        initialData={editingUser || undefined}
                        isEditing={!!editingUser}
                    />
                </div>
            )}

            <UserTable 
                users={users} 
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default UserManagement;