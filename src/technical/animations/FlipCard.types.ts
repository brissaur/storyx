import type { ViewStyle, StyleProp } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export type FlipCardProps = {
  children: React.ReactNode;
  /** If provided, the card is controlled externally */
  isFlipped?: boolean;
  /** Called when an uncontrolled card flips, or when a controlled card requests a flip */
  onFlipRequest?: () => void;
  /** Called after any flip with the new flipped state (uncontrolled only) */
  onFlip?: (flipped: boolean) => void;
  borderRadius?: number;
  containerStyle?: StyleProp<ViewStyle>;
  animationDuration?: number;
  enableHaptics?: boolean;
  scaleOnPress?: boolean;
};

export type FlipCardContextValue = {
  isFlipped: boolean;
  flip: () => void;
  borderRadius: number;
  animationDuration: number;
  rotation: SharedValue<number>;
  scale: SharedValue<number>;
  scaleEnabled: boolean;
};

export type FlipCardFrontProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export type FlipCardBackProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export type FlipCardTriggerProps = {
  children?: React.ReactNode;
  asChild?: boolean;
};
