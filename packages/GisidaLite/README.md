# GisidLite

A simple `React` component that takes react-mapbox-gl configurations and outputs a map based on configurations provided.

## Why is this useful?

`GisidaLite` helps to keep code DRY - use it every time you want to render maps on a react app. The package aims to avoid duplication of efforts whilst saving time when building maps on the web.

A basic understanding of [react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl) terminologies is needed to use this library:

Package Configurations:
To get your map up and running. The following configurations are needed.

```js
interface GisidaLiteProps {
  reactMapboxGlMapFactoryUtilConfigs: FactoryParameters;
  mapConfigs: Props & Events;
  mapComponents: JSX.Element[];
  layers: JSX.Element[];
}
```

1. _reactMapboxGlMapFactoryUtilConfigs_ - [FactoryParameters](reactMapboxGlMapFactoryUtilConfigs) - Factory parameters for ReactMapboxGl method that returns a map component.
2. _mapConfigs_ - Component properties. The component takes map settings and event handlers as listed [here](https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md#component-properties)
3. _mapComponents_ - Custom Map components. Should be passed to the component as a list. More info on this can be found [here](https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md#zoomcontrol)
4. _layers_ - layers prop holds layers and associated sources. The prop expects a list. More info on Layers can be found on the links below
   - [sources](https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md#source)
   - [layer](https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md#layer)
   - [GeoJSONLayer](https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md#geojsonlayer)
