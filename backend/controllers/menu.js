import { Menu } from "../models/menu.js";

export const getAllMenus = async (req,res) => {
    try{
        const menu_items = await Menu.find()
        return res.status(200).json({menu_items})
    }
    catch (error)
    {
        return res.status(500).json({error : error.message})
    }
}

export const createMenuItem = async (req,res) => {
    try{
        const {name,description,price} = req.body
        if(!name || !description || !price)
        {
            return res.status(400).json({error : "Please fill in the required fields"})
        }
        const menu_item = await Menu.create({
            item_name : name,
            description : description,
            price : price,
        })
        return res.status(201).json(menu_item)
    }
    catch (error)
    {
        return res.status(500).json({error : error.message})
    }
}
// export const createAuction = async (req,res) => {
//     try {
//         const {created_by, title,description,starting_price,current_price,starting_time,ending_time,highest_bidder, highest_bidder_username} = req.body
//         if(!created_by || !title || !description || !starting_price || !ending_time || !starting_price)
//         {
//             return res.status(400).json({error : "Please fill in the required fields"})
//         }
//         const auction = await Auction.create({created_by,title,description,starting_price,current_price,starting_time,ending_time,highest_bidder, highest_bidder_username})
//         return res.status(201).json({auction})
//     } catch (error) {
//         return res.status(500).json({error : error.message})
//     }
// }
// export const getAuction = async (req,res) => {
//     try {
//         const id = req.params.id
//         const auction = await Auction.findById(id)
//         if(auction)
//         {
//             return res.status(200).json({auction})
//         }
//         return res.status(500).json({error : error.message})
//     } catch (error) {
//         return res.status(500).json({error : error.message})
//     }
// }

// export const getAllAuctions = async (req,res) => {
//     try{
//         const now = new Date();
//         const auctions = await Auction.find({ ending_time: { $gt: now }, starting_time: { $lte: now} }).exec();
//         res.status(200).json({auctions});
//     }
//     catch (error)
//     {
//         return res.status(500).json({error : error.message})
//     }
// }

// export const updateAuctionPrice = async (req,res) => {
//     try{
//         const auction = await Auction.findByIdAndUpdate(req.body.id,{current_price : req.body.current_price})
//         if(auction)
//         {
//             console.log(auction)
//             return res.status(200).json({auction,found:true})
//         }
//         return res.status(401).json({ message: "Auction not found", found: false });
//     }
//     catch (error)
//     {
//         return res.status(500).json({error : error.message})
//     }
// }