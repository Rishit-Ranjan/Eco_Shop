import { CATEGORIES } from '../data/mockData';
import { Link } from 'react-router-dom';
export default function Categories() {
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-semibold text-sage-dark mb-4">Shop by Categories</h1>
        <p className="text-xl text-natural-text/70 max-w-2xl mx-auto">
          Explore our wide range of products categorized for your convenience. Experience the best quality and service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {CATEGORIES.map((category) => (<div key={category.id} id={category.id} className="bg-[#FCFCFA] rounded-[40px] soft-shadow hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-natural-border flex flex-col">
            <Link to={`/products`} state={{ categoryId: category.id }} className="block aspect-[4/3] overflow-hidden">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
            </Link>
            <div className="p-8 flex flex-col flex-grow text-center">
              <h2 className="text-2xl font-serif font-semibold text-sage-dark mb-3">{category.name}</h2>
              <p className="text-natural-text/80 mb-6 flex-grow">{category.description}</p>
              <Link to={`/products`} state={{ categoryId: category.id }} className="inline-block bg-sage-leaf/10 text-sage-leaf-hover hover:bg-sage-leaf hover:text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Browse {category.name}
              </Link>
            </div>
          </div>))}
      </div>
    </div>);
}
