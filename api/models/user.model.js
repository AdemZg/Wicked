const mongoose = require('mongoose')
const bcrypt = require('bcrypt') 
const crypto = require('crypto')

var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
    role:{
        type:String,
        default:"user",
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    cart:{
        type:Array,
        default: []
    },
    address:{
        type:String,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    refreshToken: {
        type:String,
    }
}, {timestamps: true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.createPasswordResetToken = async function(){
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetExpires = Date.now() + 30 * 60 * 100 //10 mins
    return resetToken
}


module.exports = mongoose.model('User', userSchema)