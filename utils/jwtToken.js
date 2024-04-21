export const generateToken=(user,message,statusCode,res)=>{
    const token = user.generateAuthToken();
    res.status(statusCode)
    .cookie("token", token, {
        httpOnly: true,
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
    })
    .json({
        success: true,
        message,
        user,
        token,
    });
}