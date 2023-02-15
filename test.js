const request = require("supertest")("https://reqres.in")
const getAPI = require("supertest")("https://kasir-api.belajarqa.com")
const expect = require("chai").expect;

describe("Testing Reqress", function () { 
    it("GET Users", async function(){
        const response = await request.get("/api/users");
        expect(response.status).to.eql(200);
        expect(response.body.data).to.be.an("array");
    })

    it("GET User by ID", async function(){
        const response = await request.get("/api/users/2");
        expect(response.status).to.eql(200);
        expect(response.body.data).to.have.property("id");
        expect(response.body.data).to.have.property("email");
        expect(response.body.data).to.have.property("first_name");
        expect(response.body.data).to.have.property("last_name");
    })

    it("POST Create User", async function(){
        const response = await request
        .post("/api/users")
        .send({
            "name": "Syarif Ridho",
            "job": "Developer"
        });
        expect(response.status).to.eql(201);
        expect(response.body).to.have.property("name");
        expect(response.body).to.have.property("job");
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("createdAt");
    })

    it("PUT Update User", async function(){
        const response = await request
        .put("/api/users/2")
        .send({
            "name": "Syarif Ridho",
            "job": "Developer"
        });
        expect(response.status).to.eql(200);
        expect(response.body).to.have.property("name");
        expect(response.body).to.have.property("job");
        expect(response.body).to.have.property("updatedAt");
    })

    it("DELETE User", async function(){
        const response = await request.delete("/api/users/2");
        expect(response.status).to.eql(204);
    })
})

describe("Testing API Kasir AJA", function(){
    it("Auth Regristration", async function(){
        const responses = await getAPI
        .post("/registration")
        .send({
            "name" : "Toko Buah",
            "email" : "tokobuah@gmail.com",
            "password" : "12345"
        });

        expect(responses.status).to.eql(201);

    })

    it("Authorization - Login", async function(){
        const responses = await getAPI
        .post("/authentications")
        .send({
            "email" : "tokobuah@gmail.com",
            "password" : "12345"
        });
        expect(responses.status).to.eql(201); // fail because the response status 201
        expect(responses.body.message).to.eql("Authentication berhasil ditambahkan")
    })

    it("Authorization - Login", async function(){
        const responses = await getAPI
        .post("/authentications")
        .send({
            "email" : "tokobuah@gmail.com",
            "password" : "12345"
        });
        expect(responses.status).to.eql(200); // fail because the response status 201
        expect(responses.body.message).to.eql("Authentication berhasil ditambahkan")
    })
})
