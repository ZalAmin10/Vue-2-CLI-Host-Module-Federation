const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: "http://localhost:8082",
  chainWebpack: config => {
    config.optimization.delete('splitChunks');
    config
    .plugin('module-federation-plugin')
    .use(require('webpack').container.ModuleFederationPlugin, [{
      remotes: {
        "remote": "remote@http://localhost:8081/remoteEntry.js"
      },
      shared: {
        "vue": { 
          eager: true,
          singleton: false
        }
      },
    }])
  },
});
