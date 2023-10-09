const {ModuleFederationPlugin} = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

module.exports = {
    webpack: {
        configure: {
            output: {
                publicPath: "http://localhost:3000/",
            },
            entry: './src/index.js',
            plugins: [
                // new ModuleFederationPlugin({
                //   name: "app2",
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