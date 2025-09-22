export const printHellowWorld = (req,res) => {
    try {
        const message = "Hello World";
        console.log(message);
        res.status(200).json({ 
            message : "Scussessfully Hello World",
            data : message

        });
    
} catch (error) {
    console.error("Error in printHellowWorld:", error);
    res.status(500).json({
        error : error.message
     });
    }
}
export const getDataFromFrontend = (req, res) => {
    try {
        const requestData = req.body;

        if (!requestData || Object.keys(requestData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No data provided in request body"
            });
        }

        console.log("Data received from frontend:", requestData);

        res.status(200).json({
            success: true,
            message: "Data received successfully",
            data: requestData
        });
    } catch (error) {
        console.error(" Error in getDataFromFrontend:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Internal server error"
        });
    }
};