import {
  ImageResolvedAssetSource,
  ImageSourcePropType,
  Platform,
  requireNativeComponent,
  UIManager,
  ViewStyle,
} from 'react-native'
import type { Point } from './ScratchGrid'

const LINKING_ERROR =
  `The package 'rn-scratch-card' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n'

export type ScratchCardProps = {
  source: ImageSourcePropType
  brushWidth: number
  onScratch?: (scratchPercentage: number) => void
  style?: ViewStyle
  showDebugLogs?: boolean
}

export interface UserInput {
  nativeEvent: Point
}

interface NativeViewProps {
  image: ImageResolvedAssetSource
  brushWidth: number
  onScratch?: (event: UserInput) => void
  style?: ViewStyle
}

const ComponentName = 'RnScratchCardView'

export const RnScratchCard =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<NativeViewProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR)
      }
