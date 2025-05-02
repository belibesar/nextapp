export default function ProductCard({ name, details, brand, price }: { name: string; details: string; brand: string; price: string }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm text-gray-600">{details}</p>
        <p className="text-sm text-gray-600">{brand}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-sm">{price}</span>
          <button className="bg-[#0099cc] text-white text-xs px-3 py-1 rounded-md hover:bg-[#007aa3] transition-colors">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
