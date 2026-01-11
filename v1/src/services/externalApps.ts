import { type IInstalledApp } from "@/const/APPS";

let _externalApps: { [appId: string]: IInstalledApp } | null = null;

export const getExternalApps = async (): Promise<{
  [appId: string]: IInstalledApp;
}> => {
  if (_externalApps) {
    return _externalApps;
  }

  try {
    const response = await fetch("data/external-apps.json");
    if (!response.ok) {
      throw new Error(
        `Failed to fetch external apps: ${response.status} ${response.statusText}`
      );
    }
    const data: { [appId: string]: IInstalledApp } = await response.json();
    _externalApps = data;
    return data;
  } catch (error) {
    console.error("Error fetching external apps:", error);
    return {};
  }
};
