import React from 'react';
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { borders } from '@/ui/theme/borders';

type ModalProps = RNModalProps & {
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ onClose, children, ...props }: ModalProps) {
  return (
    <RNModal transparent animationType="fade" {...props}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.content} onPress={(e) => e.stopPropagation()}>
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  content: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.lg,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
  },
});
