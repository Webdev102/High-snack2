# Snackbar High Snack - API Contracts & Backend Implementation

## Overview
Full-stack snackbar website met online bestel systeem, dynamische reviews, en contact functionaliteit.

## Frontend Status (✅ Voltooid met Mock Data)
- **Home Page**: Hero, featured items, reviews preview - WERKEND
- **Menu Page**: Categoriefilters, winkelwagen functionaliteit - WERKEND met localStorage
- **About Page**: Restaurantinformatie, features - WERKEND
- **Location Page**: Adres, openingstijden, Google Maps placeholder - WERKEND
- **Reviews Page**: Review lijst, rating statistieken, review formulier - WERKEND met local state
- **Contact Page**: Contact informatie, contactformulier - WERKEND met toast
- **Order Page**: Bestelformulier, winkelwagen overzicht, bezorgwijze - WERKEND met localStorage

## Mock Data Locatie
**File**: `/app/frontend/src/data/mock.js`
- Menu items (12 items)
- Reviews (5 reviews)
- Restaurant info
- Categories

## Backend Implementatie Nodig

### 1. Database Models (MongoDB)

#### Menu Item Model
```python
{
    "_id": ObjectId,
    "name": str,
    "category": str,  # Friet, Burgers, Wraps, Chicken, Snacks
    "description": str,
    "price": float,
    "image": str,
    "available": bool,
    "created_at": datetime
}
```

#### Review Model
```python
{
    "_id": ObjectId,
    "name": str,
    "rating": int,  # 1-5
    "comment": str,
    "date": datetime,
    "approved": bool  # Optional moderation
}
```

#### Order Model
```python
{
    "_id": ObjectId,
    "order_number": str,  # Auto-generated
    "customer": {
        "name": str,
        "email": str,
        "phone": str,
        "address": str  # Optional for pickup
    },
    "items": [
        {
            "menu_item_id": ObjectId,
            "name": str,
            "price": float,
            "quantity": int
        }
    ],
    "delivery_type": str,  # "delivery" or "pickup"
    "subtotal": float,
    "delivery_fee": float,
    "total": float,
    "notes": str,
    "status": str,  # "pending", "confirmed", "preparing", "delivered", "completed"
    "created_at": datetime
}
```

#### Contact Message Model
```python
{
    "_id": ObjectId,
    "name": str,
    "email": str,
    "subject": str,
    "message": str,
    "created_at": datetime,
    "read": bool
}
```

### 2. API Endpoints

#### Menu Endpoints
- `GET /api/menu` - Haal alle menu items op
- `GET /api/menu/{category}` - Haal items per categorie op
- `POST /api/menu` - Admin: Voeg nieuw item toe
- `PUT /api/menu/{id}` - Admin: Update item
- `DELETE /api/menu/{id}` - Admin: Verwijder item

#### Review Endpoints
- `GET /api/reviews` - Haal alle goedgekeurde reviews op
- `POST /api/reviews` - Plaats nieuwe review
- `GET /api/reviews/stats` - Haal review statistieken op (avg rating, count per sterren)

#### Order Endpoints
- `POST /api/orders` - Plaats nieuwe bestelling
- `GET /api/orders/{order_number}` - Haal specifieke bestelling op
- `GET /api/orders` - Admin: Haal alle bestellingen op
- `PUT /api/orders/{id}/status` - Admin: Update bestelling status

#### Contact Endpoints
- `POST /api/contact` - Verstuur contactformulier
- `GET /api/contact` - Admin: Haal alle berichten op

### 3. Frontend Integratie

#### Menu Page (`/app/frontend/src/pages/Menu.jsx`)
**Vervang**:
```javascript
import { menuItems, categories } from '../data/mock';
```
**Met**:
```javascript
const [menuItems, setMenuItems] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchMenuItems();
}, []);

const fetchMenuItems = async () => {
  try {
    const response = await axios.get(`${API}/menu`);
    setMenuItems(response.data);
  } catch (error) {
    console.error('Error fetching menu:', error);
  } finally {
    setLoading(false);
  }
};
```

#### Reviews Page (`/app/frontend/src/pages/Reviews.jsx`)
**Vervang mock reviews & handleSubmit**:
```javascript
const [reviews, setReviews] = useState([]);

useEffect(() => {
  fetchReviews();
}, []);

const fetchReviews = async () => {
  const response = await axios.get(`${API}/reviews`);
  setReviews(response.data);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  await axios.post(`${API}/reviews`, formData);
  fetchReviews();
  // Reset form...
};
```

#### Order Page (`/app/frontend/src/pages/Order.jsx`)
**Update handleSubmit**:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const orderData = {
    customer: {
      name: orderDetails.name,
      email: orderDetails.email,
      phone: orderDetails.phone,
      address: orderDetails.address
    },
    items: cart.map(item => ({
      menu_item_id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    delivery_type: orderDetails.deliveryType,
    subtotal,
    delivery_fee: deliveryFee,
    total,
    notes: orderDetails.notes
  };

  const response = await axios.post(`${API}/orders`, orderData);
  
  toast({
    title: "Bestelling geplaatst!",
    description: `Ordernummer: ${response.data.order_number}`,
  });
  
  // Clear cart...
};
```

#### Contact Page (`/app/frontend/src/pages/Contact.jsx`)
**Update handleSubmit**:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  await axios.post(`${API}/contact`, formData);
  toast({
    title: "Bericht verzonden!",
    description: "We nemen zo snel mogelijk contact met je op.",
  });
  // Reset form...
};
```

### 4. Environment Variables
Geen nieuwe environment variables nodig - gebruik bestaande:
- `REACT_APP_BACKEND_URL` (frontend)
- `MONGO_URL` (backend)

### 5. Backend Validation
- Email validatie voor orders en contact
- Phone number validatie (Nederlands formaat)
- Rating validatie (1-5)
- Required fields check
- Price calculations verification

### 6. Response Formats

#### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

#### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": { ... }
}
```

### 7. Optional Features (Toekomst)
- Email notificaties voor bestellingen
- Admin dashboard voor order management
- Payment gateway integratie
- Real-time order tracking
- Review moderatie systeem
- Menu item voorraad tracking

## Testplan Backend
1. Test alle CRUD operations voor menu
2. Test review submission en retrieval
3. Test order creation met verschillende bezorgwijzen
4. Test contact form submission
5. Validatie testen (invalid data)
6. Error handling testen (database errors, etc.)

## Notes
- Alle dates in UTC opslaan
- Review moderation is optioneel (can be added later)
- Order numbers: gebruik timestamp + random (bijv. HS20250812-1234)
- Images blijven URLs (no upload functionality needed yet)
