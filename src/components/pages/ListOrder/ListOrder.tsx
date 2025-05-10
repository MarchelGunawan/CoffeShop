import { useEffect, useState } from "react"
import { getDetailOrder, getOrders, updateStatusOrder, deleteOrderList } from "../../../services/order.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [refetchOrder, setRefecthOrder] = useState(true);
    const [detailOrder, setDetailOrder] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    const [status, setStatus] = useState('COMPLETED');

    useEffect(() => {
        if(refetchOrder){
            const fetchOrder = async () => {
                const result = await getOrders();
                setOrders(result.data); 
            };
            fetchOrder();
            setRefecthOrder(false);
        }
    }, [refetchOrder]);

    const fetchDetailOrder = async (id: string) => {
        setIsLoadingDetail(true);
        const result = await getDetailOrder(id);
        const formattedCart = result.cart.map((item: any) => ({
            name: item.menuItem.name,
            quantity: item.quantity,
            notes: item.notes,
            image: item.menuItem.image_url,
            total: item.quantity * item.menuItem.price,
        }));
        setDetailOrder(formattedCart);
        setSelectedOrder(result);
        setIsLoadingDetail(false);
    }

    const updateComplete = async (id: string) => {
        const payload = {
            status
        }

        const result = await updateStatusOrder(id, payload);

        window.location.href = '/order';
    }

    const deleteOrder = async (id: string) => {
        const result = await deleteOrderList(id);
        
        window.location.href = '/order';
    }

    return (
        <>
            <div className="max-w-6xl mx-auto px-4 grid gap-4">
                {orders.map((order: any, index: number) => (
                    <div key={order.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="flex items-start space-x-4 flex-1">
                            <FontAwesomeIcon icon="fa-solid fa-circle-user" size="2xl" className="text-gray-500 mt-1 py-6" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{order.customer_name}</h3>
                                <p className="text-gray-600 text-sm">Table: {order.table_number}</p>
                                <p className="text-gray-600 text-sm">Total: ${order.total}</p>
                                <span
                                    className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                                        order.status === 'PROCESSING'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : order.status === 'COMPLETED'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {order.status}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0 flex space-x-2">
                            <button
                              onClick={() => {
                                fetchDetailOrder(order.id);
                                setSelectedOrder(order);
                                setShowModal(true);
                              }}
                              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                            >
                              Detail
                            </button>
                            {order.status === 'PROCESSING' && (
                                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm" onClick={() => updateComplete(order.id)
                                }>Success</button>
                            )}
                            {order.status === 'COMPLETED' && (
                                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm" onClick={() => deleteOrder(order.id)}>Delete</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {showModal && selectedOrder && (
            <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-4xl shadow-lg relative">
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
                                        value={selectedOrder.customer_name}
                                        disabled
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
                                        value={selectedOrder.table_number}
                                        disabled
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* ordered item */}
                            <div className="md:block hidden w-full">
                                <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2">
                                    {isLoadingDetail ? (
                                      Array.from({ length: 3 }).map((_, index) => (
                                        <div key={index} className="bg-gray-200 rounded-xl p-4 animate-pulse flex justify-between items-center">
                                          <div className="flex items-start space-x-4">
                                            <div className="w-16 h-16 bg-gray-300 rounded"></div>
                                            <div className="space-y-2">
                                              <div className="h-4 bg-gray-300 rounded w-40"></div>
                                              <div className="h-3 bg-gray-300 rounded w-24"></div>
                                            </div>
                                          </div>
                                          <div className="h-4 bg-gray-300 rounded w-12"></div>
                                        </div>
                                      ))
                                    ) : (
                                      detailOrder.map((item: any, index: number) => (
                                        <div key={index} className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center">
                                          <div className="flex items-start space-x-4">
                                            <img
                                              src={item.image}
                                              alt={item.name}
                                              className="w-16 h-16 object-cover rounded"
                                            />
                                            <div>
                                              <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                              {item.notes && (
                                                <p className="text-sm text-gray-500 italic">Note: {item.notes}</p>
                                              )}
                                            </div>
                                          </div>
                                          <p className="text-sm text-green-600 font-medium">
                                            ${item.total?.toLocaleString()}
                                          </p>
                                        </div>
                                      ))
                                    )}
                                </div>
                                <hr className="my-4 border-t border-gray-300" />
                                <div className="flex justify-between items-center text-lg font-semibold px-2">
                                    <span>Total</span>
                                    {isLoadingDetail ? (
                                      <div className="w-20 h-5 bg-gray-300 animate-pulse rounded"></div>
                                    ) : (
                                      <span>
                                        ${detailOrder.reduce((sum, item) => sum + (item.total || 0), 0).toLocaleString()}
                                      </span>
                                    )}
                                </div>
                                <div className="flex justify-end px-2 mt-4">
                                    <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                                    >
                                    Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}

export default ListOrder