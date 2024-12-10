const express = require('express')

const shoesRoutes = require('./routes/shoes.router');
const cartRoutes = require('./routes/cart.router');
const accountRoutes = require('./routes/account.router');
const orderRoutes = require('./routes/order.router')

const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*'  // Autorise les requêtes de toutes les origines
}));

app.use(express.json());
app.use("/api/shoes", shoesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/order", orderRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}); // npm start