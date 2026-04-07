import { Redirect, Slot } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';

export default function AuthLayout() {
  const { user, loading } = useAuth();

  // Don't redirect while loading
  if (loading) {
    return null;
  }

  // If user is authenticated, redirect to app
  if (user) {
    return <Redirect href="/(app)" />;
  }

  return <Slot />;
} 