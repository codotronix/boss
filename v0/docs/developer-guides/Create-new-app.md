# How to Create a New (INTERNAL) App for B.O.S.S.


## Step 1: Create the App / Component

- Just write the app as any other react component. 
- Make sure the outer html div has a style of `width: 100%` and `min-height: 100%` so that the app can resize itself with the outer window (WinFrame) where it will be loaded.


## Step 2: Export withWinFrame()
- Import `withWinFrame` HOC Funtion and instead of just exporting the app, export it by wrapping inside withWinFrame, e.g. 
```
// Instead of this
export default MyCoolAPP

// Do this
export default withWinFrame(MyCoolAPP)
```


## Step 3: Necessary Config
- Add the details of this new app in `src/const/APPS_DETAILS.js`. Make sure the AppId is unique. At this piint the app should be visible in the `All Apps`. Also, if you did `docked: true`, the app icon should be visible in the DOCK. But clicking on will not open the app, yet.

- Next, go to `src/const/MAP_APP_ID_TO_COMPONENT.js` and add an entry for the app. Be sure to keep the ID same as `APPS_DETAILS.js`. Now the app should open in a window if we click on it.



