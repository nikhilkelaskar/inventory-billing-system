import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Package,
  Receipt,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Search,
  Edit3,
  Trash2,
  ShoppingCart,
  IndianRupee,
  AlertTriangle,
  CheckCircle2,
  X,
  Save,
  Printer,
  Download,
  RefreshCw,
  Menu,
  UserRound,
  FileText,
  Moon,
  Sun,
  ChevronDown
} from "lucide-react";

const DEMO_PRODUCTS = [
  {
    id: "p1",
    name: "Tata Salt 1kg",
    sku: "SAL001",
    category: "Grocery",
    price: 28,
    cost: 22,
    stock: 42,
    minStock: 10,
    unit: "pcs",
    tax: 0
  },
  {
    id: "p2",
    name: "Aashirvaad Atta 5kg",
    sku: "ATT005",
    category: "Grocery",
    price: 295,
    cost: 260,
    stock: 18,
    minStock: 5,
    unit: "pcs",
    tax: 5
  },
  {
    id: "p3",
    name: "Parle-G Biscuits",
    sku: "BIS010",
    category: "Snacks",
    price: 10,
    cost: 7,
    stock: 7,
    minStock: 12,
    unit: "pcs",
    tax: 5
  },
  {
    id: "p4",
    name: "Surf Excel 1kg",
    sku: "DET001",
    category: "Household",
    price: 145,
    cost: 122,
    stock: 25,
    minStock: 8,
    unit: "pcs",
    tax: 18
  },
  {
    id: "p5",
    name: "Amul Taaza 1L",
    sku: "MIL001",
    category: "Dairy",
    price: 62,
    cost: 54,
    stock: 3,
    minStock: 10,
    unit: "pcs",
    tax: 5
  }
];

const DEMO_CUSTOMERS = [
  {
    id: "c1",
    name: "Walk-in Customer",
    phone: "",
    email: "",
    address: "",
    due: 0
  },
  {
    id: "c2",
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@example.com",
    address: "Mumbai",
    due: 250
  },
  {
    id: "c3",
    name: "Priya Patil",
    phone: "9123456780",
    email: "priya@example.com",
    address: "Nalasopara",
    due: 0
  }
];

const defaultSettings = {
  shopName: "ShopFlow Mart",
  owner: "Shop Owner",
  phone: "9876543210",
  address: "Mumbai, Maharashtra",
  gst: "",
  currency: "₹",
  invoicePrefix: "INV",
  taxEnabled: true
};

function get(key, fallback) {
  try {
    const x = localStorage.getItem(key);
    return x ? JSON.parse(x) : fallback;
  } catch {
    return fallback;
  }
}

function money(n) {
  return `₹${Number(n || 0).toFixed(2)}`;
}

function uid(prefix = "id") {
  return (
    prefix +
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 7)
  );
}

export default function App() {
  const [logged, setLogged] = useState(() =>
    get("sf_logged", false)
  );

  const [products, setProducts] = useState(() =>
    get("sf_products", DEMO_PRODUCTS)
  );

  const [customers, setCustomers] = useState(() =>
    get("sf_customers", DEMO_CUSTOMERS)
  );

  const [invoices, setInvoices] = useState(() =>
    get("sf_invoices", [])
  );

  const [settings, setSettings] = useState(() =>
    get("sf_settings", defaultSettings)
  );

  const [dark, setDark] = useState(() =>
    get("sf_dark", false)
  );

  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "sf_products",
      JSON.stringify(products)
    );
  }, [products]);

  useEffect(() => {
    localStorage.setItem(
      "sf_customers",
      JSON.stringify(customers)
    );
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(
      "sf_invoices",
      JSON.stringify(invoices)
    );
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(
      "sf_settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(
      "sf_dark",
      JSON.stringify(dark)
    );

    document.documentElement.classList.toggle(
      "dark",
      dark
    );
  }, [dark]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(
        () => setToast(null),
        2800
      );

      return () => clearTimeout(t);
    }
  }, [toast]);

  const notify = (text, type = "success") => {
    setToast({ text, type });
  };

  if (!logged) {
    return (
      <Login
        onLogin={() => {
          localStorage.setItem(
            "sf_logged",
            "true"
          );

          setLogged(true);
        }}
      />
    );
  }

  const logout = () => {
    localStorage.removeItem("sf_logged");
    setLogged(false);
  };

  return (
    <div className="app-shell">

      <Sidebar
        page={page}
        setPage={(p) => {
          setPage(p);
          setMobileOpen(false);
        }}
        settings={settings}
        logout={logout}
        mobileOpen={mobileOpen}
      />

      <main className="main">

        <header className="topbar">

          <button
            className="mobile-menu"
            onClick={() =>
              setMobileOpen((v) => !v)
            }
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>

          {mobileOpen && (
            <button
              className="mobile-overlay"
              aria-label="Close navigation"
              onClick={() =>
                setMobileOpen(false)
              }
            />
          )}

          <div>
            <div className="eyebrow">
              INVENTORY & BILLING
            </div>

            <h1>{pageTitle(page)}</h1>
          </div>

          <div className="top-actions">

            <button
              className="icon-btn"
              onClick={() =>
                setDark(!dark)
              }
              title="Toggle theme"
            >
              {dark ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>

            <div className="profile">

              <div className="avatar">
                {(settings.owner || "S")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <b>
                  {settings.owner ||
                    "Shop Owner"}
                </b>

                <span>
                  Administrator
                </span>
              </div>

            </div>

          </div>

        </header>

        <div className="content">

          {page === "dashboard" && (
            <Dashboard
              products={products}
              customers={customers}
              invoices={invoices}
              setPage={setPage}
            />
          )}

          {page === "products" && (
            <Products
              products={products}
              setProducts={setProducts}
              notify={notify}
            />
          )}

          {page === "billing" && (
            <Billing
              products={products}
              setProducts={setProducts}
              customers={customers}
              setCustomers={setCustomers}
              invoices={invoices}
              setInvoices={setInvoices}
              settings={settings}
              notify={notify}
            />
          )}

          {page === "customers" && (
            <Customers
              customers={customers}
              setCustomers={setCustomers}
              notify={notify}
            />
          )}

          {page === "reports" && (
            <Reports
              products={products}
              invoices={invoices}
            />
          )}

          {page === "settings" && (
            <SettingsPage
              settings={settings}
              setSettings={setSettings}
              products={products}
              customers={customers}
              invoices={invoices}
              setProducts={setProducts}
              setCustomers={setCustomers}
              setInvoices={setInvoices}
              notify={notify}
            />
          )}

        </div>

      </main>

      {toast && (
        <div
          className={`toast ${toast.type}`}
        >
          <CheckCircle2 size={18} />
          {toast.text}
        </div>
      )}

    </div>
  );
}

function pageTitle(p) {
  return {
    dashboard: "Dashboard",
    products: "Inventory",
    billing: "New Bill",
    customers: "Customers",
    reports: "Reports",
    settings: "Settings"
  }[p];
}

function Login({ onLogin }) {

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (user.trim() && pass.trim()) {
      onLogin();
    } else {
      setErr(
        "Enter username and password."
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="brand-mark">
          <Receipt size={28} />
        </div>

        <h1>ShopFlow</h1>

        <p className="login-sub">
          Inventory & Billing Software
        </p>

        <form onSubmit={submit}>

          <label>
            Username
          </label>

          <input
            value={user}
            onChange={(e) =>
              setUser(e.target.value)
            }
            placeholder="Enter username"
            autoFocus
          />

          <label>
            Password
          </label>

          <div className="password">

            <input
              type={
                show
                  ? "text"
                  : "password"
              }
              value={pass}
              onChange={(e) =>
                setPass(e.target.value)
              }
              placeholder="Enter password"
            />

            <button
              type="button"
              onClick={() =>
                setShow(!show)
              }
            >
              {show ? "Hide" : "Show"}
            </button>

          </div>

          {err && (
            <div className="error">
              {err}
            </div>
          )}

          <button
            className="primary wide"
            type="submit"
          >
            Sign In
          </button>

        </form>

        <div className="demo-note">
          Demo: any non-empty username
          and password works.
        </div>

      </div>

    </div>
  );
}

function Sidebar({
  page,
  setPage,
  settings,
  logout,
  mobileOpen
}) {

  const nav = [
    [
      "dashboard",
      "Dashboard",
      LayoutDashboard
    ],
    [
      "products",
      "Inventory",
      Package
    ],
    [
      "billing",
      "Billing",
      Receipt
    ],
    [
      "customers",
      "Customers",
      Users
    ],
    [
      "reports",
      "Reports",
      BarChart3
    ],
    [
      "settings",
      "Settings",
      Settings
    ]
  ];

  return (
    <aside
      className={`sidebar ${
        mobileOpen ? "open" : ""
      }`}
    >

      <div className="logo">

        <div className="logo-icon">
          <Receipt size={21} />
        </div>

        <div>
          <b>ShopFlow</b>
          <span>
            Smart shop management
          </span>
        </div>

      </div>

      <div className="shop-mini">
        <span>SHOP</span>
        <b>{settings.shopName}</b>
      </div>

      <nav>

        {nav.map(
          ([id, label, Icon]) => (
            <button
              key={id}
              className={
                page === id
                  ? "active"
                  : ""
              }
              onClick={() =>
                setPage(id)
              }
            >
              <Icon size={19} />
              <span>{label}</span>
            </button>
          )
        )}

      </nav>

      <div className="side-bottom">

        <button onClick={logout}>
          <LogOut size={18} />
          Logout
        </button>

        <small>
          v1.0 • Local data
        </small>

      </div>

    </aside>
  );
}

function Dashboard({
  products,
  customers,
  invoices,
  setPage
}) {

  const low =
    products.filter(
      (p) => p.stock <= p.minStock
    );

  const today =
    new Date().toLocaleDateString();

  const todaySales =
    invoices
      .filter((i) =>
        i.date?.startsWith(
          new Date()
            .toISOString()
            .slice(0, 10)
        )
      )
      .reduce(
        (s, i) => s + i.total,
        0
      );

  return (
    <div>

      <div className="welcome">

        <div>
          <h2>
            Good day 👋
          </h2>

          <p>
            Here is what is happening
            with your shop today.
          </p>
        </div>

        <button
          className="primary"
          onClick={() =>
            setPage("billing")
          }
        >
          <Plus size={18} />
          Create New Bill
        </button>

      </div>

      <div className="stats">

        <Stat
          icon={IndianRupee}
          label="Today's Sales"
          value={money(todaySales)}
          hint={today}
        />

        <Stat
          icon={Receipt}
          label="Total Invoices"
          value={invoices.length}
          hint="All time"
        />

        <Stat
          icon={Package}
          label="Total Products"
          value={products.length}
          hint={`${low.length} low stock`}
        />

        <Stat
          icon={Users}
          label="Customers"
          value={customers.length}
          hint="Registered"
        />

      </div>

      <div className="grid-2">

        <section className="panel">

          <div className="panel-head">

            <div>
              <h3>
                Low Stock Alerts
              </h3>

              <span>
                Products needing
                attention
              </span>
            </div>

            <button
              className="text-btn"
              onClick={() =>
                setPage("products")
              }
            >
              View inventory
            </button>

          </div>

          {low.length === 0 ? (
            <Empty
              text={
                "All products are sufficiently stocked."
              }
            />
          ) : (
            <div className="table-wrap">

              <table>

                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Stock</th>
                    <th>Minimum</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {low.map((p) => (
                    <tr key={p.id}>

                      <td>
                        <b>{p.name}</b>
                        <small>
                          {p.sku}
                        </small>
                      </td>

                      <td>
                        {p.stock}{" "}
                        {p.unit}
                      </td>

                      <td>
                        {p.minStock}
                      </td>

                      <td>
                        <span className="badge danger">
                          <AlertTriangle
                            size={13}
                          />
                          Low stock
                        </span>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </section>

        <section className="panel">

          <div className="panel-head">

            <div>
              <h3>
                Recent Bills
              </h3>

              <span>
                Latest transactions
              </span>
            </div>

            <button
              className="text-btn"
              onClick={() =>
                setPage("billing")
              }
            >
              New bill
            </button>

          </div>

          {invoices.length === 0 ? (
            <Empty
              text={
                "No invoices yet. Create your first bill."
              }
            />
          ) : (
            <div className="table-wrap">

              <table>

                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Customer</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>

                  {invoices
                    .slice(-5)
                    .reverse()
                    .map((i) => (
                      <tr key={i.id}>

                        <td>
                          <b>{i.number}</b>

                          <small>
                            {new Date(
                              i.date
                            ).toLocaleString()}
                          </small>
                        </td>

                        <td>
                          {i.customerName}
                        </td>

                        <td>
                          <b>
                            {money(
                              i.total
                            )}
                          </b>
                        </td>

                      </tr>
                    ))}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </div>

      <section className="panel tips">

        <div className="panel-head">

          <div>
            <h3>
              Quick Actions
            </h3>

            <span>
              Common tasks
            </span>
          </div>

        </div>

        <div className="quick-actions">

          <button
            onClick={() =>
              setPage("billing")
            }
          >
            <Receipt />
            Create Bill
          </button>

          <button
            onClick={() =>
              setPage("products")
            }
          >
            <Package />
            Add Product
          </button>

          <button
            onClick={() =>
              setPage("customers")
            }
          >
            <Users />
            Add Customer
          </button>

          <button
            onClick={() =>
              setPage("reports")
            }
          >
            <BarChart3 />
            View Reports
          </button>

        </div>

      </section>

    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  hint
}) {

  return (
    <div className="stat">

      <div className="stat-icon">
        <Icon size={20} />
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{hint}</small>
      </div>

    </div>
  );
}

function Empty({ text }) {

  return (
    <div className="empty">
      <FileText size={25} />
      <span>{text}</span>
    </div>
  );
}

function Products({
  products,
  setProducts,
  notify
}) {

  const [q, setQ] =
    useState("");

  const [cat, setCat] =
    useState("All");

  const [modal, setModal] =
    useState(null);

  const cats = [
    "All",
    ...new Set(
      products.map(
        (p) => p.category
      )
    )
  ];

  const filtered =
    products.filter(
      (p) =>
        (cat === "All" ||
          p.category === cat) &&
        `${p.name} ${p.sku} ${p.category}`
          .toLowerCase()
          .includes(
            q.toLowerCase()
          )
    );

  const save = (p) => {

    if (
      !p.name ||
      !p.sku ||
      p.price < 0
    ) {
      notify(
        "Fill all required fields.",
        "error"
      );
      return;
    }

    if (p.id) {
      setProducts(
        products.map(
          (x) =>
            x.id === p.id
              ? p
              : x
        )
      );
    } else {
      setProducts([
        ...products,
        {
          ...p,
          id: uid("p")
        }
      ]);
    }

    setModal(null);

    notify(
      p.id
        ? "Product updated"
        : "Product added"
    );
  };

  const del = (id) => {

    if (
      confirm(
        "Delete this product?"
      )
    ) {
      setProducts(
        products.filter(
          (p) => p.id !== id
        )
      );

      notify(
        "Product deleted"
      );
    }
  };

  return (
    <div>

      <div className="page-tools">

        <div className="search">

          <Search size={17} />

          <input
            value={q}
            onChange={(e) =>
              setQ(e.target.value)
            }
            placeholder="Search products, SKU..."
          />

        </div>

        <select
          value={cat}
          onChange={(e) =>
            setCat(e.target.value)
          }
        >
          {cats.map((c) => (
            <option key={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          className="primary"
          onClick={() =>
            setModal({
              name: "",
              sku: "",
              category: "Grocery",
              price: 0,
              cost: 0,
              stock: 0,
              minStock: 5,
              unit: "pcs",
              tax: 0
            })
          }
        >
          <Plus size={18} />
          Add Product
        </button>

      </div>

      <section className="panel">

        <div className="panel-head">

          <div>
            <h3>
              Product Inventory
            </h3>

            <span>
              {filtered.length} products shown
            </span>
          </div>

        </div>

        <div className="table-wrap">

          <table>

            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Cost</th>
                <th>Stock</th>
                <th>Tax</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((p) => (
                <tr key={p.id}>

                  <td>
                    <b>{p.name}</b>
                    <small>
                      SKU: {p.sku}
                    </small>
                  </td>

                  <td>
                    {p.category}
                  </td>

                  <td>
                    {money(p.price)}
                  </td>

                  <td>
                    {money(p.cost)}
                  </td>

                  <td>
                    <span
                      className={
                        p.stock <=
                        p.minStock
                          ? "stock low"
                          : "stock"
                      }
                    >
                      {p.stock}{" "}
                      {p.unit}
                    </span>
                  </td>

                  <td>
                    {p.tax}%
                  </td>

                  <td>

                    <div className="row-actions">

                      <button
                        onClick={() =>
                          setModal(p)
                        }
                        title="Edit"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        className="danger-btn"
                        onClick={() =>
                          del(p.id)
                        }
                        title="Delete"
                      >
                        <Trash2
                          size={16}
                        />
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

      {modal && (
        <ProductModal
          data={modal}
          onClose={() =>
            setModal(null)
          }
          onSave={save}
        />
      )}

    </div>
  );
}

function ProductModal({
  data,
  onClose,
  onSave
}) {

  const [p, setP] =
    useState(data);

  const set = (k, v) => {

    setP({
      ...p,
      [k]:
        k === "name" ||
        k === "sku" ||
        k === "category" ||
        k === "unit"
          ? v
          : Number(v)
    });
  };

  return (
    <Modal
      title={
        data.id
          ? "Edit Product"
          : "Add Product"
      }
      onClose={onClose}
    >

      <div className="form-grid">

        <Field
          label="Product Name *"
          value={p.name}
          onChange={(v) =>
            set("name", v)
          }
        />

        <Field
          label="SKU / Code *"
          value={p.sku}
          onChange={(v) =>
            set("sku", v)
          }
        />

        <Field
          label="Category"
          value={p.category}
          onChange={(v) =>
            set("category", v)
          }
        />

        <Field
          label="Unit"
          value={p.unit}
          onChange={(v) =>
            set("unit", v)
          }
        />

        <Field
          label="Selling Price (₹)"
          type="number"
          value={p.price}
          onChange={(v) =>
            set("price", v)
          }
        />

        <Field
          label="Cost Price (₹)"
          type="number"
          value={p.cost}
          onChange={(v) =>
            set("cost", v)
          }
        />

        <Field
          label="Current Stock"
          type="number"
          value={p.stock}
          onChange={(v) =>
            set("stock", v)
          }
        />

        <Field
          label="Minimum Stock"
          type="number"
          value={p.minStock}
          onChange={(v) =>
            set("minStock", v)
          }
        />

        <Field
          label="Tax %"
          type="number"
          value={p.tax}
          onChange={(v) =>
            set("tax", v)
          }
        />

      </div>

      <ModalActions
        onClose={onClose}
        onSave={() =>
          onSave(p)
        }
      />

    </Modal>
  );
}

function Billing({
  products,
  setProducts,
  customers,
  setCustomers,
  invoices,
  setInvoices,
  settings,
  notify
}) {

  const [cart, setCart] =
    useState([]);

  const [query, setQuery] =
    useState("");

  const [customerId, setCustomerId] =
    useState("c1");

  const [paid, setPaid] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const [payment, setPayment] =
    useState("Cash");

  const [invoice, setInvoice] =
    useState(null);

  /*
    NEW:
    Product selected from Inventory
    dropdown
  */
  const [selectedProduct, setSelectedProduct] =
    useState("");

  const customer =
    customers.find(
      (c) => c.id === customerId
    ) || customers[0];

  /*
    Search products
  */
  const matches =
    products
      .filter((p) =>
        `${p.name} ${p.sku}`
          .toLowerCase()
          .includes(
            query.toLowerCase()
          )
      )
      .slice(0, 7);

  /*
    Add product to bill
  */
  const add = (p) => {

    if (p.stock <= 0) {

      notify(
        "This product is out of stock.",
        "error"
      );

      return;
    }

    setCart((c) => {

      const x = c.find(
        (i) => i.id === p.id
      );

      if (x) {

        return c.map((i) =>
          i.id === p.id
            ? {
                ...i,
                qty: Math.min(
                  i.qty + 1,
                  p.stock
                )
              }
            : i
        );
      }

      return [
        ...c,
        {
          ...p,
          qty: 1
        }
      ];
    });

    setQuery("");
  };

  /*
    Change quantity
  */
  const change = (
    id,
    qty
  ) => {

    setCart((c) =>
      c
        .map((i) =>
          i.id === id
            ? {
                ...i,
                qty: Math.max(
                  0,
                  Math.min(
                    Number(qty),
                    i.stock
                  )
                )
              }
            : i
        )
        .filter(
          (i) => i.qty
        )
    );
  };

  const subtotal =
    cart.reduce(
      (s, i) =>
        s +
        i.price *
          i.qty,
      0
    );

  const tax =
    cart.reduce(
      (s, i) =>
        s +
        i.price *
          i.qty *
          (i.tax || 0) /
          100,
      0
    );

  const total =
    Math.max(
      0,
      subtotal +
        tax -
        Number(
          discount || 0
        )
    );

  const due =
    Math.max(
      0,
      total -
        Number(
          paid || 0
        )
    );

  /*
    Complete sale
  */
  const createBill = () => {

    if (!cart.length) {

      notify(
        "Add at least one product.",
        "error"
      );

      return;
    }

    const number =
      `${settings.invoicePrefix || "INV"}-${String(
        invoices.length + 1
      ).padStart(4, "0")}`;

    const inv = {
      id: uid("inv"),
      number,
      date:
        new Date().toISOString(),
      customerName:
        customer?.name ||
        "Walk-in Customer",
      customerId,
      items: cart,
      subtotal,
      tax,
      discount:
        Number(discount || 0),
      total,
      paid:
        Number(paid || 0),
      due,
      payment
    };

    setInvoices([
      ...invoices,
      inv
    ]);

    /*
      Reduce stock after sale
    */
    setProducts(
      products.map((p) => {

        const item =
          cart.find(
            (x) =>
              x.id === p.id
          );

        return item
          ? {
              ...p,
              stock:
                p.stock -
                item.qty
            }
          : p;
      })
    );

    /*
      Add due amount to customer
    */
    if (
      customerId !== "c1" &&
      due > 0
    ) {

      setCustomers(
        customers.map((c) =>
          c.id === customerId
            ? {
                ...c,
                due:
                  (c.due || 0) +
                  due
              }
            : c
        )
      );
    }

    setInvoice(inv);
    setCart([]);
    setPaid("");
    setDiscount(0);

    notify(
      "Bill created successfully"
    );
  };

  const print = () =>
    window.print();

  return (
    <div className="billing-layout">

      <style>{`

        .billing-layout .bill-controls {
          display: grid;
          grid-template-columns:
            minmax(240px, 1fr)
            minmax(220px, 250px)
            minmax(220px, 260px);
          gap: 12px;
          align-items: center;
        }

        .billing-layout
        .inventory-product-select {
          width: 100%;
          min-width: 0;
          height: 52px;
          padding: 0 14px;
          border: 1px solid #d9e1ec;
          border-radius: 10px;
          background: #ffffff;
          color: #182338;
          font-size: 15px;
          font-weight: 500;
          outline: none;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .billing-layout
        .inventory-product-select:hover {
          border-color: #b8c5d8;
        }

        .billing-layout
        .inventory-product-select:focus {
          border-color: #667eea;
          box-shadow:
            0 0 0 3px
            rgba(102,126,234,.12);
        }

        .billing-layout
        .inventory-product-select
        option {
          color: #182338;
          background: #ffffff;
        }

        @media (max-width: 1100px) {

          .billing-layout
          .bill-controls {
            grid-template-columns:
              1fr 1fr;
          }

          .billing-layout
          .product-search {
            grid-column:
              1 / -1;
          }

        }

        @media (max-width: 650px) {

          .billing-layout
          .bill-controls {
            grid-template-columns:
              1fr;
          }

          .billing-layout
          .product-search {
            grid-column:
              auto;
          }

          .billing-layout
          .inventory-product-select {
            width: 100%;
            min-width: 0;
          }

        }

      `}</style>

      <section className="panel bill-left">

        <div className="panel-head">

          <div>

            <h3>
              Create Invoice
            </h3>

            <span>
              Add products to the current bill
            </span>

          </div>

        </div>

        <div className="bill-controls">

          {/* SEARCH / SCAN PRODUCT */}

          <div className="search product-search">

            <Search size={17} />

            <input
              value={query}
              onChange={(e) =>
                setQuery(
                  e.target.value
                )
              }
              placeholder="Scan / search product by name or SKU..."
            />

            {query && (
              <div className="suggestions">

                {matches.map(
                  (p) => (
                    <button
                      key={p.id}
                      onClick={() =>
                        add(p)
                      }
                    >

                      <span>

                        <b>
                          {p.name}
                        </b>

                        <small>
                          {p.sku} •{" "}
                          {p.stock}{" "}
                          in stock
                        </small>

                      </span>

                      <strong>
                        {money(
                          p.price
                        )}
                      </strong>

                    </button>
                  )
                )}

              </div>
            )}

          </div>

          {/* NEW INVENTORY PRODUCT DROPDOWN */}

          <select
            className="inventory-product-select"
            value={selectedProduct}
            onChange={(e) => {

              const id =
                e.target.value;

              if (!id) return;

              const product =
                products.find(
                  (p) =>
                    String(
                      p.id
                    ) ===
                    String(id)
                );

              if (product) {
                add(product);
              }

              /*
                Reset dropdown
                after adding
              */
              setSelectedProduct("");

            }}
          >

            <option value="">
              Select Product
            </option>

            {products.map(
              (product) => (

                <option
                  key={product.id}
                  value={product.id}
                  disabled={
                    product.stock <=
                    0
                  }
                >
                  {product.name}
                  {" — ₹"}
                  {Number(
                    product.price || 0
                  ).toFixed(2)}
                  {" • Stock: "}
                  {product.stock}
                </option>

              )
            )}

          </select>

          {/* CUSTOMER DROPDOWN */}

          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(
                e.target.value
              )
            }
          >

            {customers.map(
              (c) => (

                <option
                  key={c.id}
                  value={c.id}
                >
                  {c.name}

                  {c.phone
                    ? ` • ${c.phone}`
                    : ""}
                </option>

              )
            )}

          </select>

        </div>

        <div className="cart-table">

          <table>

            <thead>

              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>

            </thead>

            <tbody>

              {cart.map(
                (i) => (

                  <tr key={i.id}>

                    <td>
                      <b>
                        {i.name}
                      </b>

                      <small>
                        {i.sku}
                      </small>
                    </td>

                    <td>
                      {money(i.price)}
                    </td>

                    <td>

                      <input
                        className="qty"
                        type="number"
                        min="0"
                        max={i.stock}
                        value={i.qty}
                        onChange={(e) =>
                          change(
                            i.id,
                            e.target.value
                          )
                        }
                      />

                    </td>

                    <td>
                      <b>
                        {money(
                          i.price *
                            i.qty
                        )}
                      </b>
                    </td>

                    <td>

                      <button
                        className="icon-danger"
                        onClick={() =>
                          change(
                            i.id,
                            0
                          )
                        }
                      >
                        <Trash2
                          size={15}
                        />
                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

          {!cart.length && (
            <Empty
              text={
                "No items in the bill. Search and add products above."
              }
            />
          )}

        </div>

      </section>

      <aside className="panel bill-summary">

        <div className="panel-head">

          <div>

            <h3>
              Payment Summary
            </h3>

            <span>
              {customer?.name}
            </span>

          </div>

        </div>

        <div className="summary-lines">

          <div>
            <span>
              Subtotal
            </span>

            <b>
              {money(subtotal)}
            </b>
          </div>

          <div>
            <span>
              Tax
            </span>

            <b>
              {money(tax)}
            </b>
          </div>

          <div className="discount-line">

            <span>
              Discount
            </span>

            <input
              type="number"
              min="0"
              value={discount}
              onChange={(e) =>
                setDiscount(
                  e.target.value
                )
              }
            />

          </div>

          <div className="total-line">

            <span>
              Total
            </span>

            <strong>
              {money(total)}
            </strong>

          </div>

          <div>

            <span>
              Payment mode
            </span>

            <select
              value={payment}
              onChange={(e) =>
                setPayment(
                  e.target.value
                )
              }
            >
              <option>
                Cash
              </option>

              <option>
                UPI
              </option>

              <option>
                Card
              </option>

              <option>
                Credit
              </option>

            </select>

          </div>

          <div>

            <span>
              Amount received
            </span>

            <input
              type="number"
              min="0"
              value={paid}
              onChange={(e) =>
                setPaid(
                  e.target.value
                )
              }
              placeholder="0.00"
            />

          </div>

          <div
            className={
              due > 0
                ? "due"
                : "change"
            }
          >

            <span>
              {due > 0
                ? "Amount due"
                : "Change"}
            </span>

            <b>
              {money(
                due > 0
                  ? due
                  : Number(
                      paid || 0
                    ) - total
              )}
            </b>

          </div>

        </div>

        <button
          className="primary wide big"
          onClick={createBill}
        >
          <CheckCircle2 size={18} />
          Complete Sale
        </button>

      </aside>

      {invoice && (
        <InvoiceModal
          invoice={invoice}
          settings={settings}
          onClose={() =>
            setInvoice(null)
          }
          onPrint={print}
        />
      )}

    </div>
  );
}

function InvoiceModal({
  invoice,
  settings,
  onClose,
  onPrint
}) {

  return (
    <Modal
      title="Invoice Created"
      onClose={onClose}
    >

      <div
        className="invoice-preview"
        id="print-area"
      >

        <div className="invoice-head">

          <div>

            <h2>
              {settings.shopName}
            </h2>

            <p>
              {settings.address}
              <br />
              {settings.phone}
            </p>

          </div>

          <div>

            <b>
              {invoice.number}
            </b>

            <p>
              {new Date(
                invoice.date
              ).toLocaleString()}
            </p>

          </div>

        </div>

        <hr />

        <p>
          <b>Bill To:</b>{" "}
          {invoice.customerName}
        </p>

        <table>

          <thead>

            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>

          </thead>

          <tbody>

            {invoice.items.map(
              (i) => (

                <tr key={i.id}>

                  <td>
                    {i.name}
                  </td>

                  <td>
                    {i.qty}
                  </td>

                  <td>
                    {money(
                      i.price *
                        i.qty
                    )}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

        <div className="invoice-total">

          <p>
            Subtotal:{" "}
            {money(
              invoice.subtotal
            )}
          </p>

          <p>
            Tax:{" "}
            {money(invoice.tax)}
          </p>

          <p>
            Discount:{" "}
            {money(
              invoice.discount
            )}
          </p>

          <h3>
            Total:{" "}
            {money(
              invoice.total
            )}
          </h3>

          <p>
            Paid:{" "}
            {money(invoice.paid)}
            {" • "}
            Due:{" "}
            {money(invoice.due)}
          </p>

        </div>

      </div>

      <div className="modal-actions">

        <button
          className="secondary"
          onClick={onClose}
        >
          Close
        </button>

        <button
          className="primary"
          onClick={onPrint}
        >
          <Printer size={17} />
          Print Invoice
        </button>

      </div>

    </Modal>
  );
}

function Customers({
  customers,
  setCustomers,
  notify
}) {

  const [q, setQ] =
    useState("");

  const [modal, setModal] =
    useState(null);

  const filtered =
    customers.filter(
      (c) =>
        `${c.name} ${c.phone} ${c.email}`
          .toLowerCase()
          .includes(
            q.toLowerCase()
          )
    );

  const save = (c) => {

    if (!c.name) {

      notify(
        "Customer name is required.",
        "error"
      );

      return;
    }

    if (c.id) {

      setCustomers(
        customers.map(
          (x) =>
            x.id === c.id
              ? c
              : x
        )
      );

    } else {

      setCustomers([
        ...customers,
        {
          ...c,
          id: uid("c"),
          due: 0
        }
      ]);

    }

    setModal(null);

    notify(
      c.id
        ? "Customer updated"
        : "Customer added"
    );
  };

  return (
    <div>

      <div className="page-tools">

        <div className="search">

          <Search size={17} />

          <input
            value={q}
            onChange={(e) =>
              setQ(
                e.target.value
              )
            }
            placeholder="Search customers..."
          />

        </div>

        <button
          className="primary"
          onClick={() =>
            setModal({
              name: "",
              phone: "",
              email: "",
              address: "",
              due: 0
            })
          }
        >
          <Plus size={18} />
          Add Customer
        </button>

      </div>

      <section className="panel">

        <div className="panel-head">

          <div>
            <h3>
              Customer Directory
            </h3>

            <span>
              {filtered.length}
              {" "}
              customers
            </span>
          </div>

        </div>

        <div className="table-wrap">

          <table>

            <thead>

              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Outstanding</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {filtered.map(
                (c) => (

                  <tr key={c.id}>

                    <td>
                      <b>
                        {c.name}
                      </b>
                    </td>

                    <td>
                      {c.phone ||
                        "—"}
                    </td>

                    <td>
                      {c.email ||
                        "—"}
                    </td>

                    <td>
                      {c.address ||
                        "—"}
                    </td>

                    <td
                      className={
                        c.due > 0
                          ? "amount-due"
                          : ""
                      }
                    >
                      {money(
                        c.due || 0
                      )}
                    </td>

                    <td>

                      <button
                        className="edit-link"
                        onClick={() =>
                          setModal(c)
                        }
                      >
                        <Edit3
                          size={15}
                        />
                        Edit
                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </section>

      {modal && (
        <CustomerModal
          data={modal}
          onClose={() =>
            setModal(null)
          }
          onSave={save}
        />
      )}

    </div>
  );
}

function CustomerModal({
  data,
  onClose,
  onSave
}) {

  const [c, setC] =
    useState(data);

  return (
    <Modal
      title={
        data.id
          ? "Edit Customer"
          : "Add Customer"
      }
      onClose={onClose}
    >

      <div className="form-grid">

        <Field
          label="Full Name *"
          value={c.name}
          onChange={(v) =>
            setC({
              ...c,
              name: v
            })
          }
        />

        <Field
          label="Phone"
          value={c.phone}
          onChange={(v) =>
            setC({
              ...c,
              phone: v
            })
          }
        />

        <Field
          label="Email"
          value={c.email}
          onChange={(v) =>
            setC({
              ...c,
              email: v
            })
          }
        />

        <Field
          label="Address"
          value={c.address}
          onChange={(v) =>
            setC({
              ...c,
              address: v
            })
          }
        />

      </div>

      <ModalActions
        onClose={onClose}
        onSave={() =>
          onSave(c)
        }
      />

    </Modal>
  );
}

function Reports({
  products,
  invoices
}) {

  const revenue =
    invoices.reduce(
      (s, i) =>
        s + i.total,
      0
    );

  const tax =
    invoices.reduce(
      (s, i) =>
        s + i.tax,
      0
    );

  const units =
    invoices.reduce(
      (s, i) =>
        s +
        i.items.reduce(
          (a, x) =>
            a + x.qty,
          0
        ),
      0
    );

  const exportCSV = () => {

    const rows = [
      [
        "Invoice",
        "Date",
        "Customer",
        "Subtotal",
        "Tax",
        "Discount",
        "Total",
        "Paid",
        "Due",
        "Payment"
      ],

      ...invoices.map(
        (i) => [
          i.number,
          i.date,
          i.customerName,
          i.subtotal,
          i.tax,
          i.discount,
          i.total,
          i.paid,
          i.due,
          i.payment
        ]
      )
    ];

    const csv =
      rows
        .map((r) =>
          r
            .map(
              (v) =>
                `"${String(v).replaceAll(
                  '"',
                  '""'
                )}"`
            )
            .join(",")
        )
        .join("\n");

    const a =
      document.createElement(
        "a"
      );

    a.href =
      URL.createObjectURL(
        new Blob(
          [csv],
          {
            type: "text/csv"
          }
        )
      );

    a.download =
      "sales-report.csv";

    a.click();

    URL.revokeObjectURL(
      a.href
    );
  };

  return (
    <div>

      <div className="page-tools">

        <div>

          <h2 className="section-title">
            Business Reports
          </h2>

          <p className="muted">
            Track sales and invoice
            performance.
          </p>

        </div>

        <button
          className="secondary"
          onClick={exportCSV}
        >
          <Download size={17} />
          Export CSV
        </button>

      </div>

      <div className="stats">

        <Stat
          icon={IndianRupee}
          label="Total Revenue"
          value={money(revenue)}
          hint="All invoices"
        />

        <Stat
          icon={Receipt}
          label="Invoices"
          value={invoices.length}
          hint="Transactions"
        />

        <Stat
          icon={Package}
          label="Units Sold"
          value={units}
          hint="Total quantity"
        />

        <Stat
          icon={IndianRupee}
          label="Tax Collected"
          value={money(tax)}
          hint="Recorded tax"
        />

      </div>

      <div className="grid-2">

        <section className="panel">

          <div className="panel-head">

            <div>
              <h3>
                Invoice History
              </h3>

              <span>
                Every completed sale
              </span>
            </div>

          </div>

          {invoices.length ? (

            <div className="table-wrap">

              <table>

                <thead>

                  <tr>
                    <th>Invoice</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Payment</th>
                  </tr>

                </thead>

                <tbody>

                  {invoices
                    .slice()
                    .reverse()
                    .map((i) => (

                      <tr key={i.id}>

                        <td>
                          <b>
                            {i.number}
                          </b>
                        </td>

                        <td>
                          {new Date(
                            i.date
                          ).toLocaleDateString()}
                        </td>

                        <td>
                          {i.customerName}
                        </td>

                        <td>
                          {money(
                            i.total
                          )}
                        </td>

                        <td>

                          <span className="badge success">
                            {i.payment}
                          </span>

                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

          ) : (

            <Empty
              text={
                "No sales data yet."
              }
            />

          )}

        </section>

        <section className="panel">

          <div className="panel-head">

            <div>
              <h3>
                Inventory Value
              </h3>

              <span>
                Current stock overview
              </span>
            </div>

          </div>

          <div className="report-list">

            {products.map(
              (p) => (

                <div key={p.id}>

                  <span>

                    <b>
                      {p.name}
                    </b>

                    <small>
                      {p.stock}{" "}
                      {p.unit}
                      {" × "}
                      {money(
                        p.cost
                      )}
                    </small>

                  </span>

                  <strong>
                    {money(
                      p.stock *
                        p.cost
                    )}
                  </strong>

                </div>

              )
            )}

          </div>

        </section>

      </div>

    </div>
  );
}

function SettingsPage({
  settings,
  setSettings,
  products,
  customers,
  invoices,
  setProducts,
  setCustomers,
  setInvoices,
  notify
}) {

  const [s, setS] =
    useState(settings);

  const save = () => {

    setSettings(s);

    notify(
      "Settings saved"
    );
  };

  const backup = () => {

    const data = {
      settings,
      products,
      customers,
      invoices
    };

    const a =
      document.createElement(
        "a"
      );

    a.href =
      URL.createObjectURL(
        new Blob(
          [
            JSON.stringify(
              data,
              null,
              2
            )
          ],
          {
            type:
              "application/json"
          }
        )
      );

    a.download =
      "shopflow-backup.json";

    a.click();

    URL.revokeObjectURL(
      a.href
    );

    notify(
      "Backup exported"
    );
  };

  const reset = () => {

    if (
      confirm(
        "Reset all shop data to demo data?"
      )
    ) {

      setProducts(
        DEMO_PRODUCTS
      );

      setCustomers(
        DEMO_CUSTOMERS
      );

      setInvoices([]);

      setSettings(
        defaultSettings
      );

      setS(
        defaultSettings
      );

      notify(
        "Data reset"
      );
    }
  };

  return (
    <div className="settings-grid">

      <section className="panel">

        <div className="panel-head">

          <div>

            <h3>
              Shop Profile
            </h3>

            <span>
              Information shown on invoices
            </span>

          </div>

        </div>

        <div className="form-grid">

          <Field
            label="Shop Name"
            value={s.shopName}
            onChange={(v) =>
              setS({
                ...s,
                shopName: v
              })
            }
          />

          <Field
            label="Owner Name"
            value={s.owner}
            onChange={(v) =>
              setS({
                ...s,
                owner: v
              })
            }
          />

          <Field
            label="Phone"
            value={s.phone}
            onChange={(v) =>
              setS({
                ...s,
                phone: v
              })
            }
          />

          <Field
            label="GST Number"
            value={s.gst}
            onChange={(v) =>
              setS({
                ...s,
                gst: v
              })
            }
          />

          <Field
            label="Invoice Prefix"
            value={
              s.invoicePrefix
            }
            onChange={(v) =>
              setS({
                ...s,
                invoicePrefix: v
              })
            }
          />

          <Field
            label="Currency"
            value={s.currency}
            onChange={(v) =>
              setS({
                ...s,
                currency: v
              })
            }
          />

          <label className="full">

            Shop Address

            <textarea
              value={s.address}
              onChange={(e) =>
                setS({
                  ...s,
                  address:
                    e.target.value
                })
              }
            />

          </label>

        </div>

        <div className="modal-actions">

          <button
            className="primary"
            onClick={save}
          >
            <Save size={17} />
            Save Settings
          </button>

        </div>

      </section>

      <section className="panel">

        <div className="panel-head">

          <div>

            <h3>
              Data Management
            </h3>

            <span>
              Your data is stored locally
              in this browser.
            </span>

          </div>

        </div>

        <div className="data-actions">

          <button
            className="secondary"
            onClick={backup}
          >
            <Download />
            Export Backup
          </button>

          <button
            className="secondary"
            onClick={() =>
              notify(
                "Use browser local storage; data remains on this device."
              )
            }
          >
            <RefreshCw />
            Check Storage
          </button>

          <button
            className="danger-outline"
            onClick={reset}
          >
            <RefreshCw />
            Reset Demo Data
          </button>

        </div>

        <div className="security-note">

          <CheckCircle2 size={18} />

          <div>

            <b>
              No server required
            </b>

            <p>
              This project uses
              localStorage, so
              products, customers,
              bills and settings
              remain available
              after refresh.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text"
}) {

  return (
    <label>

      {label}

      <input
        type={type}
        value={value ?? ""}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
      />

    </label>
  );
}

function Modal({
  title,
  onClose,
  children
}) {

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) =>
        e.target ===
          e.currentTarget &&
        onClose()
      }
    >

      <div className="modal">

        <div className="modal-head">

          <h3>
            {title}
          </h3>

          <button
            onClick={onClose}
          >
            <X size={19} />
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}

function ModalActions({
  onClose,
  onSave
}) {

  return (
    <div className="modal-actions">

      <button
        className="secondary"
        onClick={onClose}
      >
        Cancel
      </button>

      <button
        className="primary"
        onClick={onSave}
      >
        <Save size={17} />
        Save
      </button>

    </div>
  );
}