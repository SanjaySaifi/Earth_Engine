//add region
var region = ee.FeatureCollection("users/ucanwhatsappme/India_Shapefile");

//add data
var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')
  .filterDate('2019-06-01', '2019-06-06');

//add visualization
var vis = {
  min: 0,
  max: 0.0002,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

//clip the data
var clip=collection.mean().clip(region);

//add layer to map
Map.addLayer(clip, vis, 'S5P N02');

//center map
Map.centerObject(region,5);


//apply legends
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}

// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});

// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});


//adding legend title
var legendTitle = ui.Label({
  value: 'Map Legend:Total vertical column of NO2',
  style: {fontWeight: 'bold'}
});

// Add the legendPanel to the map.
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);

//Analysis from map
/*
 coal consumption and industrial clusters like Sonbhadra-Singrauli in Madhya Pradesh 
 and Uttar Pradesh, Korba in Chattisgarh, Talcher in Odisha, Chandrapur in Maharashtra, 
 Mundra in Gujarat and Durgapur in West Bengal were highly polluting when it comes to NOx emissions

*/

