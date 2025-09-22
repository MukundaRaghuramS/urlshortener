export const getProfileOfUser = (req, res) => {

    try {
        console.log("Printing the User->",req.user);
        return res.this.status(200).json({
            message:"User Profile!",
            data:{}
        })
    } catch (error) {
        console.error("Error in getProfile",error.message);
        return res.status(500).json({
            message :"Error in getting user Profile",
            error : error.message
        })
    }
};

export const getMyUrls=(req, res)=>{
    try {
        
    } catch (error) {
        console,log(error);
        res.status(500).send("Internal Server Error");
    }
}