
import  { useEffect,useRef } from "react";
import Map from './NeoMap/index'
import EditMap from "./EditMap/index";
const NeoMap =()=> {
    const neoMap = useRef(null)
    const editMap = useRef(null)
    useEffect(() => {
        neoMap.current = new Map({
            container: 'canvas',
            center: [116.397428, 39.90923],
            zoom: 10,
            type:'gaode'
        })
        neoMap.current.on('load',()=>{
        console.log('组件地图加载完成');
        editMap.current = new EditMap(neoMap.current)
       })
    }, []);
    const changeLayer = () => {
        console.log("neoMap.current.changeLayer('baidu'): ", neoMap.current.getAllLayers('baidu'));
    }
    const addLayer = ()=>{
        neoMap.current.map.addSource('counties', {
            'type': 'vector',
            'url': 'mapbox://mapbox.82pkq93d'
        });
        neoMap.current.addLayer( {
            'id': 'counties',
            'type': 'fill',
            'source': 'counties',
            'source-layer': 'original',
            'paint': {
                'fill-outline-color': 'rgba(0,0,0,0.1)',
                'fill-color': 'rgba(0,0,0,0.1)'
            }
        })
    }
    const addDrawLayer = ()=>{
        editMap.current.addDraw()
    }
    const changeEdit = ()=>{
        editMap.current.edit.changeMode('draw_point');
        console.log(editMap.current)
    }
    return <div>
        <div id="canvas"></div>
        <button onClick={changeLayer} className="change-layer" >切换图层</button>
        <button onClick={addLayer} className="change-layer" style={{left:120}}>添加图层</button>
        <button onClick={addDrawLayer} className="change-layer" style={{left:200}}>添加绘制</button>
        <button onClick={changeEdit} className="change-layer" style={{left:280}}>切换编辑方式</button>
    </div>
}
export default NeoMap