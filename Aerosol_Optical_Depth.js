// Select the region of interest, this region can be selected by imports from the map in earth engine
var water = ee.Geometry.Polygon(
  [[[70.1456, 24.0454],
    [70.1458, 24.0454],
    [70.1458, 24.0456],
    [70.1456, 24.0456]]],
  null, false
);

// Select the satellite image 
var collection = ee.ImageCollection("COPERNICUS/S3/OLCI")
                  .select('Oa02_radiance')
                  .filterBounds(water)
                  .filterDate('2019-10-01', '2019-12-31');

// select the color composite
var band_viz = {
  min: 0,
  max: 500,
  palette: ['black', 'cyan', 'blue', 'yellow','red']
};

// add AOD layer to map
Map.addLayer(collection.mean(), band_viz, 'Oa02_radiance');

//Set map centre and zoom level
Map.setCenter(70.1456, 24.0454, 8);
