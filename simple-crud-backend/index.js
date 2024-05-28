const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT | 5000;

//middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://dustobalok000:72aSFMLMwRx2o33W@simple-crud.ovfd1dh.mongodb.net/?retryWrites=true&w=majority&appName=simple-crud";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Connect to the "insertDB" database and access its "haiku" collection
        const database = client.db("simple-crud");
        const usersCollection = database.collection("users");

        app.get("/users", async (req, res) => {
            const cursor = usersCollection.find();

            if ((await usersCollection.countDocuments()) === 0) {
                console.log("No documents found!");
            }

            const result = await cursor.toArray();
            console.log(result);
            res.send(result);
        })

        app.get("/user/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);

            const query = { _id: new ObjectId(id) }
            const result = await usersCollection.findOne(query);
            console.log(result);
            res.send(result);

        })

        app.post("/user", async (req, res) => {
            console.log("user server route");
            const user = req.body;
            console.log(user);

            // Insert the defined document into the "haiku" collection
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.delete("/user/:id", async (req, res) => {
            const id = req.params.id;
            console.log("delete id: ", id);

            const quary = { _id: new ObjectId(id) };
            const result = await usersCollection.deleteOne(quary);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Simple Crund Server is ready to serve.")
})
app.listen(5000, () => {
    console.log(`Simple Crud server is running on PORT: ${port}`);
});