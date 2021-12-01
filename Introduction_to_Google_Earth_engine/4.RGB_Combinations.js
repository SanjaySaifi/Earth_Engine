var region = 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[72.90982646224586, 19.09933022532271],
          [72.90982646224586, 19.032972275564244],
          [72.97591609237281, 19.032972275564244],
          [72.97591609237281, 19.09933022532271]]], null, false);
// Add dataset
var data=ee.ImageCollection("COPERNICUS/S2");

//Filter Dataset
var filter=data.filterDate('2020-01-01','2020-12-31')
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20));

// Clip the Dataset to your region
var clip=filter.mean().clip(region);


// Apply visualization parameters
// Reflectance values for Sentinel-2 products range from 0 to 3000
// Bands 4,3,2 represent Red, Green, Blue respectively
var viz={
  min:0,
  max:3000,
 //bands:['B4','B3','B2'],      //Natural colour: 4 3 2
 //bands:['B8','B4','B3'],      //False colour infrared: 8 4 3
 //bands:['B11','B8','B2'],      //Agriculture: 11 8 2
 //bands:['B12','B11','B8A'],    //Atmospheric penetration: 12 11 8A
 //bands:['B8','B11','B2'],      //Healthy vegetation: 8 11 2
 //bands:['B8','B11','B4'],      //Land/Water: 8 11 4
 //bands:['B12','B8','B3'],      //Natural colours with atmospheric removal: 12 8 3
 //bands:['B12','B8','B4'],      //Shortwave infrared: 12 8 4
 //bands:['B11','B8','B4'],      //Vegetation analysis: 11 8 4
 //bands:['B12','B11','B2'],      //Geology analysis: 12 11 2
 
};


//Center map to your region
Map.centerObject(region,14);

// Add clipped and filtered image layer to map
Map.addLayer(clip,viz,"True Color Image");



