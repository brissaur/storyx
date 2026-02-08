import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Typography, Spacer, Button } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';

type TutorialWelcomeProps = {
  onStart: () => void;
};

export function TutorialWelcome({ onStart }: TutorialWelcomeProps) {
  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.delay(100).duration(500)}>
        <Typography variant="h2" align="center">
          Welcome to Storyx
        </Typography>
        <Spacer size="sm" />
        <Typography variant="body" align="center" color={colors.textSecondary}>
          Let's solve a mystery together, cooperatively!
        </Typography>
      </Animated.View>

      <View style={styles.bottom}>
        <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.fullWidth}>
          <Button title="Let's go" onPress={onStart} style={styles.button} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xl,
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: spacing.lg,
  },
  fullWidth: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
});
