# External Apps - How To


## Index
- [List of External Apps](https://github.com/codotronix/bcalc)


## List of External Apps
- [B-Calc](https://github.com/codotronix/bcalc)


## How To Create An External App

- Create a simple reactvapp using create-react-app 

- Apply the webpack-module-federation changes to webpack config using `Craco`, since it is hidden in case of CRA

- Export the core app component. 

- Make sure the root html element in the app has css property of `width: 100%` and `height: 100%`, so that it can fill the `WinFrame` window where it is loaded
