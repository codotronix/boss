export interface IInstalledApp {
  appId: string;
  name: string;
  iconClass: string;
  allowedInstances?: number;
  //   version: string;
  //   description?: string;
  //   author?: string;
  //   installDate: Date;
}

export interface IRunningApp {
  runId: string;
  appId: string;
}
