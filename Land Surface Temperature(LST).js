//add map centre
Map.setCenter(77, 28, 4);
//add region of interest
var roi =ee.Geometry.Polygon(
        [[[59.402645607468386, 36.721247854081604],
          [59.402645607468386, 6.293426486681035],
          [100.18389560746839, 6.293426486681035],
          [100.18389560746839, 36.721247854081604]]], null, false);
// add dataset
var dataset = ee.ImageCollection('MODIS/006/MYD11A1')
                  .filter(ee.Filter.date('2021-01-01', '2021-04-30'))
                  .select('LST_Day_1km')
                  ;
//Clip dataset to region of interest
var clip = dataset.mean().clip(roi);

//add palette colors                 
var band = {
  min: 13000.0,
  max: 16500.0,
  palette: [
    '#00007b','#0e50f6', '05fce0', '1cfe07', 'f2fc03', '#feaf11', '#f46f28','#fe4709',],};

//add LST map to console
Map.addLayer(
    clip, band,
    'Land Surface Temperature(LST)');
