window.CESIUM_BASE_URL = "../../Source/";

import * as Cesium from "../../Source/Cesium.js";

function main() {
  var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
      url: 'https://liankangshan.oss-cn-huhehaote-nebula-1.aliyuncs.com/gis/xinxian/dividedom/1/{z}/{x}/{y}.png',
      maximumLevel: 21,
      minimumLevel: 10,
      rectangle: Cesium.Rectangle.fromDegrees(114.760852251711, 31.6836604754006, 114.822267387486, 31.7087358407056)
    }),
    terrainProvider: new Cesium.CesiumTerrainProvider({
      url: 'https://liankangshan.oss-cn-huhehaote-nebula-1.aliyuncs.com/gis/xinxian/dem_2m'
    }),
    // terrainProvider: Cesium.createWorldTerrain(),
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    navigationHelpButton: false,
    vrButton: false,
    scene3DOnly: true,
    timeline: true,
    animation: false,
    fullscreenButton: false,
    selectionIndicator: false,
    infoBox: false,
    orderIndependentTranslucency: false,
    contextOptions: {
      webgl: {
        alpha: true,
      }
    }
  });

  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(114.83591338672242, 31.61611707452169, 241.32517526303334),
    orientation: {
      heading: Cesium.Math.toRadians(117.01832077980848),
      pitch: Cesium.Math.toRadians(-23.873659277671706)
    }
  });
}

main();
