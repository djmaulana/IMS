// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.get('/api/items', (req, res) => {
  const sql = 'SELECT * FROM produk';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

app.get('/api/item/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM produk WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": row
    });
  });
});

app.get('/api/item/barcode/:barcode', (req, res) => {
  const { barcode } = req.params;
  console.log('Searching for barcode:', barcode);  // Logging
  const sql = 'SELECT * FROM produk WHERE barcode = ?';
  db.get(sql, [barcode], (err, row) => {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    if (!row) {
      res.status(404).json({"error": "Item not found"});
      return;
    }
    res.json({
      "message": "success",
      "data": row
    });
  });
});

app.put('/api/item/stockout/:barcode', (req, res) => {
  const { barcode } = req.params;
  const { quantity, customerResi } = req.body;
  const date = new Date().toISOString();

  const selectSql = 'SELECT quantity FROM produk WHERE barcode = ?';
  db.get(selectSql, [barcode], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ "error": "Item not found" });
      return;
    }

    const newQuantity = row.quantity - quantity;

    const updateSql = 'UPDATE produk SET quantity = ? WHERE barcode = ?';
    db.run(updateSql, [newQuantity, barcode], function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }

      const insertSql = `INSERT INTO stock_transaction (date, customer_resi, barcode, quantity)
                         VALUES (?, ?, ?, ?)`;
      db.run(insertSql, [date, customerResi, barcode, quantity], function (err) {
        if (err) {
          res.status(400).json({ "error": err.message });
          return;
        }
        res.json({
          "message": "success",
          "data": { barcode, quantity: newQuantity, customerResi }
        });
      });
    });
  });
});

app.put('/api/item/stockin/:barcode', (req, res) => {
  const { barcode } = req.params;
  const { quantity } = req.body;
  const sql = 'UPDATE produk SET quantity = quantity + ? WHERE barcode = ?';
  db.run(sql, [quantity, barcode], function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({"error": "Item not found"});
      return;
    }
    res.json({
      "message": "success",
      "data": {
        barcode,
        quantity
      }
    });
  });
});

app.post('/api/item', (req, res) => {
  const { barcode, name, category, hpp, selling_price, quantity } = req.body;

  if (!barcode || !name || !category || !hpp || !selling_price || !quantity) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO produk (barcode, name, category, hpp, selling_price, quantity) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [barcode, name, category, hpp, selling_price, quantity];

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: 'success',
      data: {
        id: this.lastID,
        barcode,
        name,
        category,
        hpp,
        selling_price,
        quantity
      }
    });
  });
});

app.put('/api/item/:id', (req, res) => {
  const { id } = req.params;
  const { barcode, name, category, hpp, selling_price, quantity } = req.body;
  console.log('Updating produk:', req.body); // Logging
  const sql = 'UPDATE produk SET barcode = ?, name = ?, category = ?, hpp = ?, selling_price = ?, quantity = ? WHERE id = ?';
  const params = [barcode, name, category, hpp, selling_price, quantity, id];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": { id, barcode, name, category, hpp, selling_price, quantity }
    });
  });
});

app.delete('/api/item/:id', (req, res) => {
  const { id } = req.params;
  console.log('Deleting item with ID:', id); // Logging
  const sql = 'DELETE FROM produk WHERE id = ?';
  db.run(sql, id, function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "deleted",
      "data": { id }
    });
  });
});

// Endpoint to get total quantity of stock sold
app.get('/api/stats/total-stock-sold', (req, res) => {
  const { startDate, endDate } = req.query;

  const sql = `
    SELECT SUM(quantity) as totalStockSold
    FROM stock_transaction
    WHERE DATE(date) BETWEEN ? AND ?
  `;
  db.get(sql, [startDate, endDate], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": row.totalStockSold
    });
  });
});

// Endpoint to get the top selling product
app.get('/api/stats/top-selling-product', (req, res) => {
  const { startDate, endDate } = req.query;

  const sql = `
    SELECT p.name, SUM(st.quantity) as totalSold
    FROM stock_transaction st
    JOIN produk p ON st.barcode = p.barcode
    WHERE DATE(st.date) BETWEEN ? AND ?
    GROUP BY p.name
    ORDER BY totalSold DESC
    LIMIT 1
  `;
  db.get(sql, [startDate, endDate], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": row
    });
  });
});

// Endpoint to get top 5 selling products
app.get('/api/stats/top-5-selling-products', (req, res) => {
  const { startDate, endDate } = req.query;

  const sql = `
    SELECT p.name, SUM(st.quantity) as totalSold
    FROM stock_transaction st
    JOIN produk p ON st.barcode = p.barcode
    WHERE DATE(st.date) BETWEEN ? AND ?
    GROUP BY p.name
    ORDER BY totalSold DESC
    LIMIT 5
  `;
  db.all(sql, [startDate, endDate], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});



// Endpoint to get net profit
app.get('/api/stats/net-profit', (req, res) => {
  const { startDate, endDate } = req.query;

  const sql = `
    SELECT SUM((p.selling_price - p.hpp) * st.quantity) as netProfit
    FROM stock_transaction st
    JOIN produk p ON st.barcode = p.barcode
    WHERE DATE(st.date) BETWEEN ? AND ?
  `;
  db.get(sql, [startDate, endDate], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": row.netProfit
    });
  });
});

// Endpoint to get total number of products
app.get('/api/stats/total-products', (req, res) => {
  const sql = 'SELECT COUNT(*) AS totalProducts FROM produk WHERE quantity > 0';
  db.get(sql, [], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": row.totalProducts
    });
  });
});

app.post('/api/stockin-logs', (req, res) => {
  const { barcode, quantity, date } = req.body;
  const sql = 'INSERT INTO stock_log (date, barcode, quantity) VALUES (?, ?, ?)';
  db.run(sql, [date, barcode, quantity], function(err) {
    if (err) {
      return res.status(400).json({"error": err.message});
    }
    res.json({
      "message": "success",
      "data": {
        id: this.lastID,
        date,
        barcode,
        quantity
      }
    });
  });
});

// Endpoint untuk mengambil semua log (ubah ke 3 terbaru)
app.get('/api/stockin-logs', (req, res) => {
  const sql = 'SELECT * FROM stock_log ORDER BY id DESC LIMIT 3';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({"error": err.message});
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});


// Endpoint untuk mengambil semua log (ubah ke 5 terbaru)
app.get('/api/stockout-logs', (req, res) => {
  const sql = 'SELECT * FROM stock_transaction ORDER BY id DESC LIMIT 5';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({"error": err.message});
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

app.get('/api/stats/date-range', (req, res) => {
  const { startDate, endDate } = req.query;

  const stockOutSql = `
    SELECT DATE(date) as date, SUM(quantity) as quantity
    FROM stock_transaction
    WHERE DATE(date) BETWEEN ? AND ?
    GROUP BY DATE(date)
  `;

  const stockInSql = `
    SELECT DATE(date) as date, SUM(quantity) as quantity
    FROM stock_log
    WHERE DATE(date) BETWEEN ? AND ?
    GROUP BY DATE(date)
  `;

  const revenueSql = `
    SELECT DATE(st.date) as date, SUM((p.selling_price - p.hpp) * st.quantity) as amount
    FROM stock_transaction st
    JOIN produk p ON st.barcode = p.barcode
    WHERE DATE(st.date) BETWEEN ? AND ?
    GROUP BY DATE(st.date)
  `;

  db.serialize(() => {
    db.all(stockOutSql, [startDate, endDate], (err, stockOutRows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }

      db.all(stockInSql, [startDate, endDate], (err, stockInRows) => {
        if (err) {
          res.status(400).json({ "error": err.message });
          return;
        }

        db.all(revenueSql, [startDate, endDate], (err, revenueRows) => {
          if (err) {
            res.status(400).json({ "error": err.message });
            return;
          }

          res.json({
            "message": "success",
            "data": {
              stockOutData: stockOutRows,
              stockInData: stockInRows,
              revenueData: revenueRows,
            }
          });
        });
      });
    });
  });
});


// Bulk insert items
app.post('/items/bulk', async (req, res) => {
  try {
    const items = req.body;
    await Item.insertMany(items);
    res.status(201).json({ message: 'Items successfully added' });
  } catch (error) {
    res.status(400).json({ message: 'Error adding items', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});