// import { Suspense, lazy } from "react";

// // Lazy-load the remote Welcome app via module federation
// const RemoteWelcome = lazy(async () => {
//   const mod = await import("boss_welcome/Welcome");
//   const Component = mod.Welcome ?? mod.default;

//   if (!Component) {
//     throw new Error(
//       "boss_welcome/Welcome did not return a component. Check the remote's exposes."
//     );
//   }

//   return { default: Component };
// });

export const WelcomeApp = () => {
  return (
    // <Suspense fallback={<div>Loading Welcome...</div>}>
    //   <RemoteWelcome appName="WelcomeApp" {...props} />
    // </Suspense>
    <div>Not The Welcome you're looking for</div>
  );
};
