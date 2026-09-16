const defaultProducts = [
  {
    id: 'BL-301',
    title: 'Royal Kanchipuram Silk Blouse',
    neckline: 'Sweetheart',
    fabric: 'Silk',
    occasion: 'Bridal',
    sleeve: 'Elbow',
    price: 1499,
    originalPrice: 2499,
    rating: 5,
    reviews: 48,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BL-302',
    title: 'Banarasi Brocade Boat Neck Blouse',
    neckline: 'Boat Neck',
    fabric: 'Banarasi',
    occasion: 'Wedding Guest',
    sleeve: 'Short',
    price: 2299,
    originalPrice: 3199,
    rating: 5,
    reviews: 34,
    badge: 'Zari Work',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BL-303',
    title: 'Georgette Sequence Work V-Neck',
    neckline: 'V-Neck',
    fabric: 'Georgette',
    occasion: 'Party',
    sleeve: 'Sleeveless',
    price: 1899,
    originalPrice: 2599,
    rating: 4,
    reviews: 21,
    badge: '',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BL-304',
    title: 'Printed Cotton Square Neck Blouse',
    neckline: 'Square Neck',
    fabric: 'Cotton',
    occasion: 'Casual',
    sleeve: 'Short',
    price: 1199,
    originalPrice: 1699,
    rating: 4,
    reviews: 19,
    badge: '',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BL-305',
    title: 'Chiffon High Neck Full Sleeve Blouse',
    neckline: 'High Neck',
    fabric: 'Chiffon',
    occasion: 'Office',
    sleeve: 'Full',
    price: 2799,
    originalPrice: 3499,
    rating: 5,
    reviews: 28,
    badge: 'Hand-Painted',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BL-306',
    title: 'Designer Halter Neck Backless Blouse',
    neckline: 'Halter',
    fabric: 'Designer',
    occasion: 'Reception',
    sleeve: 'Sleeveless',
    price: 3299,
    originalPrice: 4299,
    rating: 5,
    reviews: 41,
    badge: 'Couture',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BL-307',
    title: 'Silk Puff Sleeve Temple Blouse',
    neckline: 'Round Neck',
    fabric: 'Silk',
    occasion: 'Festive',
    sleeve: 'Puff',
    price: 1950,
    originalPrice: 2600,
    rating: 4,
    reviews: 17,
    badge: '',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BL-308',
    title: 'Heavy Maggam Work Keyhole Blouse',
    neckline: 'Keyhole',
    fabric: 'Banarasi',
    occasion: 'Bridal',
    sleeve: 'Elbow',
    price: 4299,
    originalPrice: 5999,
    rating: 5,
    reviews: 62,
    badge: 'Bridal',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BL-309',
    title: 'Sweetheart Bell Sleeve Blouse',
    neckline: 'Sweetheart',
    fabric: 'Georgette',
    occasion: 'Party',
    sleeve: 'Bell',
    price: 2199,
    originalPrice: 2999,
    rating: 4,
    reviews: 14,
    badge: '',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BL-310',
    title: 'Ikat Cotton V-Neck Office Blouse',
    neckline: 'V-Neck',
    fabric: 'Cotton',
    occasion: 'Office',
    sleeve: 'Short',
    price: 1299,
    originalPrice: 1799,
    rating: 5,
    reviews: 31,
    badge: '',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BL-311',
    title: 'Chiffon Cape Sleeve Blouse',
    neckline: 'Boat Neck',
    fabric: 'Chiffon',
    occasion: 'Festive',
    sleeve: 'Cape',
    price: 2699,
    originalPrice: 3499,
    rating: 5,
    reviews: 25,
    badge: 'Cape Style',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BL-312',
    title: 'Raw Silk Full Sleeve Designer Blouse',
    neckline: 'Round Neck',
    fabric: 'Designer',
    occasion: 'Wedding Guest',
    sleeve: 'Full',
    price: 3499,
    originalPrice: 4899,
    rating: 5,
    reviews: 39,
    badge: 'Luxury',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80'
  }
];

// Initialize localStorage if empty
if (!localStorage.getItem('blouseProducts')) {
  localStorage.setItem('blouseProducts', JSON.stringify(defaultProducts));
}

// Helper to get products
function getProducts() {
  return JSON.parse(localStorage.getItem('blouseProducts')) || [];
}

// Helper to save products
function saveProducts(products) {
  localStorage.setItem('blouseProducts', JSON.stringify(products));
}
