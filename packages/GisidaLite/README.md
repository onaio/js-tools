# GisidaLite

## Map

A simple `React` component that takes react-mapbox-gl configurations and outputs a map based on configurations provided.

### Why is this useful?

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

## Legend

A simple `React` component that takes an object of color, width and label as props then outputs a map legend.

### Usage

To get the legend to work, the following props should be provided

```js
interface LegendBlock {
  color: string;
  fillWidth: string;
  label: string;
}
interface LegendProps {
  legendData: LegendBlock[];
  legendCreditText?: string;
}
```

_legendData_ - array of objects that contain color, block width and label that will be printed on every block.

_legendCreditText_ - optional string that is rendered below the legend.

The legend builds the total legendBlocks based on the legendData e.g

```js
[
  {
    color: '#000'
    fillWidth: '20';
    label: '0';
  },
  {
    color: '#fff'
    fillWidth: '20';
    label: '1-3';
  }
]
```

will load 2 blocks with labels and width as provided.
