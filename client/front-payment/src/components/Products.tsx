import { useState } from "react";
import { ShoppingCart, Star, X, Plus, Minus, CreditCard } from "lucide-react";
import PaymentCard from "./PaymentCard";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  soldCount: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Zenbook Pro 14 Duo OLED (UX8402, 11th Gen Intel)",
    price: 1854,
    originalPrice: 1974,
    rating: 4.5,
    soldCount: 120,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Vivobook S 16X OLED (M5602, AMD Ryzen 5000)",
    price: 1439,
    originalPrice: 1570,
    rating: 4.4,
    soldCount: 50,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Vivobook 13 Slate OLED (T3300, 11th Gen Intel)",
    price: 575,
    originalPrice: 680,
    rating: 4.3,
    soldCount: 24,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Zenbook Pro 16X OLED (UX7602, 11th Gen Intel)",
    price: 2237,
    originalPrice: 2440,
    rating: 4.7,
    soldCount: 80,
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function Component() {
  const [cartItems, setCartItems] = useState<
    (Product & { quantity: number })[]
  >([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Tienda de Laptops
            </h1>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={`Ver carrito (${cartItems.length} productos)`}
            >
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h2
                  className="mt-4 font-semibold text-gray-900 truncate"
                  title={product.name}
                >
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="flex"
                    aria-label={`Calificación: ${product.rating} de 5 estrellas`}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 stroke-yellow-400"
                            : "fill-gray-200 stroke-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    Vendidos {product.soldCount}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Cart Slide-over */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div
            className="absolute inset-y-0 right-0 max-w-lg w-full bg-white shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
          >
            <div className="flex flex-col h-full">
              <header className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Carrito de Compras
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Cerrar carrito"
                >
                  <X className="h-5 w-5" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Tu carrito está vacío
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 bg-white p-4 rounded-lg border"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h3
                            className="font-medium text-gray-900 truncate"
                            title={item.name}
                          >
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                              aria-label="Reducir cantidad"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-600 hover:text-red-700 transition-colors mt-1"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t p-4 bg-gray-50">
                  <div className="flex justify-between text-lg font-semibold text-gray-900 mb-4">
                    <span>Total:</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsPaymentModalOpen(true);
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Proceder al pago
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Formulario de pago"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Información de Pago
                </h2>
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Cerrar formulario de pago"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <PaymentCard />
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900 mb-4">
                    <span>Total a pagar:</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
