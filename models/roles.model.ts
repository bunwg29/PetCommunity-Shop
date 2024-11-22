import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    title: String,
    permission: [ {type: String} ],
    deleted: {
        type: Boolean,
        default: false
    },
    },  
    {
        timestamps: true
    }
);

const RoleModel = mongoose.model("RoleModel", RoleSchema, "roles");

export default RoleModel;