import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CategoryComponent = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from the public directory
        const fetchCategories = async () => {
            try {
                const response = await fetch('/Categories.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-center mt-10">Category Page</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <Link to={`/category/${category.id}`} key={category.id}>
                        <div className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
                            <h2 className="text-lg font-medium text-center">{category.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryComponent;