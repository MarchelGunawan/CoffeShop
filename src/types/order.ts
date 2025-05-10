interface ICartItem {
  menuItemId: string;
  quantity: number;
  notes?: string;
}

interface IOrder {
  customerName: string;
  tableNumber: string;
  cart: ICartItem[];
}

interface IStatus {
  status: string;
}

export type { IOrder, ICartItem, IStatus };