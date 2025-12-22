import {
  DatePicker,
  DatePickerWithInput,
} from "@/components/ui/date-picker";
import type {
  DatePickerProps,
  DatePickerWithInputProps,
} from "@/components/ui/date-picker";

/**
 * WexDatePicker - WEX Design System Date Picker Component
 *
 * Date selection input combining Calendar with Popover.
 * Supports single date selection with button trigger or input field.
 *
 * @example
 * <WexDatePicker
 *   date={date}
 *   onDateChange={setDate}
 *   placeholder="Pick a date"
 * />
 *
 * // With input field
 * <WexDatePicker.WithInput
 *   date={date}
 *   onDateChange={setDate}
 *   placeholder="Enter or pick a date"
 * />
 */

export const WexDatePicker = Object.assign(DatePicker, {
  WithInput: DatePickerWithInput,
});

export type { DatePickerProps, DatePickerWithInputProps };

