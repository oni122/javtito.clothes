import React, { useMemo, useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  size: string;
  color: string;
  image: string;
  stock: number;
  featured?: boolean;
};

const initialProducts: Product[] = [
  {
    id: 'set-lila',
    name: 'Conjunto Lila Corta',
    description: 'Conjunto en tela acanalada con elasticidad y corte deportivo.',
    price: 15990,
    size: 'S-M',
    color: 'Lavanda',
    image:
      'https://images.unsplash.com/photo-1496747611180-206a5c8c46b2?auto=format&fit=crop&w=900&q=80',
    stock: 12,
    featured: true,
  },
  {
    id: 'set-tierra',
    name: 'Conjunto Tierra',
    description: 'Top + short en tono tierra, ideal para entrenamiento o streetwear.',
    price: 16990,
    size: 'M-L',
    color: 'Café',
    image:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    stock: 9,
  },
  {
    id: 'mono-choco',
    name: 'Enterito Chocolate',
    description: 'Enterito seamless que estiliza la figura con soporte suave.',
    price: 18990,
    size: 'S-M',
    color: 'Chocolate',
    image:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80&sat=-30',
    stock: 7,
  },
  {
    id: 'vestido-blanco',
    name: 'Vestido Minimal Blanco',
    description: 'Vestido largo con abertura lateral y tejido fresco para verano.',
    price: 21990,
    size: 'S-M',
    color: 'Blanco',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    stock: 5,
  },
];

const currency = (value: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

const emptyForm: Product = {
  id: '',
  name: '',
  description: '',
  price: 0,
  size: '',
  color: '',
  image: '',
  stock: 0,
};

export function CommerceDashboard() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState('');
  const [newProduct, setNewProduct] = useState<Product>(emptyForm);
  const [selectedId, setSelectedId] = useState<string>(initialProducts[0].id);
  const [stockToAdd, setStockToAdd] = useState(5);

  const filteredProducts = useMemo(() => {
    if (!filter) return products;
    return products.filter((p) =>
      `${p.name} ${p.color} ${p.description}`.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, products]);

  const warehouseTotals = useMemo(
    () =>
      products.reduce(
        (acc, item) => {
          acc.total += item.stock;
          acc.value += item.stock * item.price;
          return acc;
        },
        { total: 0, value: 0 }
      ),
    [products]
  );

  const updateStock = (id: string, change: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, stock: Math.max(0, product.stock + change) }
          : product
      )
    );
  };

  const addToCart = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product || product.stock <= 0) return;
    updateStock(id, -1);
  };

  const handleAddProduct = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newProduct.name || !newProduct.image) return;
    const id = newProduct.id || newProduct.name.toLowerCase().replace(/\s+/g, '-');
    const productToAdd = { ...newProduct, id };
    setProducts((prev) => [productToAdd, ...prev]);
    setNewProduct(emptyForm);
    setSelectedId(productToAdd.id);
  };

  const selectedProduct = products.find((p) => p.id === selectedId) ?? products[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <section className="card-surface px-6 py-6 lg:px-8 lg:py-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">Tienda</p>
            <h2 className="font-display text-3xl text-ink">Colección activa</h2>
            <p className="text-sm text-gray-500">Stock en tiempo real conectado a bodega.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              className="w-full rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/60"
              placeholder="Buscar color, talla o estilo"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-cocoa shadow-sm">
              <span>En bodega</span>
              <span className="rounded-full bg-sand px-2 py-0.5 text-ink">{warehouseTotals.total}</span>
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <article key={product.id} className="group card-surface overflow-hidden">
              <div className="relative h-56 overflow-hidden rounded-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {product.featured ? (
                  <span className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-cocoa">
                    Destacado
                  </span>
                ) : null}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-ink">{product.name}</h3>
                    <p className="text-sm text-gray-500">Color {product.color} · Talla {product.size}</p>
                  </div>
                  <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                    {currency(product.price)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className={`inline-flex h-3 w-3 rounded-full ${
                        product.stock > 6 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-400' : 'bg-red-400'
                      }`}
                    ></span>
                    <span className="font-semibold">{product.stock} en stock</span>
                  </div>
                  <button
                    className="button-primary text-sm px-4 py-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                    onClick={() => addToCart(product.id)}
                    disabled={product.stock <= 0}
                  >
                    {product.stock > 0 ? 'Agregar a carrito' : 'Agotado'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="card-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">Administración</p>
          <h3 className="font-display text-2xl">Bodega y precios</h3>
          <p className="text-sm text-gray-600">Control en vivo de unidades disponibles.</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-sand/60 px-4 py-3">
              <p className="text-xs font-semibold text-ink">Unidades en bodega</p>
              <p className="text-2xl font-bold">{warehouseTotals.total}</p>
            </div>
            <div className="rounded-xl bg-blush/70 px-4 py-3">
              <p className="text-xs font-semibold text-ink">Valor estimado</p>
              <p className="text-2xl font-bold">{currency(warehouseTotals.value)}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <label className="text-sm font-semibold text-cocoa">Seleccionar producto</label>
            <select
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/60"
              value={selectedProduct?.id}
              onChange={(event) => setSelectedId(event.target.value)}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} — {product.stock} uds.
                </option>
              ))}
            </select>

            {selectedProduct ? (
              <div className="rounded-xl border border-dashed border-cocoa/30 bg-white/60 p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-ink">{selectedProduct.name}</h4>
                    <p className="text-sm text-gray-600">Talla {selectedProduct.size} · {selectedProduct.color}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Stock</p>
                    <p className="text-lg font-bold">{selectedProduct.stock} uds</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="text-sm font-semibold text-cocoa">Agregar unidades</label>
                  <div className="flex w-full items-center gap-2 sm:w-auto">
                    <input
                      type="number"
                      min={1}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/60 sm:w-32"
                      value={stockToAdd}
                      onChange={(event) => setStockToAdd(Number(event.target.value))}
                    />
                    <button
                      className="button-primary px-4 py-2"
                      type="button"
                      onClick={() => updateStock(selectedProduct.id, stockToAdd)}
                    >
                      Cargar a bodega
                    </button>
                  </div>
                  <button
                    className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                    type="button"
                    onClick={() => updateStock(selectedProduct.id, -1)}
                    disabled={selectedProduct.stock <= 0}
                  >
                    Registrar venta
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="card-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">Nuevo producto</p>
          <h3 className="font-display text-2xl">Cargar catálogo</h3>
          <form className="mt-4 space-y-3" onSubmit={handleAddProduct}>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-sm font-semibold text-ink">
                Nombre
                <input
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/60"
                  value={newProduct.name}
                  onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })}
                  required
                />
              </label>
              <label className="space-y-1 text-sm font-semibold text-ink">
                Precio (CLP)
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/60"
                  value={newProduct.price}
                  onChange={(event) => setNewProduct({ ...newProduct, price: Number(event.target.value) })}
                  required
                />
              </label>
            </div>
            <label className="space-y-1 text-sm font-semibold text-ink">
              Descripción
              <textarea
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/60"
                rows={3}
                value={newProduct.description}
                onChange={(event) => setNewProduct({ ...newProduct, description: event.target.value })}
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="space-y-1 text-sm font-semibold text-ink">
                Talla
                <input
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/60"
                  value={newProduct.size}
                  onChange={(event) => setNewProduct({ ...newProduct, size: event.target.value })}
                  placeholder="S, M, L"
                />
              </label>
              <label className="space-y-1 text-sm font-semibold text-ink">
                Color
                <input
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/60"
                  value={newProduct.color}
                  onChange={(event) => setNewProduct({ ...newProduct, color: event.target.value })}
                  placeholder="Negro, Lila..."
                />
              </label>
              <label className="space-y-1 text-sm font-semibold text-ink">
                Stock inicial
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/60"
                  value={newProduct.stock}
                  onChange={(event) => setNewProduct({ ...newProduct, stock: Number(event.target.value) })}
                />
              </label>
            </div>
            <label className="space-y-1 text-sm font-semibold text-ink">
              URL de imagen
              <input
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/60"
                value={newProduct.image}
                onChange={(event) => setNewProduct({ ...newProduct, image: event.target.value })}
                placeholder="https://..."
                required
              />
            </label>
            <button type="submit" className="button-primary w-full justify-center">
              Guardar producto
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default CommerceDashboard;
