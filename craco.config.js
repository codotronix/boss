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
                new ModuleFederationPlugin({
                  name: "boss",
                  // library: { type: "var", name: "app1" },
                  filename: "remoteEntry.js",
                  remotes: {
                    bcalc: "bcalc@https://codotronix.github.io/bcalc/remoteEntry.js",
                  },
                //   exposes: {
                //     "./BoxHolder": "./src/components/common/BoxHolder"
                //   },
                //   shared: {react: {singleton: true}, "react-dom": {singleton: true}},
                }),
          
                new ExternalTemplateRemotesPlugin(),
            ]
        },
    },
};