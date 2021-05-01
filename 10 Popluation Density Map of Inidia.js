//POPULATION DENSITY MAP
//ADD MAP CENTRE AND ZOOM LEVEL
Map.setCenter(78,28, 5);

//ADD REGION OF INTEREST
var roi =ee.Geometry.Polygon(
        [[[68.72381366825171, 36.668322467407435],
          [68.72381366825171, 9.535630411689576],
          [96.49725116825171, 9.535630411689576],
          [96.49725116825171, 36.668322467407435]]], null, false);

// ADD DATA 
var image = ee.ImageCollection("WorldPop/GP/100m/pop");
// CLIP DATA TO ROI
var clip=image.mean().clip(roi);

// ADD COLOR PALETTE
var band = {
  bands: ['population'],
  min: 0.0,
  max: 50.0,
  palette: ['black','lightgreen','#30ff91','#18ff1a', 'green', 'white']
};

// ADD MAP TO CONSOLE
Map.addLayer(clip, band, 'Population Map of India ');
