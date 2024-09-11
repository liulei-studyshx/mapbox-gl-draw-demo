
class OptionMap {
  constructor(map) {
    this.map = map;
    this.edit = null;
  }
  changeLayer = (layer)=> {
    console.log("change layer",this.map.getStyle().layers);
  }
  getAllLayers = ()=>{
    const map = {};
    const list = this.map.getStyle().layers;
    list.forEach(item=>{
      map[item.id] = item
    })
    return map;
  }
 
}
export default OptionMap;