module.exports = function (buildOptions) {
  return {
    ...buildOptions,
    sourcemap: true,
    define: {
      global: "window",
    },
  };
};
