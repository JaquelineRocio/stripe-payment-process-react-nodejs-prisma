import React, { useState } from "react";
import { createPaymentToken } from "../services/stripeService";
const productos = [
  {
    id: "basico",
    nombre: "Plan Básico",
    precio: 9.99,
    descripcion: "Perfecto para individuos",
  },
  {
    id: "pro",
    nombre: "Plan Pro",
    precio: 19.99,
    descripcion: "Ideal para equipos pequeños",
  },
  {
    id: "empresarial",
    nombre: "Plan Empresarial",
    precio: 49.99,
    descripcion: "Para grandes organizaciones",
  },
];

export default function PaymentCard() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(
    productos[0]
  );

  const [estaProcesando, setEstaProcesando] = useState(false);

  const manejarEnvio = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const token = await createPaymentToken();
    setEstaProcesando(false);

    if (token) {
      alert(`¡Pago procesado con éxito! Token: ${token}`);
    } else {
      alert("Error al procesar el pago.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4">Elige tu Plan</h1>
        <p className="text-gray-600 mb-6">
          Selecciona un plan y procede con el pago
        </p>

        <form onSubmit={manejarEnvio}>
          <div className="space-y-4 mb-6">
            {productos.map((producto) => (
              <label
                key={producto.id}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="producto"
                  value={producto.id}
                  checked={productoSeleccionado.id === producto.id}
                  onChange={() => setProductoSeleccionado(producto)}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="flex justify-between w-full">
                  <span className="font-medium">{producto.nombre}</span>
                  <span className="text-gray-600">
                    ${producto.precio.toFixed(2)}
                  </span>
                </span>
              </label>
            ))}
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label
                htmlFor="numero-tarjeta"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Número de Tarjeta
              </label>
              <input
                type="text"
                id="numero-tarjeta"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fecha-expiracion"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Fecha de Expiración
                </label>
                <input
                  type="text"
                  id="fecha-expiracion"
                  placeholder="MM/AA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="cvc"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={estaProcesando}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              estaProcesando
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {estaProcesando ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Procesando...
              </span>
            ) : (
              `Pagar $${productoSeleccionado.precio.toFixed(2)}`
            )}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Tu pago es seguro y está encriptado
        </p>
      </div>
    </div>
  );
}
