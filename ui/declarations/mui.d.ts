import "@mui/material";

declare module "@mui/material/styles" {
  interface TypeText {
    grey?: string;
    error?: string;
  }

  /* TYPOGRAPHY */
  interface TypographyVariants {
    base: React.CSSProperties;
    baseXl: React.CSSProperties;
    navTitle: React.CSSProperties;
    navLink: React.CSSProperties;
    error: React.CSSProperties;
    tableHeader: React.CSSProperties;
    tableCell: React.CSSProperties;
    blockHeader: React.CSSProperties;
    pageHeader: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    base?: React.CSSProperties;
    baseXl?: React.CSSProperties;
    navTitle?: React.CSSProperties;
    navLink?: React.CSSPropertis;
    error?: React.CSSProperties;
    tableHeader?: React.CSSProperties;
    tableCell?: React.CSSProperties;
    blockHeader?: React.CSSProperties;
    pageHeader?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    base: true;
    baseXl: true;
    navTitle: true;
    navLink: true;
    error: true;
    tableHeader: true;
    tableCell: true;
    pageHeader: true;
    blockHeader: true;
  }
}
