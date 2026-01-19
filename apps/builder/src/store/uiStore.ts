import { signal } from "@preact/signals-react";
import type { TabType } from "./types";

export const activeTab = signal<TabType>("builder");

export const setActiveTab = (tab: TabType): void => {
  activeTab.value = tab;
};
