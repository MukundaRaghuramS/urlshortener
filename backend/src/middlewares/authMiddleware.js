export const authMiddleware = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const token = cookies['jwt'];

        if (!token) {
            return res.status(403).json({ 
                message: "No token found. Unauthorized access." }
            );
        }
        try {
            const decode = await jwt.decode(token);
            req.user = decode;
        } catch (error) {
            console.error("Invalid token",error.message);
            return res.status(403).json({
                message: "Invalid token. Unauthorized access."
            });
        }
        next();
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}