import express from "express";
import mercadopago from "mercadopago";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

mercadopago.configure({
  access_token: "TU_ACCESS_TOKEN"
});

app.post("/crear-pago", async (req, res) => {

  const { total } = req.body;

  const preference = {
    items: [
      {
        title: "Informe Automotor",
        quantity: 1,
        unit_price: Number(total)
      }
    ]
  };

  const response = await mercadopago.preferences.create(preference);

  res.json({
    url: response.body.init_point
  });

});

app.listen(3000);