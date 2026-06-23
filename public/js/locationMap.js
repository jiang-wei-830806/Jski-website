function GetMap() {
  // Map - 1
  let navigationBarMode = Microsoft.Maps.NavigationBarMode;
  let map1 = new Microsoft.Maps.Map('#locationMapOne', {
    enableClickableLogo: false,
    showCopyright: false,
    disableScrollWheelZoom: true,
    disableMapTypeSelectorMouseOver: true,
    disableBirdseye: true,
    navigationBarMode: navigationBarMode.compact,
    supportedMapTypes: [
      Microsoft.Maps.MapTypeId.road,
      Microsoft.Maps.MapTypeId.aerial,
    ],
  });
  map1.setView({
    center: new Microsoft.Maps.Location(36.987061, 138.822628),
    zoom: 8,
  });
  let pushpin1 = new Microsoft.Maps.Pushpin(map1.getCenter(), {
    title: '汤泽校',
    subTitle: '日本新潟县南鱼沼市舞子2056-108舞子滑雪场内',
    color: 'orange',
  });
  let layer1 = new Microsoft.Maps.Layer();
  layer1.add(pushpin1);
  map1.layers.insert(layer1);

  // Map - 2
  let map2 = new Microsoft.Maps.Map(document.querySelector('#locationMapTwo'), {
    enableClickableLogo: false,
    showCopyright: false,
    disableScrollWheelZoom: true,
    disableMapTypeSelectorMouseOver: true,
    disableBirdseye: true,
    navigationBarMode: navigationBarMode.compact,
    supportedMapTypes: [
      Microsoft.Maps.MapTypeId.road,
      Microsoft.Maps.MapTypeId.aerial,
    ],
  });
  map2.setView({
    center: new Microsoft.Maps.Location(36.74848, 137.86644),
    zoom: 8,
  });
  let pushpin2 = new Microsoft.Maps.Pushpin(map2.getCenter(), {
    title: '白马校',
    subTitle: '日本长野县北安云郡小谷村千国乙12840-1栂池高原滑雪场内',
    color: 'green',
  });
  let layer2 = new Microsoft.Maps.Layer();
  layer2.add(pushpin2);
  map2.layers.insert(layer2);
}
