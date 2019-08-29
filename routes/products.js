module.exports = app => {
    const products = app.models.products;
    app.route('/xper/products')
        .get((req, res) => {
            console.log('getProducts');
            products.getProducts((jsonRes) => {
                res.json(jsonRes)
            })
        }) 
        .post((req, res) => {
            console.log("postProducts");
            products.postProducts(req, (jsonRes) => {
                res.json(jsonRes)
            })
        });

    app.route("/xper/products/:productName")
        .get((req, res) => {
            console.log("getProduct: "+req.params.productName);
            products.getProduct(req.params.productName, (jsonRes) => {
                res.json(jsonRes)
            })
        })
        .put((req, res) => {
            console.log("putProduct: "+req.params.productName + " -> "+req.body.rename);
            products.putProduct(req, (jsonRes) => {
                res.json(jsonRes)
            })
        }) 
        .delete((req, res) => {
            console.log("deleteProduct: "+req.params.productName);
            products.deleteProduct(req, (jsonRes) => {
                res.json(jsonRes)
            })
        });
}
