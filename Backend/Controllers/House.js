const House = require('../Models/Houses')
const error = require('errorhandler')
const cloud = require('cloudinary')
const ApiFeatures = require('../Utils/ApiFeatures')

cloud.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API,
    api_secret:process.env.API_SECRETE
})





exports.newImage=async(req,res,next) =>{
    try{

        // const result = await cloud.uploader.upload(req.files.image.forEach(i => i))

        console.log(req.file)

        // req.coverImage = result.secure_url;

        res.send(req.file.path)

        return res.status(200).json({url:result.secure_url,
        public_id:result.public_id})


    }catch(err){
       return res.status(500).json({status:err})
    }

    next()
}





exports.createHouse=async(req,res,next) =>{
    try{

    const house = await House.create({
        name:req.body.name,
        pice:req.body.price,
        bedrooms:req.body.bedrooms,
        bathrooms:req.body.bathrooms,
        noOfCars:req.body.noOfCars,
        description:req.body.description,
        garden:req.body.garden,
        pool:req.body.pool,
        petFriendly:req.body.petFriendly,
        propertyType:req.body.propertyType,
        streetAddress:req.body.streetAddress,
        images:req.body.images,
        images:req.body.images,
        coverImage:req.coverImage
    });
    console.log(house)
    res.status(201).json(house)

}catch(err){
    console.log(err)
    res.status(500).json(err,'hello')
}

next()

}






exports.getHouse=async(req,res,next)=>{
        try{
    
            const resPerPage = 15;
    
            
            const apiFeatures = new ApiFeatures(House.find(),req.query).search().filter().pagination(resPerPage).limitFields().sort()
    
            // console.log(await apiFeatures)
            const house = await apiFeatures.query
    
    
            if(!house){
                return res.status(400).json({message: 'Product not found'});
            }
    
    
    
    
            return res.status(200).json({success:true,number:house.length,houses:house})
        }catch(err){
            console.log(err)
            return res.send(err)
    
        }
        next()
    
}



exports.exclusive =async(req,res,next)=>{
    try{

        const apiFeatures = new ApiFeatures(House.find(),req.query).pagination(3)


        const house = await apiFeatures.query;

        return res.status(200).json(house)

    }catch(err){
        return res.send(err)
    }
}


exports.fetchOne =async(req,res,next)=>{
    try{



        const house = await House.findById(req.params.id);
        if(!house){
            return res.status(400).json({message: 'Product not found'});
        }

        return res.status(200).json(house)

    }catch(err){
        return res.send(err)
    }
}





