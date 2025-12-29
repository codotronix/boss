export const ComingSoon = ({ appName }: { appName: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h2 className="text-3xl font-bold my-4">Coming Soon!</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        {appName} is under development. Stay tuned for updates!
      </p>
    </div>
  );
};
