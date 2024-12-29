// theme.ts
import { MantineThemeOverride } from "@mantine/core";

interface ExtendedMantineThemeOverride extends MantineThemeOverride {
  colorScheme?: "light" | "dark";
}

export const theme: ExtendedMantineThemeOverride = {
  colorScheme: "light",
  primaryColor: "blue",
  fontFamily: "Arial, sans-serif",
};
