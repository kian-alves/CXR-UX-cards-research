import { Combobox } from "@/components/ui/combobox";
import type { ComboboxProps, ComboboxOption } from "@/components/ui/combobox";

/**
 * WexCombobox - WEX Design System Combobox Component
 *
 * Autocomplete input combining Command search with Popover dropdown.
 * Allows users to search and select from a list of options.
 *
 * @example
 * const options = [
 *   { value: "apple", label: "Apple" },
 *   { value: "banana", label: "Banana" },
 * ];
 *
 * <WexCombobox
 *   options={options}
 *   value={value}
 *   onValueChange={setValue}
 *   placeholder="Select a fruit..."
 * />
 */

export const WexCombobox = Combobox;
export type { ComboboxProps, ComboboxOption };

