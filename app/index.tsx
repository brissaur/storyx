import { Redirect } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useOnboardingComplete } from '@/domain/onboarding';
import { ROUTES } from '@/technical/navigation';

export default function Index() {
  const { isComplete } = useOnboardingComplete();

  if (isComplete === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#7C5CFC" size="large" />
      </View>
    );
  }

  if (isComplete) {
    return <Redirect href={ROUTES.STORIES as any} />;
  }

  return <Redirect href={ROUTES.ONBOARDING as any} />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0F1A',
  },
});
