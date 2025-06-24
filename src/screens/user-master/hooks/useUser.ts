import { useState, useEffect } from 'react';
import type { User } from '../types/User';
import { userService } from '../services/userService';

export const useUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //fetch all active (non-soft-deleted) users from the userService
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getAllActiveUsers();
            setUsers(Array.isArray(data) ? data : []);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch users');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }

    //creates a new user
    const createUser = async (user: Omit<User, 'id' | 'is_deleted'>) => {
        try {
            setLoading(true);
            await userService.createUser(user as User);
            await fetchUsers();
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create user');
        } finally {
            setLoading(false);
        }
    }

    //updates an existing user
    const updateUser = async (id: string, user: Partial<User>) => {
        try {
            setLoading(true);
            await userService.updateUser(id, user as User);
            await fetchUsers();
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update user');
        } finally {
            setLoading(false);
        }
    }

    //soft deletes a user
    const softDeleteUser = async (id: string) => {
        try {
            setLoading(true);
            await userService.softDeleteUser(id);
            await fetchUsers();
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to soft delete user');
        } finally {
            setLoading(false);
        }
    }

    //hard deletes a user
    const hardDeleteUser = async (id: string) => {
        try {
            setLoading(true);
            await userService.hardDeleteUser(id);
            await fetchUsers();
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to hard delete user');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return {
        users,
        loading,
        error,
        refreshUsers: fetchUsers,
        createUser,
        updateUser,
        softDeleteUser,
        hardDeleteUser
    }
}

export default useUser;