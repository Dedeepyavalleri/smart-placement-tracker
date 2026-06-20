const errorHandler = (
    err,
    req,
    res,
    next
) => {

    console.log(err);

    res.status(500).send({
        success: false,
        message: err.message ||
                 "Server Error"
    });

};

module.exports = errorHandler;