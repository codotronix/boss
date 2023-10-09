const {ModuleFederationPlugin} = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

module.exports = {
    webpack: {
        configure: {
            output: {
                // publicPath: "https://codotronix.github.io/boss/",
            },
            entry: './src/index.js',
            plugins: [
                // new ModuleFederationPlugin({
                //   name: "boss",
                //   // library: { type: "var", name: "app1" },
                //   filename: "remoteEntry.js",
                //   remotes: {
                //     app1: "app1@http://localhost:3001/remoteEntry.js",
                //     app2: "app2@http://localhost:3002/remoteEntry.js",
                //     app3: "app3@http://localhost:3003/remoteEntry.js",
                //   },
                //   exposes: {
                //     "./BoxHolder": "./src/components/common/BoxHolder"
                //   },
                // //   shared: {react: {singleton: true}, "react-dom": {singleton: true}},
                // }),
          
                // new ExternalTemplateRemotesPlugin(),
            ]
        },
    },
};