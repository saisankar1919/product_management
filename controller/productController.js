const Product = require('../models/productModel')

//...................create new product........................
exports.create = async (req,res) =>
{
    try
    {
        price = req.body.price
        price = (price + price*0.18)
        req.body.price = price
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    }
    catch
    {
        res.status(400).json('Error on creating product')
    }
}

//....................list all products...........................
exports.list = async (req,res) =>
{
    try
    {
        let products = await Product.find({})
        .exec();
        res.json(products);
    }
    catch
    {
        res.status(400).json('Error...')
    }
}

//......................update products...............................
exports.update = async( req, res ) =>
{
    try
    {
        price = req.body.price
        price = (price + price*0.18)
        req.body.price = price
        let updated = await Product.findByIdAndUpdate(
            {_id:req.params.id},
            req.body,
            { new:true }
        ).exec()
        res.status(200).json(updated)
        
    }
    catch
    {
        res.status(400).json('Error on update...');  
    }
}

//..........................remove product....................................
exports.remove = async(req,res) =>
{
    try
    {
        const deleted = await Product.findByIdAndRemove(
            {_id:req.params.id}
        ).exec()
        res.status(200).json(deleted)
    }
    catch
    {
        res.status(400).json('Error...')
    }
}