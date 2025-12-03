/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintLight = '#0a7ea4';
const tintDark = '#fff';

export default  {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintDark,
  },
};
