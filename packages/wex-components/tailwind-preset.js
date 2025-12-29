/**
 * @wex/components Tailwind CSS Preset
 *
 * This preset provides the component-specific Tailwind configuration
 * for WEX components. It defines custom utilities that map to CSS variables.
 *
 * IMPORTANT: You should also include the @wex/design-tokens preset
 * to get the full theme configuration (colors, typography, etc.).
 *
 * @example
 * // tailwind.config.ts
 * import wexComponentsPreset from '@wex/components/tailwind-preset';
 * import wexDesignTokensPreset from '@wex/design-tokens/tailwind-preset';
 *
 * export default {
 *   presets: [wexDesignTokensPreset, wexComponentsPreset],
 *   content: [
 *     './src/**\/*.{js,ts,jsx,tsx}',
 *     './node_modules/@wex/components/dist/**\/*.js',
 *   ],
 * };
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      // Component-specific colors that reference CSS variables
      colors: {
        // Button colors (Layer 3 component tokens)
        'wex-button-primary-bg': 'var(--wex-component-button-primary-bg)',
        'wex-button-primary-fg': 'var(--wex-component-button-primary-fg)',
        'wex-button-primary-border': 'var(--wex-component-button-primary-border)',
        'wex-button-primary-hover-bg': 'var(--wex-component-button-primary-hover-bg)',
        'wex-button-primary-active-bg': 'var(--wex-component-button-primary-active-bg)',
        'wex-button-primary-disabled-bg': 'var(--wex-component-button-primary-disabled-bg)',
        'wex-button-primary-disabled-fg': 'var(--wex-component-button-primary-disabled-fg)',

        'wex-button-secondary-bg': 'var(--wex-component-button-secondary-bg)',
        'wex-button-secondary-fg': 'var(--wex-component-button-secondary-fg)',
        'wex-button-secondary-border': 'var(--wex-component-button-secondary-border)',
        'wex-button-secondary-hover-bg': 'var(--wex-component-button-secondary-hover-bg)',
        'wex-button-secondary-active-bg': 'var(--wex-component-button-secondary-active-bg)',
        'wex-button-secondary-disabled-bg': 'var(--wex-component-button-secondary-disabled-bg)',
        'wex-button-secondary-disabled-fg': 'var(--wex-component-button-secondary-disabled-fg)',

        'wex-button-destructive-bg': 'var(--wex-component-button-destructive-bg)',
        'wex-button-destructive-fg': 'var(--wex-component-button-destructive-fg)',
        'wex-button-destructive-border': 'var(--wex-component-button-destructive-border)',
        'wex-button-destructive-hover-bg': 'var(--wex-component-button-destructive-hover-bg)',
        'wex-button-destructive-active-bg': 'var(--wex-component-button-destructive-active-bg)',
        'wex-button-destructive-disabled-bg': 'var(--wex-component-button-destructive-disabled-bg)',
        'wex-button-destructive-disabled-fg': 'var(--wex-component-button-destructive-disabled-fg)',

        'wex-button-success-bg': 'var(--wex-component-button-success-bg)',
        'wex-button-success-fg': 'var(--wex-component-button-success-fg)',
        'wex-button-success-border': 'var(--wex-component-button-success-border)',
        'wex-button-success-hover-bg': 'var(--wex-component-button-success-hover-bg)',
        'wex-button-success-active-bg': 'var(--wex-component-button-success-active-bg)',
        'wex-button-success-disabled-bg': 'var(--wex-component-button-success-disabled-bg)',
        'wex-button-success-disabled-fg': 'var(--wex-component-button-success-disabled-fg)',

        'wex-button-info-bg': 'var(--wex-component-button-info-bg)',
        'wex-button-info-fg': 'var(--wex-component-button-info-fg)',
        'wex-button-info-border': 'var(--wex-component-button-info-border)',
        'wex-button-info-hover-bg': 'var(--wex-component-button-info-hover-bg)',
        'wex-button-info-active-bg': 'var(--wex-component-button-info-active-bg)',
        'wex-button-info-disabled-bg': 'var(--wex-component-button-info-disabled-bg)',
        'wex-button-info-disabled-fg': 'var(--wex-component-button-info-disabled-fg)',

        'wex-button-warning-bg': 'var(--wex-component-button-warning-bg)',
        'wex-button-warning-fg': 'var(--wex-component-button-warning-fg)',
        'wex-button-warning-border': 'var(--wex-component-button-warning-border)',
        'wex-button-warning-hover-bg': 'var(--wex-component-button-warning-hover-bg)',
        'wex-button-warning-active-bg': 'var(--wex-component-button-warning-active-bg)',
        'wex-button-warning-disabled-bg': 'var(--wex-component-button-warning-disabled-bg)',
        'wex-button-warning-disabled-fg': 'var(--wex-component-button-warning-disabled-fg)',

        'wex-button-help-bg': 'var(--wex-component-button-help-bg)',
        'wex-button-help-fg': 'var(--wex-component-button-help-fg)',
        'wex-button-help-border': 'var(--wex-component-button-help-border)',
        'wex-button-help-hover-bg': 'var(--wex-component-button-help-hover-bg)',
        'wex-button-help-active-bg': 'var(--wex-component-button-help-active-bg)',
        'wex-button-help-disabled-bg': 'var(--wex-component-button-help-disabled-bg)',
        'wex-button-help-disabled-fg': 'var(--wex-component-button-help-disabled-fg)',

        'wex-button-contrast-bg': 'var(--wex-component-button-contrast-bg)',
        'wex-button-contrast-fg': 'var(--wex-component-button-contrast-fg)',
        'wex-button-contrast-border': 'var(--wex-component-button-contrast-border)',
        'wex-button-contrast-hover-bg': 'var(--wex-component-button-contrast-hover-bg)',
        'wex-button-contrast-active-bg': 'var(--wex-component-button-contrast-active-bg)',
        'wex-button-contrast-disabled-bg': 'var(--wex-component-button-contrast-disabled-bg)',
        'wex-button-contrast-disabled-fg': 'var(--wex-component-button-contrast-disabled-fg)',

        'wex-button-tertiary-fg': 'var(--wex-component-button-tertiary-fg)',
        'wex-button-tertiary-hover-bg': 'var(--wex-component-button-tertiary-hover-bg)',
        'wex-button-tertiary-active-bg': 'var(--wex-component-button-tertiary-active-bg)',
        'wex-button-tertiary-disabled-fg': 'var(--wex-component-button-tertiary-disabled-fg)',

        'wex-button-link-fg': 'var(--wex-component-button-link-fg)',
        'wex-button-link-hover-fg': 'var(--wex-component-button-link-hover-fg)',
        'wex-button-link-active-fg': 'var(--wex-component-button-link-active-fg)',
        'wex-button-link-disabled-fg': 'var(--wex-component-button-link-disabled-fg)',

        // Float label tokens
        'wex-floatlabel-label-fg': 'var(--wex-component-floatlabel-label-fg)',
        'wex-floatlabel-label-focus-fg': 'var(--wex-component-floatlabel-label-focus-fg)',
        'wex-floatlabel-label-filled-fg': 'var(--wex-component-floatlabel-label-filled-fg)',
      },
      // Minimum touch target sizes for WCAG 2.5.5
      minHeight: {
        target: '44px',
      },
      minWidth: {
        target: '44px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};

