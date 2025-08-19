// Mailchimp.js (Embed-only mode)
import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  useTheme,
  alpha,
} from "@mui/material";

/**
 * Mailchimp (Embed mode only)
 * Posts directly to your Mailchimp "Embedded form" action URL — no backend required.
 *
 * REQUIRED PROPS
 * - actionUrl: string  → e.g. "https://us21.list-manage.com/subscribe/post?u=XXXX&id=YYYY"
 * - hiddenInputName: string → Mailchimp honeypot field name, e.g. "b_XXXX_YYYY"
 *
 * OPTIONAL PROPS
 * - title?: string
 * - subtitle?: string
 * - buttonLabel?: string (default: "Subscribe")
 * - target?: "_blank" | "_self" (default: "_blank")
 * - showNameFields?: boolean (default: false)
 * - requireConsent?: boolean (default: false)
 * - consentLabel?: string (default provided)
 * - palette?: { MAIN_COLOR?: string; SECONDARY_COLOR?: string }
 * - size?: "compact" | "comfortable" (default: "comfortable")
 *
 * Notes:
 * - Mailchimp handles the confirmation page. With target="_blank", your site stays in place.
 * - For double opt-in, configure it in your Mailchimp audience settings.
 */
export default function Mailchimp({
  actionUrl,
  hiddenInputName,
  buttonLabel = "Subscribe",
  target = "_blank",
  showNameFields = false,
  requireConsent = false,
  consentLabel = "I agree to receive emails and understand I can unsubscribe at any time.",
  palette,
  size = "comfortable",
}) {
  const theme = useTheme();

  // Default colors aligned with your pattern; can be overridden via `palette`
  const MAIN_COLOR = palette?.MAIN_COLOR || "#002855";
  const SECONDARY_COLOR = palette?.SECONDARY_COLOR || "#3C6E71";

  const colors = useMemo(
    () => ({
      base: "#ffffff",
      light: "#f9f9f9",
      medium: "#f2f2f2",
      dark: "#efefef",
      accentVeryLight: alpha(MAIN_COLOR, 0.03),
      sectionBorder: alpha(MAIN_COLOR, 0.1),
      sectionHighlight: alpha(SECONDARY_COLOR, 0.1),
    }),
    [MAIN_COLOR, SECONDARY_COLOR, alpha]
  );

  const [consented, setConsented] = useState(!requireConsent);

  const spacingY = size === "compact" ? 1.25 : 2;
  const inputSize = size === "compact" ? "small" : "medium";
  const buttonPadding = size === "compact" ? "8px 16px" : "10px 20px";

  return (
    <Box
      component="section"
      aria-labelledby="mailchimp-heading"
      sx={{
        width: "100%",
        backgroundColor: colors.base,
        border: `1px solid ${colors.sectionBorder}`,
        borderRadius: 2,
        p: { xs: 2.5, md: 3 },
        mx: "auto",
        transition: "border-color .3s ease, box-shadow .3s ease",
        "&:hover": {
          borderColor: colors.sectionHighlight,
          boxShadow: `0 6px 24px ${alpha(MAIN_COLOR, 0.08)}`,
        },
      }}
    >
      

      {/* === EMBED FORM (posts to Mailchimp directly) === */}
      <Box
        component="form"
        action={actionUrl}
        method="post"
        target={target}
        noValidate
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: showNameFields ? "1fr 1fr 1.4fr auto" : "1.6fr auto" },
          gap: { xs: 1.25, sm: 1.5 },
          alignItems: "center",
        }}
      >
        {showNameFields && (
          <>
            <TextField
              id="mce-FNAME"
              name="FNAME"
              label="First name"
              size={inputSize}
              autoComplete="given-name"
              variant="outlined"
              InputProps={{ sx: { backgroundColor: colors.light } }}
            />
            <TextField
              id="mce-LNAME"
              name="LNAME"
              label="Last name"
              size={inputSize}
              autoComplete="family-name"
              variant="outlined"
              InputProps={{ sx: { backgroundColor: colors.light } }}
            />
          </>
        )}

        <TextField
          id="mce-EMAIL"
          name="EMAIL"
          type="email"
          label="Email address"
          size={inputSize}
          required
          autoComplete="email"
          variant="outlined"
          InputProps={{
            sx: {
              backgroundColor: colors.light,
              "&:focus-within fieldset": { borderColor: MAIN_COLOR + " !important" },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={!consented}
          sx={{
            whiteSpace: "nowrap",
            px: 2.5,
            py: 1.25,
            alignSelf: "stretch",
            height: size === "compact" ? 40 : 44,
            backgroundColor: MAIN_COLOR,
            "&:hover": { backgroundColor: alpha(MAIN_COLOR, 0.9) },
            textTransform: "none",
            fontWeight: 700,
            borderRadius: 1.5,
          }}
        >
          {buttonLabel}
        </Button>

        {/* Honeypot (Mailchimp expects this exact hidden field to catch bots) */}
        <Box sx={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
          <input type="text" name={hiddenInputName} tabIndex={-1} defaultValue="" />
        </Box>
      </Box>

      {/* Consent row */}
      {requireConsent && (
        <Box sx={{ mt: spacingY }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={consented}
                onChange={(e) => setConsented(e.target.checked)}
                sx={{
                  color: SECONDARY_COLOR,
                  "&.Mui-checked": { color: SECONDARY_COLOR },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.8) }}>
                {consentLabel}
              </Typography>
            }
          />
        </Box>
      )}

      {/* Small print */}
      <Typography
        variant="caption"
        sx={{ display: "block", mt: spacingY, color: alpha(theme.palette.text.primary, 0.6) }}
      >
        We respect your privacy. Unsubscribe at any time.
      </Typography>
    </Box>
  );
}


