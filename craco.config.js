const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

module.exports = {
    webpack: {
        configure: {
            output: {
                // publicPath: "https://codotronix.github.io/boss/",
                publicPath: "http://localhost:3000/boss/",
            },
            entry: './src/index.js',
            plugins: [
                new ModuleFederationPlugin({
                    name: "boss",
                    // library: { type: "var", name: "app1" },
                    filename: "remoteEntry.js",
                    remotes: {
                        bcalc: "bcalc@https://codotronix.github.io/bcalc/remoteEntry.js",
                        // bcalc: "bcalc@http://localhost:3001/remoteEntry.js",
                    },
                    shared: {
                        react: { singleton: true, eager: true },
                        'react-dom': { singleton: true, eager: true },
                    },
                }),

                new ExternalTemplateRemotesPlugin(),
            ]
        },
    },
};