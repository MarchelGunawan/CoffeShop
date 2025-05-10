const storage = typeof window === 'undefined' ? null : localStorage;

const getOrderCartItem = (key: string) => JSON.parse(storage?.getItem(key) || '{}');

const setOrderCartItem = (key: string, value: []) => storage?.setItem(key, JSON.stringify(value));

const removeOrderCart = (key: string) => storage?.removeItem(key);

export {getOrderCartItem, setOrderCartItem, removeOrderCart}