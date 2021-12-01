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
var filter=data.filterDate('2020-04-01','2020-04-15');

// Clip the Dataset to your region
var clip=filter.mean().clip(region);


// Apply visualization parameters
// Reflectance values for Sentinel-2 products range from 0 to 3000
// Bands 4,3,2 represent Red, Green, Blue respectively
var viz={
  min:0,
  max:3000,
  bands:['B8','B4','B3'],
};


var viz2={
  min:0,
  max:3000,
  bands:['B4','B3','B2'],
};



//Center map to your region
Map.centerObject(region,14);

// Add clipped and filtered image layer to map
Map.addLayer(clip,viz,"False Color Image");
Map.addLayer(clip,viz2,"True Color Image");








