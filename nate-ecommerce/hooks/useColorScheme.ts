import { useColorScheme as _useColorScheme } from 'react-native';

export default function useColorScheme() {
  return _useColorScheme();   // 直接返回 'light' | 'dark' | null
}