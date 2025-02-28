const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

// Tambahkan support untuk react-native-svg-transformer
defaultConfig.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg");
defaultConfig.resolver.sourceExts = [...defaultConfig.resolver.sourceExts, "svg"];

module.exports = withNativeWind(defaultConfig, { input: "./global.css" });
