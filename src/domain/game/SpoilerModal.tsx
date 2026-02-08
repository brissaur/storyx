import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Typography, Button, Spacer } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';

type SpoilerModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function SpoilerModal({
  visible,
  onConfirm,
  onCancel,
}: SpoilerModalProps) {
  return (
    <Modal visible={visible} onClose={onCancel}>
      <Typography variant="h3" align="center">
        Reveal Solution?
      </Typography>
      <Spacer size="md" />
      <Typography variant="body" align="center" color={colors.textSecondary}>
        Make sure all players are ready. The solution will be visible once you
        confirm.
      </Typography>
      <Spacer size="lg" />
      <View style={styles.buttons}>
        <Button
          title="Cancel"
          variant="secondary"
          onPress={onCancel}
          style={styles.button}
        />
        <Button
          title="Reveal"
          variant="primary"
          onPress={onConfirm}
          style={styles.button}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});
