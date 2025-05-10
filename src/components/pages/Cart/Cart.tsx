import { useEffect, useState } from 'react';
import { getListOrder, setOrder } from '../../../services/order.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeOrderCart } from '../../../utils/ordercart';

const Cart = () => {
    const [orders, setOrders] = useState([]);
    const [refetchOrder, setRefecthOrder] = useState(true);
    const [customerName, setCustomerName] = useState('');
    const [tableNumber, setTableNumber] = useState('');

    useEffect(() => {
        if(refetchOrder){
            const fetchOrder = async () => {
                const result = await getListOrder();
                setOrders(result); 
            };
            fetchOrder();
            setRefecthOrder(false);
        }
    }, [refetchOrder]);

    // function place order
    const placeOrder = async () => {
      const payload = {
        customerName,
        tableNumber,
        cart: orders.map((order: any) => ({
          menuItemId: order.menuItemId,
          quantity: order.quantity,
          notes: order.notes || ''
        }))
      };
      const result = await setOrder(payload);
      removeOrderCart('Cart');
      window.location.href = '/order';
    }

    return (
        <div className="flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg w-3xl p-5">
                <div className="md:w-1/2 px-8">
                    <FontAwesomeIcon icon="fa-solid fa-mug-hot" className='mr-2 pb-1' size='xl' style={{color: '#ff0000'}}/><span className='font-bold text-xl'>Coffee </span><span className='font-bold text-[#D39A7B] text-xl'>Shop</span>
                    <div className="flex flex-col gap-4 mt-4">
                        <h3 className='font-bold text-lg'>Customer Name</h3>
                        <label htmlFor='customerName' className="p-2 rounded-xl border-thin bg-white" >
                            <input
                              className="w-full"
                              type='text'
                              name='customerName'
                              id='customerName'
                              placeholder='Customer Name'
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </label>
                        <h3 className='font-bold text-lg mt-2'>Table Number</h3>
                        <label htmlFor='tableNumber' className="p-2 rounded-xl border-thin bg-white" >
                            <input
                              className="w-full"
                              type='text'
                              name='tableNumber'
                              id='tableNumber'
                              placeholder='Table Number'
                              value={tableNumber}
                              onChange={(e) => setTableNumber(e.target.value)}
                            />
                        </label>
                    </div>
                </div>

                {/* ordered item */}
                <div className="md:block hidden w-full">
                  <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2">
                    {orders.length > 0 ? (
                      orders.map((order: any, index: number) => (
                        <div key={index} className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center">
                          <div className="flex items-start space-x-4">
                            <img
                              src={order.image}
                              alt={order.productName}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800">{order.productName}</h4>
                              <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
                              {order.notes && (
                                <p className="text-sm text-gray-500 italic">Note: {order.notes}</p>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-green-600 font-medium">
                            ${order.total?.toLocaleString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 text-sm mt-4">No items in the cart.</p>
                    )}
                  </div>
                  {orders.length > 0 && (
                    <>
                      <hr className="my-4 border-t border-gray-300" />
                      <div className="flex justify-between items-center text-lg font-semibold px-2">
                        <span>Total</span>
                        <span>
                          ${orders.reduce((sum, order) => sum + (order.total || 0), 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-end px-2 mt-4">
                        <button onClick={placeOrder} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-xl shadow transition duration-300">
                          Place Order
                        </button>
                      </div>
                    </>
                  )}
                </div>
            </div>
      </div>
    )
}

export default Cart