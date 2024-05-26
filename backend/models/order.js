import mongoose, {Schema} from "mongoose";

const orderSchema = new mongoose.Schema({

    items_ordered: {
        type : [String],
        required : true
    },
    quantity_ordered: {
        type : [Number],
        required : true
    },
    status: {
        type : String,
        required : true
    },
    total_price: {
        type : Number,
        required : true
    },
    ordered_by : {
        type : Schema.Types.ObjectId,
        ref : "ExamUser",
        required: true
    }
})

export const Order = mongoose.model("Order",orderSchema)