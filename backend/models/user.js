import mongoose, { Schema } from "mongoose";
const examuserSchema = new Schema({
    name: {
        type: String,
        required : true,
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role: {
        type : String,
        default : "Customer"
    },
    created_orders : [{
        type : Schema.Types.ObjectId,
        ref : "Order",
        default : []
    }]
})

export const ExamUser = mongoose.model("ExamUser",examuserSchema)