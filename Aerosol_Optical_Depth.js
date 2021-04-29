// Select the region of interest, this region can be selected by imports from the map in earth engine
var water = ee.Geometry.Polygon(
  [[[70.1456, 24.0454],
    [70.1458, 24.0454],
    [70.1458, 24.0456],
    [70.1456, 24.0456]]],
  null, false
);

// Select the satellite image 
var collection = ee.ImageCollection("MODIS/006/MCD19A2_GRANULES")
                  .select('Optical_Depth_047')
                  .filterBounds(water)
                  .filterDate('2019-10-01', '2019-12-31');


// select the color composite
var band_viz = {
  min: 0,
  max: 500,
  palette: ['black', 'cyan', 'green', 'yellow', 'orange','red']
};

// add AOD layer to map and Set map centre and zoom level
Map.addLayer(collection.mean(), band_viz, 'Oa02_radiance');
Map.setCenter(70.1456, 24.0454, 8);
var image = collection.first()
print(image)
Map.addLayer(image, band_viz, 'Oa02_radiance');
