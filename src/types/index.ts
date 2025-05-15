
export type VerdictType = 'trusted' | 'unclear' | 'misleading' | null;

export interface VerdictData {
  type: VerdictType;
  explanation: string;
  sources: Array<{
    title: string;
    url: string;
  }>;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  isLargeText: boolean;
  toggleDarkMode: () => void;
  toggleLargeText: () => void;
}
