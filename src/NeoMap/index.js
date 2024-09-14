/**
 * 创建地图
 */
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import {getStyle} from './mapStyle'
import OptionMap from './OptionMap';
/**
 * 初始化地图类
 * @params {Object} params
 * @returns 返回地图实例，地图相关的方法
*/
class NeoMap{
    constructor(params){
        this.params = params;
        this.isValidParam();
        this.map = null;
        mapboxgl.accessToken = params.accessToken ||'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg';
        this.initMap(params);
        return new OptionMap(this.map,this.params);
    }
    /**
     * 判断必要参数
     **/
    isValidParam(){
        if(!this.params.container){
            throw new Error("'container' is required")
        }
        if(this.params.type === 'gaode'){
            if(!this.params.titles){
                this.params.titles = ['https://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}&scl=3']
            }
        }
    }
 
    /**
     * 初始化地图
     * @params {Object} params
     **/
    initMap(params){
        this.map = new mapboxgl.Map({
            container: params.container ,
            style: getStyle(this.params.type),
            center: params.center || [120, 30],
            zoom: params.zoom || 16,
            accessToken: params.accessToken || this.accessToken,
            // projection: params.projection || 'MERCATOR',
            minZoom: params.minZoom || 1.5,
            maxZoom: params.maxZoom || 20.49,
            antialias: true
        })
    }
}
export default NeoMap;