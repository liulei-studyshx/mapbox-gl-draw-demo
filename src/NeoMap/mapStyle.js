const getLayers = (type) => {
  let layers = [];
  if (type === "gaode") {
    layers = [
      {
        id: "gaodeLayerSmall",
        type: "raster",
        source: "gaodeSourceSmall",
        minzoom: 1,
        maxzoom: 17.4,
        layout: {
          visibility: "visible",
        },
      },
      {
        id: "gaodeLayer",
        type: "raster",
        source: "gaodeSource",
        layout: {
          visibility: "visible",
        },
        minzoom: 17.4,
        maxzoom: 20.5,
      },
    ];
  }
  return layers;
};
const getSources = (type) => {
  let sources = {};
  if (type === "gaode") {
    sources = {
      gaodeSourceSmall: {
        tiles: [
          "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=18&x={x}&y={y}&z={z}",
        ],
        type: "raster",
        tileSize: 256,
      },
      gaodeSource: {
        tiles: [
          "https://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}&scl=3",
        ],
        type: "raster",
        tileSize: 512,
      },
    };
  }
  return sources;
};
export const getStyle = (type) => {
  let NeoMapStyle = {
    version: 8,
    name: "NeoMap",
    glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    sources: getSources(type),
    layers: getLayers(type),
  };
  return NeoMapStyle;
};
