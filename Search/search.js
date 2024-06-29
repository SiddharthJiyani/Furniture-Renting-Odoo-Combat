import { useEffect, useState } from 'react';

const entries = [
  {
      "furniture_id": 1,
      "name": "Modern Chair",
      "description": "A stylish modern chair perfect for any living room.",
      "category_id": 2,
      "rental_price": 49.99,
      "availability_status": true,
      "location": "Living Room",
      "image_url": "https://example.com/images/modern-chair.jpg",
      "created_at": "2024-06-01T10:00:00Z",
      "updated_at": "2024-06-01T10:00:00Z"
  },
  {
      "furniture_id": 2,
      "name": "Office Desk",
      "description": "A spacious office desk with plenty of storage.",
      "category_id": 3,
      "rental_price": 120.00,
      "availability_status": true,
      "location": "Office",
      "image_url": "https://example.com/images/office-desk.jpg",
      "created_at": "2024-06-02T11:00:00Z",
      "updated_at": "2024-06-02T11:00:00Z"
  },
  {
      "furniture_id": 3,
      "name": "Comfortable Sofa",
      "description": "A comfortable sofa that seats three people.",
      "category_id": 1,
      "rental_price": 199.99,
      "availability_status": false,
      "location": "Living Room",
      "image_url": "https://example.com/images/comfortable-sofa.jpg",
      "created_at": "2024-06-03T12:00:00Z",
      "updated_at": "2024-06-03T12:00:00Z"
  },
  {
      "furniture_id": 4,
      "name": "Dining Table",
      "description": "A large dining table with a modern design.",
      "category_id": 5,
      "rental_price": 150.00,
      "availability_status": true,
      "location": "Dining Room",
      "image_url": "https://example.com/images/dining-table.jpg",
      "created_at": "2024-06-04T13:00:00Z",
      "updated_at": "2024-06-04T13:00:00Z"
  },
  {
      "furniture_id": 5,
      "name": "Bedroom Nightstand",
      "description": "A small nightstand with two drawers.",
      "category_id": 5,
      "rental_price": 30.00,
      "availability_status": true,
      "location": "Bedroom",
      "image_url": "https://example.com/images/nightstand.jpg",
      "created_at": "2024-06-05T14:00:00Z",
      "updated_at": "2024-06-05T14:00:00Z"
  }
]
const [search, setSearch] = useState('')
const [category, setCategory] = useState('')
const [filteredEntries, setFilteredEntries] = useState(entries)

 useEffect(()=>{
      const filtered = entries.filter((entry)=>{
     return  (entry.name.toString().toLowerCase().includes(search.toString().toLowerCase().trim())  || entry.location.toString().toLowerCase().includes(search.toString().toLowerCase().trim()) || entry.category_id.toString().includes(search.toString().trim())) && entry.availability_status === true
 
    })
    setFilteredEntries(filtered)
    },[search, category])

//we pass the Filtered Entries in Feed component
  
