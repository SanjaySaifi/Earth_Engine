// BAND READING OF SENTINEL DATA AND TRUE COLOR COMPOSITE VISUALISATION
//Navigate to area of interest
Map.setCenter(77.6,28.5, 8);

//Set target location 
var poly = ee.Geometry.Point(77.6,28.5);
 
// Load the Sentinel 2 image collection by searching Sentinel in search bar
var sent2 =ee.ImageCollection("COPERNICUS/S2")
            .filterBounds(poly)
            ;

// Print image 
print(sent2);


//Add true color image map
var image = ee.Image(sent2

// We will then include a filter to get only images in the date range we are interested in
.filterDate("2019-01-01", "2019-12-31")

// Sort the collection by meta data, as here cloud coverage is used
.sort("CLOUD_COVERAGE_ASSESSMENT")

// First image of sorted collection is used
.first());

// Add image to console
print("A Sentinel-2 scene:", image);

// band_4=Red, band_3=Green,Band_2=Blue
var trueColour = {
    bands: ["B4", "B3", "B2"],
    min: 0,
    max: 3000
    };

// Add true color image to map console
Map.addLayer(image, trueColour, "True-colour image");













