export const fitBoundsAndRestrict = (msp, bounds) => {
  const boundsObj = new google.maps.LatLngBounds(
    new google.maps.LatLng(bounds.south, bounds.west),
    new google.maps.LatLng(bounds.north, bounds.east)
  );

  map.fitBounds(boundsObj);

  // Restringir los límites
  google.maps.event.addListener(map, "bounds_changed", () => {
    if (!boundsObj.contains(map.getCenter())) {
      map.setCenter(boundsObj.getCenter());
    }
  });
};
