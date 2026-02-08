import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';

type SafeScreenProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function SafeScreen({ children, style }: SafeScreenProps) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
});
