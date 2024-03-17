
const badRequest = (res, message, error = null) => {
    const body = {
        status: false, responseCode: 400, message,
    }
    if (error) body.error = error
    res.responseDescription = "Bad Request";
    return res.status(400).json(body);
};

const notFound = (res, message, error = null) => {
    const body = {
        status: false, responseCode: 404, message,
    }
    if (error) body.error = error
    res.responseDescription = "Not Found";
    return res.status(404).json(body);
}

const serverError = (res, message, error = null) => {
    const body = {
        status: false, responseCode: 500, message,
    }
    if (error) body.error = error
    res.responseMessage = message.message;
    res.responseDescription = "Server Error";
    return res.status(500).json(body);
};

const success = (res, message, body, code = 201) => {
    if (body) _body = { status: true, responseCode: 201, message, data: { ...body } };
    else _body = { status: true, responseCode: 201, message };
    res.responseMessage = message;
    res.responseDescription = "OK Success";
    return res.status(code).json(_body);
};

// const successOTP = (res, message, body, code = 206) => {
//     if (body) _body = { status: true, responseCode: 206, message, data: { ...body } };
//     else _body = { status: true, responseCode: 206, message };
//     res.responseMessage = message;
//     res.responseDescription = "OK Success";
//     return res.status(code).json(_body);
// };


const validationError = (res, message, error = null) => {
    let body = {
        status: false, responseCode: 406,
        message, data: error,
    };
    res.responseMessage = message;
    res.responseDescription = "Validation Error";
    return res.status(406).json(body);
};

const authError = (res, message) => {
    let body = {
        status: false, responseCode: 401,
        message,
    };
    res.responseMessage = message;
    res.responseDescription = "Authentication Error";
    return res.status(401).json(body);
};


const custom = (res, response, message, status, data) => {
    try {
        return res.status(response).send({ response, message, status, data })
    } catch (error) {
        console.trace('Inside Catch => ', error);
    }
}



module.exports = { custom, authError, validationError, success, notFound, serverError, badRequest }