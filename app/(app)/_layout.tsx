import { Redirect, Slot } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';

export default function AppLayout() {
  const { user, loading } = useAuth();

  // Don't redirect while loading
  if (loading) {
    return null;
  }

  // If user is not authenticated, redirect to auth
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
} 