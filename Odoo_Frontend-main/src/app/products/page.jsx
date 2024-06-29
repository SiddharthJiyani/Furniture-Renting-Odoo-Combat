'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Ban } from 'lucide-react';
import Search from './Search';

const Products = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]); // Separate state for products
    const [filteredEntries, setFilteredEntries] = useState([]); // Separate state for filtered entries
    const [price, setPrice] = useState(50);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://furniture-renting-odoo-combat.onrender.com/api/furniture`);
                console.log(response.data.furniture);
                setProducts(response.data.furniture); // Set products fetched from API
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Perform filtering when products or filter criteria change
        const filtered = products.filter((entry) => (
            entry.name.toString().toLowerCase().includes(search.toString().toLowerCase().trim())
            || entry.location.toString().toLowerCase().includes(search.toString().toLowerCase().trim())
            || entry.categoryId.toString().includes(search.toString().trim())
        ) && entry.availabilityStatus === true && entry.rentalPrice <= price);

        setFilteredEntries(filtered); // Update filtered entries state
    }, [search, category, price, products]); // Depend on products, not filteredEntries

    return (
        <>
            <Search setSearch={setSearch} search={search} setPrice={setPrice} price={price} />
            <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                {filteredEntries.map((product) => (
                    <div key={product._id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" onClick={() => router.push(`/product/${product._id}`)}>
                        <a href="#">
                            <img src={product.imageUrl} alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                            <div className="px-4 py-3 w-72">
                                <span className="text-gray-400 mr-3 uppercase text-xs">{product.categoryId}</span>
                                <p className="text-lg font-bold text-black truncate block capitalize">{product.name}</p>
                                <div className="flex items-center">
                                    <p className="text-lg font-semibold text-black cursor-auto my-3">${0.9 * product.rentalPrice}</p>
                                    <del>
                                        <p className="text-sm text-gray-600 cursor-auto ml-2">${product.rentalPrice}</p>
                                    </del>
                                    {product.availabilityStatus ? (
                                        <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                        </svg></div>
                                    ) : <div className="ml-auto"><Ban /></div>}
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Products;
