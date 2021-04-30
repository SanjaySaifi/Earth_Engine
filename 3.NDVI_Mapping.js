// NDVI Mapping
//Navigate to area of interest
Map.setCenter(77.6,28.5, 12);

//Set target location 
var poly = ee.Geometry.Point(77.6,28.5);
 
// Load the Sentinel 2 image collection by searching Sentinel in search bar
var sent2 =ee.ImageCollection("COPERNICUS/S2")
            .filterBounds(poly)
            ;

// Print image 
print(sent2);

//Add  image map
var map = ee.Image(sent2
.filterDate("2019-01-01", "2019-12-31")
.sort("CLOUD_COVERAGE_ASSESSMENT")
.first());

print("A Sentinel-2 scene:", map);

//  NDVI  equation
var NDVI = map.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: map.select("B4"),   
      NIR: map.select("B8"),   
      BLUE: map.select("B2")   
    });

var bandV = {min: 0,max: 1,palette: [ 'blue', 'yellow','green', 'darkgreen','black']};
// Add NDVI image to map console
Map.addLayer(NDVI,bandV , "NDVI");










