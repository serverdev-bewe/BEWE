'use strict';

let result = [];

exports.findSeq = (req,res,next) => {

    result = [{
        "seq" : 1,
        "adminUser": "hello",
        "name": "hihi",
        "cnt": 5
    },
    {
        "seq" : 2,
        "adminUser": "오공쓰",
        "name": "지구인들아 내게 힘을줘!@!",
        "cnt": 8
    }
]
    return res.status(201).json(result);
};

exports.createRoom = (req, res, next) =>{
    return res.status(201).json(result);
}