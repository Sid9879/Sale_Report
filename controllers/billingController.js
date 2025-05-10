const Billing = require('../models/billingSchema')

const addBilling = async(req,res)=>{
  const {companyName,title,invoiceNo,invoiceDate,dueDate,productDescription,hsnCode,oty,packageSize,unitPrice,gst,totalAmount} = req.body;
  try {
     const existingBilling = await Billing.findOne({invoiceNo});
   if(existingBilling){
    return res.status(400).json({message:"Invoice No. already exists"})
   }
   const create = await Billing.create({
    companyName,
    title,
    invoiceNo,
    invoiceDate,
    dueDate,
    productDescription,
    hsnCode,
    oty,
    packageSize,
    unitPrice,
    gst,
    totalAmount
   })
   res.status(201).json({msg:"Billing Added Successfully",create,success:true});
  } catch (error) {
    res.status(500).json({msg:"Error in adding",success:false,error:error.message});
  }
}

const updateBilling = async(req,res)=>{
  const{companyName,title,invoiceNo,invoiceDate,dueDate,productDescription,hsnCode,oty,packageSize,unitPrice,gst,totalAmount} = req.body;
  const productId = req.params._id
  try {
    const findProducts = await Billing.findById(productId);
    if(!findProducts){
        return res.status(404).json({message:"No Billing found with this id"})
    }
    const updateproducts = await Billing.findByIdAndUpdate(productId,{$set:{companyName,title,invoiceNo,invoiceDate,dueDate,productDescription,hsnCode,oty,packageSize,unitPrice,gst,totalAmount}})
    res.status(200).json({msg:"Billing Updated Successfully",updateproducts})
  } catch (error) {
    res.status(500).json({msg:"Error in updating",success:false,error:error.message})
  }
}

const deleteProducts = async(req,res)=>{
    const productId = req.params._id;
    // const userId = req.params._id;
    try {
        const findBill = await Billing.findByIdAndDelete(productId);
        res.status(200).json({msg:"Deleted Successfully",success:true})
    } catch (error) {
        res.status(500).json({msg:"Error in deleting",success:false,error:error.message})
    }
}

const getAlLBill = async(req,res)=>{
   try {
     const getBill = await Billing.find().sort({createdAt:-1});
     if (getBill.length === 0) {
      return res.status(404).json({ message: "No Billing found", success: false });
    }
    res.status(200).json({msg:"Billings Fetched",success:true,getAlLBill})
   } catch (error) {
    res.status(500).json({msg:"Error in fetching data",success:false,error:error.message})
   }
}

module.exports ={ 
    addBilling,
    updateBilling,
    deleteProducts,
    getAlLBill
}