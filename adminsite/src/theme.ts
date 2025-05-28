import { createTheme, MantineColorsTuple } from "@mantine/core";

const myColor: MantineColorsTuple = [
  '#fdf4eb',
  '#f1e8dd',
  '#e1cfba',
  '#d1b494',
  '#c39e74',
  '#bb8f5f',
  '#b78853',
  '#a17543',
  '#8a6337',
  '#7e582d'
];

export const theme = createTheme({
  colors: {
    primary: myColor,
  },
  primaryColor: "primary",
  primaryShade: 8
});
