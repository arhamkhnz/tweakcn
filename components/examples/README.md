# Simple Theme Provider

This example demonstrates a minimal CSS variable based theme switcher that can be copied into any Next.js application.

## Usage

1. Copy `simple-theme-provider.tsx` into your project.
2. Define your theme values and wrap your app with `SimpleThemeProvider`.

```tsx
const themes = {
  default: {
    background: '#ffffff',
    foreground: '#000000',
    primary: '#2563eb',
  },
  dark: {
    background: '#0f172a',
    foreground: '#f1f5f9',
    primary: '#3b82f6',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SimpleThemeProvider themes={themes} defaultTheme="default">
          {children}
        </SimpleThemeProvider>
      </body>
    </html>
  );
}
```

Call `const { setTheme } = useSimpleTheme()` anywhere in your app to switch themes. Set `disabled` on the provider to turn off custom theming.
