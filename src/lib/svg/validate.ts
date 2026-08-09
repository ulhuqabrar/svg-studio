const DANGEROUS_TAGS = [
  "script",
  "iframe",
  "object",
  "embed",
  "form",
  "input",
  "textarea",
  "button",
  "select",
  "link",
  "meta",
  "base",
  "applet",
];

const DANGEROUS_ATTRS = [
  "onload",
  "onerror",
  "onclick",
  "onmouseover",
  "onmouseout",
  "onmousemove",
  "onfocus",
  "onblur",
  "onsubmit",
  "onreset",
  "onselect",
  "onchange",
  "onkeydown",
  "onkeyup",
  "onkeypress",
];

export interface ValidateResult {
  valid: boolean;
  errors: string[];
  sanitized?: string;
}

export function validateSvg(content: string): ValidateResult {
  const errors: string[] = [];

  if (!content || typeof content !== "string") {
    return { valid: false, errors: ["SVG content is empty or invalid"] };
  }

  const trimmed = content.trim();

  if (!trimmed.startsWith("<svg") || !trimmed.endsWith("</svg>")) {
    errors.push("Content does not appear to be valid SVG");
  }

  const lower = trimmed.toLowerCase();

  for (const tag of DANGEROUS_TAGS) {
    if (lower.includes(`<${tag}`)) {
      errors.push(`Potentially dangerous tag found: <${tag}>`);
    }
  }

  for (const attr of DANGEROUS_ATTRS) {
    if (lower.includes(attr)) {
      errors.push(`Potentially dangerous attribute found: ${attr}`);
    }
  }

  if (trimmed.length > 1_000_000) {
    errors.push("SVG content exceeds maximum size (1MB)");
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? trimmed : undefined,
  };
}

export function sanitizeSvg(content: string): string {
  let result = content;

  for (const tag of DANGEROUS_TAGS) {
    const openRegex = new RegExp("<" + tag + "[^>]*>.*?</" + tag + ">", "gi");
    result = result.replace(openRegex, "");
    const selfClosingRegex = new RegExp("<" + tag + "[^>]*/>", "gi");
    result = result.replace(selfClosingRegex, "");
  }

  for (const attr of DANGEROUS_ATTRS) {
    const regex = new RegExp("\\s" + attr + "\\s*=\\s*[\"'][^\"']*[\"']", "gi");
    result = result.replace(regex, "");
  }

  return result.trim();
}
