import { useEffect, useRef } from "react";
import Map from "./NeoMap/index";
import EditMap from "./EditMap/index";
const NeoMap = () => {
  const neoMap = useRef(null);
  const editMap = useRef(null);
  useEffect(() => {
    neoMap.current = new Map({
      container: "canvas",
      center: [120, 30],
      zoom: 15,
      type: "gaode",
    });
    neoMap.current.map.on("load", () => {
      console.log("组件地图加载完成");
      editMap.current = new EditMap(neoMap.current.map);
    });
  }, []);
  const changeLayer = () => {
    console.log(
      "neoMap.current.changeLayer('baidu'): ",
      neoMap.current.getAllLayers("baidu")
    );
  };
  const addLayer = () => {
    neoMap.current.map.addSource("counties", {
      type: "vector",
      url: "mapbox://mapbox.82pkq93d",
    });
    neoMap.current.addLayer({
      id: "counties",
      type: "fill",
      source: "counties",
      "source-layer": "original",
      paint: {
        "fill-outline-color": "rgba(0,0,0,0.1)",
        "fill-color": "rgba(0,0,0,0.1)",
      },
    });
  };
  const addDrawLayer = () => {
    editMap.current.addDraw();
  };
  // const changeEdit = ()=>{
  //     editMap.current.edit.changeMode('draw_point');
  //     console.log(editMap.current)
  // }
  const addModel = () => {
    const tb = (window.tb = new Threebox(
      neoMap.current.map,
      neoMap.current.map.getCanvas().getContext("webgl"),
      {
        defaultLights: true,
      }
    ));

    console.log("地图加载完成", neoMap.current.map);
    neoMap.current.map.addLayer({
      id: "custom-threebox-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: function () {
        const scale = 3.2;
        const options = {
          obj: "https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf",
          type: "gltf",
          scale: { x: scale, y: scale, z: 2.7 },
          units: "meters",
          rotation: { x: 90, y: -90, z: 0 },
        };

        tb.loadObj(options, (model) => {
          model.setCoords([120, 30]);
          model.setRotation({ x: 0, y: 0, z: 241 });
          tb.add(model);
          console.log(model,'model')
        });
      },

      render: function () {
        tb.update();
        console.log("render")
      },
    });
    neoMap.current.map.setCenter([120, 30]);
  };
  return (
    <div>
      <div id="canvas"></div>
      <button onClick={changeLayer} className="change-layer">
        切换图层
      </button>
      <button onClick={addLayer} className="change-layer" style={{ left: 120 }}>
        添加图层
      </button>
      <button
        onClick={addDrawLayer}
        className="change-layer"
        style={{ left: 200 }}
      >
        添加绘制
      </button>
      <button onClick={addModel} className="change-layer" style={{ left: 280 }}>
        添加模型
      </button>
    </div>
  );
};
export default NeoMap;
