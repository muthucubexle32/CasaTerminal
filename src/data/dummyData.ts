export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  seller: string;
  location: { lat: number; lng: number; address: string };
}

export interface Contractor {
  id: string;
  name: string;
  service: string;
  rating: number;
  image: string;
  location: { lat: number; lng: number; address: string };
}

export interface Rental {
  id: string;
  name: string;
  equipment: string;
  pricePerDay: number;
  image: string;
  location: { lat: number; lng: number; address: string };
}

// Delhi NCR base coordinates (approx)
const delhiLat = 28.6139;
const delhiLng = 77.2090;

export const dummyProducts: Product[] = [
  {
    id: 'p1',
    name: 'UltraTech Cement (50kg)',
    category: 'Cement',
    price: 380,
    image: 'https://via.placeholder.com/150?text=Cement',
    seller: 'ABC Traders',
    location: { lat: delhiLat + 0.01, lng: delhiLng + 0.005, address: 'Connaught Place, Delhi' },
  },
  {
    id: 'p2',
    name: 'TMT Steel Bar (12mm)',
    category: 'Steel',
    price: 72,
    image: 'https://via.placeholder.com/150?text=Steel',
    seller: 'Steel Mart',
    location: { lat: delhiLat - 0.02, lng: delhiLng + 0.01, address: 'Karol Bagh, Delhi' },
  },
  {
    id: 'p3',
    name: 'Red Brick (100 pcs)',
    category: 'Bricks',
    price: 600,
    image: 'https://via.placeholder.com/150?text=Bricks',
    seller: 'Brick House',
    location: { lat: delhiLat + 0.03, lng: delhiLng - 0.01, address: 'Lajpat Nagar, Delhi' },
  },
  {
    id: 'p4',
    name: 'Premium Tiles',
    category: 'Flooring',
    price: 120,
    image: 'https://via.placeholder.com/150?text=Tiles',
    seller: 'Tile World',
    location: { lat: delhiLat - 0.01, lng: delhiLng + 0.02, address: 'Saket, Delhi' },
  },
  {
    id: 'p5',
    name: 'Concrete Mixer',
    category: 'Equipment',
    price: 45000,
    image: 'https://via.placeholder.com/150?text=Mixer',
    seller: 'Tools Hub',
    location: { lat: delhiLat + 0.02, lng: delhiLng - 0.005, address: 'Dwarka, Delhi' },
  },
  {
    id: 'p6',
    name: 'Painting Services',
    category: 'Services',
    price: 25,
    image: 'https://via.placeholder.com/150?text=Painting',
    seller: 'PaintPro',
    location: { lat: delhiLat, lng: delhiLng + 0.01, address: 'Vasant Vihar, Delhi' },
  },
];

export const dummyContractors: Contractor[] = [
  {
    id: 'c1',
    name: 'Sharma Construction',
    service: 'Building & Renovation',
    rating: 4.8,
    image: 'https://via.placeholder.com/150?text=Contractor',
    location: { lat: delhiLat + 0.005, lng: delhiLng + 0.008, address: 'South Extension, Delhi' },
  },
  {
    id: 'c2',
    name: 'Elite Interiors',
    service: 'Interior Design',
    rating: 4.5,
    image: 'https://via.placeholder.com/150?text=Interior',
    location: { lat: delhiLat - 0.01, lng: delhiLng - 0.005, address: 'Vasant Kunj, Delhi' },
  },
  {
    id: 'c3',
    name: 'Shree Electricals',
    service: 'Electrical Work',
    rating: 4.7,
    image: 'https://via.placeholder.com/150?text=Electrician',
    location: { lat: delhiLat + 0.015, lng: delhiLng + 0.012, address: 'Rohini, Delhi' },
  },
  {
    id: 'c4',
    name: 'Plumb Experts',
    service: 'Plumbing Services',
    rating: 4.6,
    image: 'https://via.placeholder.com/150?text=Plumber',
    location: { lat: delhiLat - 0.005, lng: delhiLng + 0.003, address: 'Greater Kailash, Delhi' },
  },
  {
    id: 'c5',
    name: 'Arch Design Studio',
    service: 'Architecture',
    rating: 4.9,
    image: 'https://via.placeholder.com/150?text=Architect',
    location: { lat: delhiLat + 0.007, lng: delhiLng - 0.002, address: 'Gurgaon, Haryana' },
  },
  {
    id: 'c6',
    name: 'Safety First',
    service: 'Safety Audits',
    rating: 4.8,
    image: 'https://via.placeholder.com/150?text=Safety',
    location: { lat: delhiLat - 0.012, lng: delhiLng + 0.009, address: 'Noida, UP' },
  },
];

export const dummyRentals: Rental[] = [
  {
    id: 'r1',
    name: 'JCB 3DX',
    equipment: 'Excavator',
    pricePerDay: 7500,
    image: 'https://via.placeholder.com/150?text=JCB',
    location: { lat: delhiLat + 0.02, lng: delhiLng + 0.015, address: 'Okhla, Delhi' },
  },
  {
    id: 'r2',
    name: 'Concrete Mixer',
    equipment: 'Mixer',
    pricePerDay: 3500,
    image: 'https://via.placeholder.com/150?text=Mixer',
    location: { lat: delhiLat - 0.015, lng: delhiLng + 0.02, address: 'Rohini, Delhi' },
  },
  {
    id: 'r3',
    name: 'Tower Crane',
    equipment: 'Crane',
    pricePerDay: 15000,
    image: 'https://via.placeholder.com/150?text=Crane',
    location: { lat: delhiLat + 0.025, lng: delhiLng - 0.01, address: 'Faridabad, Haryana' },
  },
  {
    id: 'r4',
    name: 'Scaffolding Kit',
    equipment: 'Scaffolding',
    pricePerDay: 2000,
    image: 'https://via.placeholder.com/150?text=Scaffolding',
    location: { lat: delhiLat - 0.008, lng: delhiLng + 0.018, address: 'Ghaziabad, UP' },
  },
  {
    id: 'r5',
    name: 'Power Tools Set',
    equipment: 'Tools',
    pricePerDay: 1200,
    image: 'https://via.placeholder.com/150?text=Tools',
    location: { lat: delhiLat + 0.012, lng: delhiLng + 0.005, address: 'Connaught Place, Delhi' },
  },
  {
    id: 'r6',
    name: 'Tipper Truck',
    equipment: 'Haulage',
    pricePerDay: 8000,
    image: 'https://via.placeholder.com/150?text=Truck',
    location: { lat: delhiLat - 0.02, lng: delhiLng - 0.003, address: 'Mehrauli, Delhi' },
  },
];