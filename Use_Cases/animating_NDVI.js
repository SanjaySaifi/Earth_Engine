// define region of interest
var aoi = 
    /* color: #ffc82d */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[60.58952249439004, 38.45666877668383],
          [60.58952249439004, 4.799336341939884],
          [100.93131936939004, 4.799336341939884],
          [100.93131936939004, 38.45666877668383]]], null, false);
//  northern summer solstice hourly temp data
var image = ee.ImageCollection('MODIS/006/MOD13A2')
  .filterDate('2019-06-21', '2020-06-22')
  //.limit(24)
  .select('NDVI');


// Define arguments for animation function parameters.
var band = {
  dimensions: 768,
  region: aoi,
  framesPerSecond: 3,
  crs: 'EPSG:3857',
  min: 0,
  max: 9000.0,
  palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301']
};

//print animation to console
print(ui.Thumbnail(image, band));

// print URL to console.
print(image.getVideoThumbURL(band));



var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301']
var ndviVis = {min:0, max:1, palette: palette}

function createColorBar(titleText, palette, min, max) {
  // Legend Title
  var title = ui.Label({
    value: titleText, 
    style: {fontWeight: 'bold', textAlign: 'center', stretch: 'horizontal'}});

  // Colorbar
  var legend = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x20',
      format: 'png', 
      min: 0, max: 1,
      palette: palette},
    style: {stretch: 'horizontal', margin: '8px 8px', maxHeight: '40px'},
  });
  
  // Legend Labels
  var labels = ui.Panel({
    widgets: [
      ui.Label(min, {margin: '4px 10px',textAlign: 'left', stretch: 'horizontal'}),
      ui.Label((min+max)/2, {margin: '4px 20px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(max, {margin: '4px 10px',textAlign: 'right', stretch: 'horizontal'})],
    layout: ui.Panel.Layout.flow('horizontal')});
  
  // Create a panel with all 3 widgets
  var legendPanel = ui.Panel({
    widgets: [title, legend, labels],
    style: {position: 'bottom-center', padding: '8px 15px'}
  })
  return legendPanel
}
// Call the function to create a colorbar legend  
var colorBar = createColorBar('NDVI Values', palette, 0, 1)

print(colorBar)
















