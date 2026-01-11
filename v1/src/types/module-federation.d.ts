declare module "boss_welcome/Welcome" {
  import { ComponentType } from "react";

  export interface WelcomeAppProps {
    appName?: string;
  }

  export const Welcome: ComponentType<WelcomeAppProps>;
  const DefaultWelcome: ComponentType<WelcomeAppProps>;
  export default DefaultWelcome;
}
