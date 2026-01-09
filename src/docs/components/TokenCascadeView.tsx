/**
 * TokenCascadeView Component
 *
 * Visualizes the 4-layer token architecture cascade:
 * Layer 1 (Palette) → Layer 2 (Semantic) → Layer 3 (Component) → Layer 4 (Tailwind) → Component
 *
 * Used in FilteredLivePreview to show token relationships.
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowDown, Layers } from "lucide-react";
import {
  ALL_TOKENS,
  COMPONENT_TOKENS,
  PALETTE_RAMPS,
  type TokenDefinition,
} from "@/docs/data/tokenRegistry";

// ============================================================================
// Types
// ============================================================================

interface CascadeLayer {
  layer: number;
  label: string;
  token: string;
  value?: string;
  color?: string;
}

interface TokenCascadeViewProps {
  /** The token name to show cascade for (can be any layer) */
  tokenName: string;
  /** Optional className */
  className?: string;
  /** Show compact version */
  compact?: boolean;
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Get the Layer 3 component tokens that reference a Layer 2 semantic token
 */
function getLayer3FromSemantic(semanticName: string): TokenDefinition[] {
  return COMPONENT_TOKENS.filter((t) => t.references === semanticName);
}

/**
 * Get Tailwind utilities for a component token
 */
function getTailwindForToken(token: TokenDefinition): string[] {
  return token.tailwindUtilities || [];
}

/**
 * Build the full cascade chain for any token
 */
function buildCascade(tokenName: string): CascadeLayer[] {
  const cascade: CascadeLayer[] = [];
  
  // Check if it's a Layer 3 component token
  if (tokenName.startsWith("--wex-component-")) {
    const componentToken = COMPONENT_TOKENS.find((t) => t.name === tokenName);
    if (componentToken) {
      // Find the Layer 2 semantic token it references
      const semanticRef = componentToken.references;
      if (semanticRef) {
        const semanticToken = ALL_TOKENS.find((t) => t.name === semanticRef);
        if (semanticToken) {
          // Find the Layer 1 palette it references
          const paletteRef = semanticToken.references;
          if (paletteRef) {
            cascade.push({
              layer: 1,
              label: "Palette",
              token: paletteRef,
              color: getPaletteColor(paletteRef),
            });
          }
          
          cascade.push({
            layer: 2,
            label: "Semantic",
            token: semanticRef,
            color: getPaletteColor(paletteRef || ""),
          });
        }
      }
      
      cascade.push({
        layer: 3,
        label: "Component",
        token: tokenName,
        color: getPaletteColor(componentToken.references || ""),
      });
      
      const tailwind = getTailwindForToken(componentToken);
      if (tailwind.length > 0) {
        cascade.push({
          layer: 4,
          label: "Tailwind",
          token: tailwind[0],
          value: tailwind.join(", "),
        });
      }
    }
  }
  // Check if it's a Layer 2 semantic token
  else if (tokenName.startsWith("--wex-") && !tokenName.includes("-palette-")) {
    const semanticToken = ALL_TOKENS.find((t) => t.name === tokenName);
    if (semanticToken) {
      const paletteRef = semanticToken.references;
      if (paletteRef) {
        cascade.push({
          layer: 1,
          label: "Palette",
          token: paletteRef,
          color: getPaletteColor(paletteRef),
        });
      }
      
      cascade.push({
        layer: 2,
        label: "Semantic",
        token: tokenName,
        color: getPaletteColor(paletteRef || ""),
      });
      
      // Find Layer 3 tokens that reference this
      const layer3Tokens = getLayer3FromSemantic(tokenName);
      if (layer3Tokens.length > 0) {
        cascade.push({
          layer: 3,
          label: "Component",
          token: layer3Tokens[0].name,
          value: `+${layer3Tokens.length - 1} more`,
        });
      }
      
      const tailwind = semanticToken.tailwindUtilities;
      if (tailwind && tailwind.length > 0) {
        cascade.push({
          layer: 4,
          label: "Tailwind",
          token: tailwind[0],
          value: tailwind.join(", "),
        });
      }
    }
  }
  // Check if it's a Layer 1 palette token
  else if (tokenName.includes("-palette-")) {
    cascade.push({
      layer: 1,
      label: "Palette",
      token: tokenName,
      color: getPaletteColor(tokenName),
    });
    
    // Find semantic tokens that reference this palette
    const semanticRefs = ALL_TOKENS.filter((t) => t.references === tokenName);
    if (semanticRefs.length > 0) {
      cascade.push({
        layer: 2,
        label: "Semantic",
        token: semanticRefs[0].name,
        value: semanticRefs.length > 1 ? `+${semanticRefs.length - 1} more` : undefined,
      });
    }
  }
  
  return cascade;
}

/**
 * Get the computed color for a palette token
 */
function getPaletteColor(tokenName: string): string | undefined {
  if (!tokenName) return undefined;
  
  // Extract ramp and shade from token name like "--wex-palette-blue-700"
  const match = tokenName.match(/--wex-palette-(\w+)-?(\d+)?/);
  if (!match) return undefined;
  
  const [, rampName, shadeStr] = match;
  
  if (rampName === "white") return "hsl(0 0% 100%)";
  if (rampName === "black") return "hsl(0 0% 0%)";
  
  const shade = shadeStr ? parseInt(shadeStr, 10) : 500;
  const ramp = PALETTE_RAMPS.find((r) => r.name === rampName);
  if (!ramp) return undefined;
  
  const shadeData = ramp.shades.find((s) => s.shade === shade);
  if (!shadeData) return undefined;
  
  return `hsl(${ramp.hue} ${ramp.saturation}% ${shadeData.lightness}%)`;
}

// ============================================================================
// Main Component
// ============================================================================

export function TokenCascadeView({ tokenName, className, compact = false }: TokenCascadeViewProps) {
  const cascade = buildCascade(tokenName);
  
  if (cascade.length === 0) {
    return null;
  }
  
  if (compact) {
    return (
      <div className={cn("flex items-center gap-1 text-[10px] text-muted-foreground", className)}>
        <Layers className="h-3 w-3" />
        <span className="font-mono">
          {cascade.map((layer, idx) => (
            <React.Fragment key={layer.layer}>
              <span className="text-foreground">{layer.token.replace("--wex-", "").replace("component-", "").slice(0, 20)}</span>
              {idx < cascade.length - 1 && <span className="mx-1">→</span>}
            </React.Fragment>
          ))}
        </span>
      </div>
    );
  }
  
  return (
    <div className={cn("rounded-lg border border-border bg-card p-4", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Layers className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Token Cascade</span>
      </div>
      
      <div className="space-y-2">
        {cascade.map((layer, idx) => (
          <React.Fragment key={layer.layer}>
            <CascadeLayerRow layer={layer} />
            {idx < cascade.length - 1 && (
              <div className="flex justify-center">
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Cascade Layer Row
// ============================================================================

interface CascadeLayerRowProps {
  layer: CascadeLayer;
}

function CascadeLayerRow({ layer }: CascadeLayerRowProps) {
  const layerColors: Record<number, string> = {
    1: "bg-blue-100 border-blue-300",
    2: "bg-green-100 border-green-300",
    3: "bg-amber-100 border-amber-300",
    4: "bg-purple-100 border-purple-300",
  };
  
  const layerLabels: Record<number, string> = {
    1: "L1",
    2: "L2",
    3: "L3",
    4: "L4",
  };
  
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md border",
        layerColors[layer.layer] || "bg-muted border-border"
      )}
    >
      {/* Layer badge */}
      <div className="flex-shrink-0 w-8 h-6 flex items-center justify-center rounded text-[10px] font-bold bg-background/80">
        {layerLabels[layer.layer] || `L${layer.layer}`}
      </div>
      
      {/* Color swatch */}
      {layer.color && (
        <div
          className="w-5 h-5 rounded-sm border border-border/50 flex-shrink-0"
          style={{ backgroundColor: layer.color }}
        />
      )}
      
      {/* Token info */}
      <div className="flex-1 min-w-0">
        <div className="text-xs font-mono truncate">{layer.token}</div>
        {layer.value && (
          <div className="text-[10px] text-muted-foreground truncate">{layer.value}</div>
        )}
      </div>
      
      {/* Layer type label */}
      <div className="text-[10px] font-medium text-muted-foreground flex-shrink-0">
        {layer.label}
      </div>
    </div>
  );
}

export default TokenCascadeView;

