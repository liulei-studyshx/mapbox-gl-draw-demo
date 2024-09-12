# Mapbox MapBoxDraw React + Vite 
本demo封装mapbox-gl、mapbox-gl-draw实现了地图的初始化和标绘，实现了添加标绘时渲染特定样式的标绘，

```js
    neoMap.current = new Map({
      container: 'canvas'
    })
    //生成地图实例
     neoMap.current.on('load',()=>{
        console.log('组件地图加载完成');
        editMap.current = new EditMap(neoMap.current);
        //生成标会实例
       })

  
editMap.current.addDraw();
//生成指定样式的标绘图层

```
