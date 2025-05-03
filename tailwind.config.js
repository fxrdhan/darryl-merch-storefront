const path = require("path")

module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width max-width margin opacity",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      colors: {
        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
      },
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        circle: "9999px",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "99%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "gradient-xy": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "topToBottom": {
          "0%": { transform: "translateY(-10%)" },
          "50%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(-10%)" },
        },
        "bottomToTop": {
          "0%": { transform: "translateY(110%)" },
          "50%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(110%)" },
        },
        "leftToRight": {
          "0%": { transform: "translateX(-10%)" },
          "50%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-10%)" },
        },
        "rightToLeft": {
          "0%": { transform: "translateX(110%)" },
          "50%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(110%)" },
        },
        "diagonal1": {
          "0%": { transform: "translate(-10%, -10%)" },
          "50%": { transform: "translate(110%, 110%)" },
          "100%": { transform: "translate(-10%, -10%)" },
        },
        "diagonal2": {
          "0%": { transform: "translate(110%, -10%)" },
          "50%": { transform: "translate(-10%, 110%)" },
          "100%": { transform: "translate(110%, -10%)" },
        },
        "text-slide-down": {
          "0%": { transform: "translateY(0%)" },
          "45%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(-50%)" },
          "95%": { transform: "translateY(-70%)" },
          "100%": { transform: "translateY(-100%)" }
        },
        "orbit": {
          "0%": { transform: "rotate(0deg) translateX(200px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(200px) rotate(-360deg)" }
        },
        "reverse-orbit": {
          "0%": { transform: "rotate(360deg) translateX(300px) rotate(-360deg)" },
          "100%": { transform: "rotate(0deg) translateX(300px) rotate(0deg)" }
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top":
          "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open":
          "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close":
          "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
        "gradient-xy": "gradient-xy 15s ease infinite",
        "topToBottom": "topToBottom 20s linear infinite",
        "bottomToTop": "bottomToTop 20s linear infinite",
        "leftToRight": "leftToRight 20s linear infinite",
        "rightToLeft": "rightToLeft 20s linear infinite",
        "diagonal1": "diagonal1 20s linear infinite",
        "diagonal2": "diagonal2 20s linear infinite",
        "text-slide": "text-slide-down 4s ease-in-out infinite",
        "orbit": "orbit 30s linear infinite",
        "reverse-orbit": "reverse-orbit 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
}
