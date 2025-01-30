import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CategoryDetailPage = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        // Fetch category details from the public directory
        const fetchCategory = async () => {
            try {
                const response = await fetch('/Categories.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const categoryData = data.find(cat => cat.id === categoryId);
                setCategory(categoryData);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };
        fetchCategory();
    }, [categoryId]);

    if (!category) return <div>Loading...</div>;

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-center mt-10">{category.name}</h1>
            <p className="text-center mb-6">{category.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.books.map((book) => (
                    <div key={book.id} className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
                        <img src={book.imageUrl} alt={book.title} className="w-full h-48 object-cover mb-4" />
                        <h2 className="text-lg font-medium text-center">{book.title}</h2>
                        <p className="text-center">{book.author}</p>
                        <p className="text-center">{book.summary}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryDetailPage;