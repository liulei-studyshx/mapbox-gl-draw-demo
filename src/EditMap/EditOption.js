class EditOption {
  constructor(map, edit) {
    this.map = map;
    this.edit = edit;
  }

  addDraw = () => {
    const geojsonData = {
      type: "FeatureCollection",
      features: [
        {
          id: "draw-polygon",
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-73.935242, 40.73061],
                [-73.935242, 40.75061],
                [-73.955242, 40.75061],
                [-73.955242, 40.73061],
                [-73.935242, 40.73061],
              ],
            ],
          },
          properties: {
            customStyle: "true",
            "fill-color": "#00ff00",
            "fill-opacity": 1,
            "fill-outline-color": "#ff0000",
            "fill-outline-width": 20,
          },
        },
        {
          id: "draw-polygon1",
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-73.945243, 40.730611],
                [-73.945243, 40.750611],
                [-73.965243, 40.750611],
                [-73.965243, 40.730611],
                [-73.945243, 40.730611],
              ],
            ],
          },
          properties: {
            customStyle: "true",
            "fill-color": "#0000ff",
            "fill-opacity": 1,
            "fill-outline-color": "#ffff00",
            "fill-outline-width": 20,
          },
        },
      ],
    };
    const featureId = this.edit.add(geojsonData);
    const layer = [];
    featureId.forEach((id) => {
        layer.push(this.edit.get(id))
    })
    layer.forEach(item=>{
        const source = {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [item],
            },
          };
          this.map.addSource(item.id, source);
          this.map.addLayer({
            id: item.id,
            type: "fill",
            source: item.id,
            paint: item.properties.customStyle && item.properties||{},
          });
    })
   
 
    this.map.setCenter([-73.935243, 40.730611]);
 
  };
}
export default EditOption;
