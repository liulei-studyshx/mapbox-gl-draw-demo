// mapbox 编辑相关的操作
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import EditOption from "./EditOption";
class EditMap {
  constructor(map) {
    this.map = map;
    this.edit = null;
    this.selectedLayer = [];
    console.log('NeoMap: ', this.map);

    if (!this.map ) {
      throw new Error("map is not instance of NeoMap");
    }
    this.initDraw();
    return Object.assign(this.edit, new EditOption(this.map, this.edit));
  }

  /**
   * 初始化绘制工具
   * 并初始化监听事件
   */
  initDraw = () => {
    this.edit = new MapboxDraw();
    this.map.addControl(this.edit, "top-left");
    this.map.on("draw.selectionchange", this.selectionChange);
    this.map.on("draw.create", () => {
      console.log("draw.create");
    });
    this.map.on("draw.update", (e) => {
      console.log("draw.update",e);
      this.drawUpdate(e)
    });
    this.map.on("draw.delete", () => {
      console.log("draw.delete");
    });
  };
  //   选中监听事件处理样式
  selectionChange = (e) => {
    if ((e.features || []).length > 0) {
      this.clearVisibilityNone();
      e.features.forEach((feature) => {
        if (this.map.getLayer(feature.id)) {
          this.selectedLayer.push(feature.id);
          this.map.setLayoutProperty(feature.id, "visibility", "none");
        }
      });
    } else {
        this.clearVisibilityNone();
    }
    // console.log(this.edit.getSelected());
  };

  drawUpdate = (e) => {
    e.features.forEach((feature) => {
        const updateSource = this.map.getSource(feature.id);
        const data = updateSource._data;
        data.features[0].geometry.coordinates = feature.geometry.coordinates;
        updateSource.setData(data);
    })
  }
  //   清除选中样式
  clearVisibilityNone = () => {
    this.selectedLayer.forEach((id) => {
      this.map.setLayoutProperty(id, "visibility", "visible");
    });
    this.selectedLayer = [];
  };
}
export default EditMap;
