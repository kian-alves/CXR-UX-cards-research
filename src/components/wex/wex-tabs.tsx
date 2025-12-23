import { Tabs, TabsList, TabsTrigger, TabsContent, ScrollableTabsList, ClosableTabsTrigger } from "@/components/ui/tabs";

/**
 * WexTabs - WEX Design System Tabs Component
 *
 * Tabbed content panels for organizing related content.
 * Uses namespace pattern: WexTabs.List, WexTabs.Trigger, WexTabs.Content
 *
 * @example
 * <WexTabs defaultValue="account">
 *   <WexTabs.List>
 *     <WexTabs.Trigger value="account">Account</WexTabs.Trigger>
 *     <WexTabs.Trigger value="password">Password</WexTabs.Trigger>
 *   </WexTabs.List>
 *   <WexTabs.Content value="account">Account content</WexTabs.Content>
 *   <WexTabs.Content value="password">Password content</WexTabs.Content>
 * </WexTabs>
 */

export const WexTabs = Object.assign(Tabs, {
  List: TabsList,
  ScrollableList: ScrollableTabsList,
  Trigger: TabsTrigger,
  ClosableTrigger: ClosableTabsTrigger,
  Content: TabsContent,
});

