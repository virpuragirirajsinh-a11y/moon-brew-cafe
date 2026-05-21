const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Working 😎");
});

app.post("/contact", (req, res) => {

    console.log("Data Received:", req.body);

    try {

        let data = [];

        if (fs.existsSync("data.json")) {

            const fileData = fs.readFileSync(
                "data.json",
                "utf8"
            );

            data = fileData
                ? JSON.parse(fileData)
                : [];
        }

        data.push({
...req.body,
status:"Pending"
});

        fs.writeFileSync(
            "data.json",
            JSON.stringify(data, null, 2)
        );

        console.log("FILE SAVED 😎");

        res.json({
            message:
            "Data Saved Successfully 🔥"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
            "Error Saving Data"
        });

    }

});

app.get("/messages", (req, res) => {

    try {

        const data = fs.readFileSync(
            "data.json",
            "utf8"
        );

        res.json(
            JSON.parse(data)
        );

    } catch (error) {

        res.json([]);

    }

});
app.delete("/delete/:index", (req, res) => {

    try {

        const index =
        parseInt(req.params.index);

        const fileData =
        fs.readFileSync(
            "data.json",
            "utf8"
        );

        let data =
        JSON.parse(fileData);

        data.splice(index, 1);

        fs.writeFileSync(
            "data.json",
            JSON.stringify(
                data,
                null,
                2
            )
        );

        res.json({
            message:
            "Message Deleted 😎"
        });

    } catch (error) {

        res.status(500).json({
            message:
            "Delete Error"
        });

    }

});
// Get Products
app.get("/products", (req, res) => {

    try {

        const data =
        fs.readFileSync(
            "products.json",
            "utf8"
        );

        res.json(
            JSON.parse(data)
        );

    } catch (error) {

        res.json([]);

    }

});

// Add Product
app.post("/add-product", (req, res) => {

    try {

        let products = [];

        if(
        fs.existsSync(
        "products.json"
        )){

            const fileData =
            fs.readFileSync(
                "products.json",
                "utf8"
            );

            products =
            fileData
            ? JSON.parse(fileData)
            : [];
        }

        products.push(
            req.body
        );

        fs.writeFileSync(
            "products.json",
            JSON.stringify(
                products,
                null,
                2
            )
        );

        res.json({
            message:
            "Product Added 😎"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
            "Error Adding Product"
        });

    }

});

// Delete Product
app.delete(
"/delete-product/:index",
(req,res)=>{

try{

const index =
parseInt(
req.params.index
);

const fileData =
fs.readFileSync(
"products.json",
"utf8"
);

let products =
JSON.parse(fileData);

products.splice(
index,
1
);

fs.writeFileSync(
"products.json",
JSON.stringify(
products,
null,
2
)
);

res.json({
message:
"Product Deleted 😎"
});

}catch(error){

res.status(500).json({
message:
"Delete Error"
});

}

});
// Update Order Status

app.put(
"/order-done/:index",
(req,res)=>{

try{

const index =
parseInt(
req.params.index
);

const fileData =
fs.readFileSync(
"data.json",
"utf8"
);

let data =
JSON.parse(fileData);

data[index].status =
"Completed";

fs.writeFileSync(
"data.json",
JSON.stringify(
data,
null,
2
)
);

res.json({
message:
"Order Completed 😎"
});

}catch(error){

res.status(500).json({
message:
"Error"
});

}

});
app.listen(5000, () => {
    console.log("Server Running...");
});