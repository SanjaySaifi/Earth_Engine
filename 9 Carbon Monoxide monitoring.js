// Near Real-Time Carbon Monoxide
//ADD MAP CENTRE
Map.setCenter(78, 28, 4);

//ADD REGION OF INTEREST
var roi =ee.Geometry.Polygon(
        [[[67.77668534694449, 35.864638355238114],
          [67.77668534694449, 8.725016964416712],
          [95.90168534694448, 8.725016964416712],
          [95.90168534694448, 35.864638355238114]]], null, false);

//ADD DATASET
var image = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2021-01-01', '2021-01-30');
//CLIP DATASET TO ROI
var clip= image.mean().clip(roi)

//ADD PALETTE COLORS
var band = {
  min: 0,
  max: 0.05,
  palette: ['040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003']
};
//ADD MAP TO CONSOLE
Map.addLayer(clip, band,'CO');

