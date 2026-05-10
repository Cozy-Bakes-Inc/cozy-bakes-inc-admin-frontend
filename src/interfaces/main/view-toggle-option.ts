import { ViewMode } from "@/types";
import { ReactNode } from "react";

export interface ViewToggleOption {
  value: ViewMode;
  label: string;
  icon: ReactNode;
}

export interface SearchToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (value: ViewMode) => void;
}
