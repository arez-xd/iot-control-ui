/**
 * build/ts/tokens.ts
 * Generated file — do not edit manually.
 * Source of truth: tokens/core/*.json + tokens/semantic/*.json
 */

export type TokenValue = string | number | boolean | null;

export type TokenTree = {
  [key: string]: TokenTree | TokenValue;
};

/**
 * A minimal, typed-ish token bundle.
 * - core values are concrete (hex, px, numbers)
 * - semantic values may reference core via "{...}" syntax
 */
export const tokens = {
  core: {
    color: {
      base: {
        neutral: {
          50: "#F8FAFC",
          100: "#F2F4F7",
          200: "#E4E7EC",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#2C2C2E",
          800: "#16181D",
          900: "#0A0B0D",
        },
        blue: {
          500: "#007AFF",
          600: "#0068D9",
          700: "#0055B2",
        },
        cyan: {
          500: "#00F2FF",
          600: "#00CED9",
          700: "#00A9B2",
        },
        green: {
          500: "#00F5A0",
          600: "#00D085",
          700: "#00AA6F",
        },
        amber: {
          500: "#FF9F0A",
          600: "#D98708",
          700: "#B26F07",
        },
        red: {
          500: "#FF453A",
          600: "#D93A31",
          700: "#B23029",
        },
        purple: {
          500: "#7C3AED",
          600: "#6D28D9",
          700: "#5B21B6",
        },
      },
      alpha: {
        transparent: "#00000000",
        white: {
          5: "#FFFFFF0D",
          10: "#FFFFFF1A",
          15: "#FFFFFF26",
          20: "#FFFFFF33",
        },
        black: {
          20: "#00000033",
          40: "#00000066",
          60: "#00000099",
        },
      },
      special: {
        white: "#FFFFFF",
        black: "#000000",
      },
    },

    space: {
      0: "0px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "32px",
      8: "40px",
      9: "48px",
      10: "64px",
      11: "80px",
      12: "96px",
    },

    radius: {
      none: "0px",
      xs: "6px",
      sm: "10px",
      control: "12px",
      card: "16px",
      xl: "24px",
      full: "9999px",
    },

    size: {
      hitArea: { min: "44px" },
      control: { height: { default: "44px", compact: "36px" } },
      chip: { height: "28px" },
      icon: { xs: "12px", sm: "16px", md: "20px", lg: "24px", xl: "32px" },
    },

    stroke: {
      width: { hairline: "1px", default: "1px", strong: "2px" },
    },

    typography: {
      fontFamily: {
        text: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
        mono: "'SF Mono', SFMono-Regular, ui-monospace, monospace",
      },
      fontSize: {
        xs: "11px",
        sm: "13px",
        md: "15px",
        lg: "17px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "28px",
        "4xl": "34px",
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      lineHeight: {
        ui: "1.2",
        body: "1.4",
        relaxed: "1.6",
      },
      letterSpacing: {
        tight: "-0.01em",
        normal: "0",
        wide: "0.02em",
      },
    },

    elevation: {
      scrim: {
        modal: { color: "#00000099" },
      },
      shadow: {
        float: {
          color: "#00000080",
          dx: 0,
          dy: 8,
          blur: 24,
          spread: -2,
        },
      },
      highlight: {
        float: {
          color: "#FFFFFF14",
          dx: 0,
          dy: 0,
          blur: 0,
          spread: 1,
        },
      },
    },
  },

  semantic: {
    color: {
      bg: {
        canvas: "{core.color.base.neutral.900}",
        surface: "{core.color.base.neutral.800}",
        elevated: "{core.color.base.neutral.800}",
      },

      text: {
        primary: "{core.color.base.neutral.100}",
        secondary: "{core.color.base.neutral.300}",
        tertiary: "{core.color.base.neutral.500}",
        disabled: "{core.color.base.neutral.600}",
        tint: "{core.color.base.blue.500}",
        destructive: "{core.color.base.red.500}",
      },

      separator: {
        default: "{core.color.alpha.white.10}",
        strong: "{core.color.alpha.white.15}",
      },

      control: {
        primary: {
          bg: "{core.color.base.blue.500}",
          pressed: "{core.color.base.blue.600}",
          text: "{core.color.special.white}",
        },
        secondary: {
          bg: "{core.color.alpha.white.5}",
          pressed: "{core.color.alpha.white.10}",
          text: "{core.color.base.neutral.100}",
          border: "{core.color.alpha.white.10}",
        },
        destructive: {
          bg: "{core.color.base.red.500}",
          pressed: "{core.color.base.red.600}",
          text: "{core.color.special.white}",
        },
      },

      status: {
        success: {
          fg: "{core.color.base.green.500}",
          surface: "{core.color.base.green.900}",
          border: "{core.color.base.green.700}",
        },
        warning: {
          fg: "{core.color.base.amber.500}",
          surface: "{core.color.base.amber.900}",
          border: "{core.color.base.amber.700}",
        },
        error: {
          fg: "{core.color.base.red.500}",
          surface: "{core.color.base.red.900}",
          border: "{core.color.base.red.700}",
        },
        info: {
          fg: "{core.color.base.cyan.500}",
          surface: "{core.color.base.cyan.900}",
          border: "{core.color.base.cyan.700}",
        },
      },

      data: {
        grid: "{core.color.alpha.white.10}",
        axis: "{core.color.base.neutral.500}",
        series: {
          1: "{core.color.base.blue.500}",
          2: "{core.color.base.cyan.500}",
          3: "{core.color.base.green.500}",
          4: "{core.color.base.amber.500}",
          5: "{core.color.base.purple.500}",
        },
      },

      overlay: {
        scrim: "{core.elevation.scrim.modal.color}",
      },
    },

    space: {
      inset: {
        screen: "{core.space.6}",
        card: "{core.space.5}",
        cell: "{core.space.4}",
      },
      stack: {
        xs: "{core.space.2}",
        sm: "{core.space.3}",
        md: "{core.space.4}",
        lg: "{core.space.5}",
      },
      control: {
        paddingX: "{core.space.4}",
        paddingY: "{core.space.3}",
        gap: "{core.space.2}",
      },
    },

    radius: {
      control: "{core.radius.control}",
      card: "{core.radius.card}",
      sheet: "{core.radius.xl}",
      pill: "{core.radius.full}",
    },

    size: {
      hitArea: { min: "{core.size.hitArea.min}" },
      control: {
        minHeight: "{core.size.control.height.default}",
        compactHeight: "{core.size.control.height.compact}",
      },
      icon: {
        sm: "{core.size.icon.sm}",
        md: "{core.size.icon.md}",
        lg: "{core.size.icon.lg}",
      },
    },

    stroke: {
      width: {
        hairline: "{core.stroke.width.hairline}",
        default: "{core.stroke.width.default}",
        strong: "{core.stroke.width.strong}",
      },
      separator: {
        default: { width: "{semantic.stroke.width.hairline}", color: "{semantic.color.separator.default}" },
        strong: { width: "{semantic.stroke.width.default}", color: "{semantic.color.separator.strong}" },
      },
    },

    elevation: {
      scrim: { modal: "{core.elevation.scrim.modal.color}" },
      floating: {
        shadow: "{core.elevation.shadow.float}",
        highlight: "{core.elevation.highlight.float}",
      },
    },
  },
} as const;

// -----------------------------
// Helpers (optional)
// -----------------------------

/** Get a token by dot-path, e.g. "semantic.color.text.primary" */
export function get(path: string, root: unknown = tokens): unknown {
  return path.split(".").reduce((acc: any, key) => (acc == null ? acc : acc[key]), root as any);
}

/** Detects "{...}" reference values */
export function isRef(value: unknown): value is string {
  return typeof value === "string" && value.startsWith("{") && value.endsWith("}");
}

/**
 * Resolve "{core...}" style references.
 * - resolves within tokens (core+semantic)
 * - stops after maxDepth to avoid cycles
 */
export function resolveToken(value: unknown, maxDepth = 10): unknown {
  let current = value;
  let depth = 0;

  while (isRef(current) && depth < maxDepth) {
    const refPath = current.slice(1, -1);
    const next = get(refPath);
    if (next == null) return current; // unresolved reference
    current = next;
    depth += 1;
  }

  return current;
}
