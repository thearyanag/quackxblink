import { NextRequest, NextResponse } from "next/server";

interface Rule {
  pathPattern: string;
  apiPath: string;
}

interface Actions {
  rules: Rule[];
}

interface Action {
  label: string;
  href: string;
  parameters?: Array<{
    name: string;
    label: string;
  }>;
}

interface Properties {
  label: string;
  title: string;
  icon: string;
  description: string;
  links: {
    actions: Action[];
  };
  apiPath: string;
}

function matchPattern(pattern: string, path: string): boolean {
  const regexPattern = pattern.replace(/\*/g, "[^/]*").replace(/\*\*/g, ".*");
  return new RegExp(`^${regexPattern}$`).test(path);
}

function bestMatchRule(path: string, rules: Rule[]): Rule | null {
  let bestMatch: Rule | null = null;
  let bestMatchScore = -1;

  for (const rule of rules) {
    if (matchPattern(rule.pathPattern, path)) {
      // Calculate a score based on specificity
      const score =
        rule.pathPattern.length -
        (rule.pathPattern.match(/\*/g) || []).length * 2;
      if (score > bestMatchScore) {
        bestMatch = rule;
        bestMatchScore = score;
      }
    }
  }

  return bestMatch;
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  try {
    const parsedUrl = new URL(url);
    const actionsUrl = `${parsedUrl.origin}/actions.json`;

    const actionsResponse = await fetch(actionsUrl);
    if (!actionsResponse.ok) {
      throw new Error(
        `Failed to fetch actions.json: ${actionsResponse.statusText}`
      );
    }
    const actions: Actions = await actionsResponse.json();

    const path = parsedUrl.href.replace(parsedUrl.origin, "");
    console.log("Path:", path);

    // Find the best matching rule
    const rule = bestMatchRule(path, actions.rules);

    if (!rule) {
      return NextResponse.json(
        { error: "No matching rule found" },
        { status: 404 }
      );
    }
    let newPath = path;
    if (rule.pathPattern.endsWith("**")) {
      const prefix = rule.pathPattern.slice(0, -2);
      newPath = path.startsWith(prefix) ? path.slice(prefix.length) : path;
    }

    const apiPathBase = rule.apiPath.split("**")[0];
    console.log("API Path Base:", apiPathBase);
    let newURL = "";
    if (apiPathBase.startsWith("/")) {
      newURL = `${parsedUrl.origin}${apiPathBase}${newPath}`;
    } else {
      newURL = `${apiPathBase}${newPath}`;
    }
    console.log("New URL:", newURL);

    // Make a request to the new URL
    const response = await fetch(newURL);
    const data = await response.json();

    const properties: Properties = {
      label: data.label,
      title: data.title,
      icon: data.icon,
      description: data.description,
      links: {
        actions: data.links.actions.map((action: any) => ({
          label: action.label,
          href: action.href,
          parameters: action.parameters,
        })),
      },
      apiPath: new URL(newURL).origin,
    };

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
