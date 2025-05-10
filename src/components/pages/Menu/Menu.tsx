import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { environment } from "../../../constants/environment";
import type { IMenu } from "../../../types/menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setOrderCartItem } from "../../../utils/ordercart";
import { useNavigate } from "react-router-dom";

const SkeletonCard = () => (
  <div className="flex items-center justify-between bg-white rounded-xl shadow-md overflow-hidden w-full max-w-4xl mb-4 p-4 animate-pulse">
    {/* Image placeholder */}
    <div className="w-32 h-32 bg-gray-300 rounded-lg"></div>

    {/* Text placeholder */}
    <div className="flex-1 px-6 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>

    {/* Button group placeholder */}
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      <div className="w-6 h-4 bg-gray-300 rounded"></div>
      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
    </div>
  </div>
);

const Menu = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState<Record<string,number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const increment = (id: string, priceItem: number) => {
    setCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setTotal(prev => ({ ...prev, [id]: (prev[id] || 0) + priceItem}))
  };
  const decrement = (id: string, priceItem: number) => {
    setCounts(prev => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
    setTotal(prev => ({ ...prev, [id]: Math.max((prev[id] || 0) - priceItem, 0) }))
  };

  const checkOutItems = () => {
    if (!data?.data) return;
    const cartItems = data.data
      .filter((item: IMenu) => counts[item.id] > 0)
      .map((item: IMenu) => ({
        menuItemId: item.id,
        productName: item.name,
        quantity: counts[item.id],
        image: item.image_url,
        notes: notes[item.id] || '',
        total: total[item.id]
      }));

    setOrderCartItem('Cart', cartItems);
    return navigate('/cart');
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dataMenu'],
    queryFn: async () => {
      return await fetch(`${environment.API_URL}/menu`).then(
        (response) => response.json(),
      );
    },
  });
  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-full max-w-4xl flex justify-end mb-4">
        <button className="text-base text-white bg-green-500 rounded-xl px-3 py-2 hover:bg-green-600" onClick={() => checkOutItems()}>
          <FontAwesomeIcon icon="fa-solid fa-credit-card" className="mx-2" />Check out
        </button>
      </div>
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      ) : (
        data?.data.map((item: IMenu) => {
          const itemTotal = (counts[item.id] || 0) * item.price;
          return (
            <>
              <div key={item.id} className="flex items-center justify-between bg-white rounded-xl shadow-md overflow-htotalden w-full max-w-4xl mb-4 p-4">
                <img
                  className="w-32 h-32 object-cover rounded-lg"
                  src={item.image_url}
                  alt={item.name}
                />
                <div className="flex-1 px-6">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600"> Category: {item.category}</p>
                  <p className="text-gray-600 text-sm"> {item.description}</p>
                  <p className="text-black-500 font-bold">$ {item.price.toLocaleString()}</p>
                  {itemTotal > 0 && (
                    <p className="text-sm text-green-600 font-medium mt-1">
                      Total: ${itemTotal.toLocaleString()}
                    </p>
                  )}
                  <textarea
                    className="mt-2 w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Add a note..."
                    value={notes[item.id] || ''}
                    onChange={(e) =>
                      setNotes(prev => ({ ...prev, [item.id]: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decrement(item.id, item.price)}
                    className="w-8 h-8 bg-gray-200 rounded-full text-xl font-bold text-gray-700 hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{counts[item.id] || 0}</span>
                  <button
                    onClick={() => increment(item.id, item.price)}
                    className="w-8 h-8 bg-gray-200 rounded-full text-xl font-bold text-gray-700 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </>
          )
        })
      )}
    </div>
  );
}

export default Menu