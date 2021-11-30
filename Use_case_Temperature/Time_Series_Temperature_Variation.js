//adding region of interest
var region = ee.FeatureCollection("users/ucanwhatsappme/India_Shapefile");
//adding and  filtering the data for date
var dataset = ee.ImageCollection('MODIS/006/MOD11A1')
                  .filter(ee.Filter.date('2018-01-01', '2018-12-31'));

// band selection
var ndvi = dataset.select('LST_Day_1km');

//visualization parameters
var clip=ndvi.mean().clip(region)
var vis = {
  min: 13000.0,
  max: 16500.0,
  palette: [
     '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
};

//center the map
Map.centerObject(region,7);

//Add layer to map
Map.addLayer(clip, vis, 'NDVI');



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

var a='°C';
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label((vis.min)*0.02-273, {margin: '4px 8px'}),
    ui.Label(
        (a),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label((vis.max)*0.02-273, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});

//adding legend title
var legendTitle = ui.Label({
  value: 'Map Legend:	Terra Land Surface Temperature in °C',
  style: {fontWeight: 'bold'}
});

// Add the legendPanel to the map.
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);




///////////////time series

var start = ee.Date('2018-01-01');
var dateRange = ee.DateRange(start, start.advance(1, 'year'));

// Filter the LST collection to include only images from time frame and select day time temperature band

var modLSTday = dataset.filterDate(dateRange).select('LST_Day_1km');

// Scale to Kelvin and convert to Celsius, set image acquisition time.
var modC = modLSTday.map(function(image) {
  return image
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(image, ['system:time_start']);
});



// Chart the time-series
var temp_trend = ui.Chart.image.series({
  imageCollection: modC,
  region: roi,
  reducer: ee.Reducer.median(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
    lineWidth: 1,
    pointSize: 3,
    trendlines: {0: {
        color: 'CC0000'
      }},
     title: 'LST  Time Series',
     vAxis: {title: 'LST °Celsius'}});
print(temp_trend);




