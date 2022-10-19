import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon.png',
    iconSize: new L.Point(25, 41),
    iconAnchor: [25, 40],
    popupAnchor: [-12, -41],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
});

export { iconPerson };