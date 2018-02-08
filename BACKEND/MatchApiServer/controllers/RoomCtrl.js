'use strict';

// let result = [];
let gameRooms = [[], [], [], [], [], [], [], [], [], [], []];

exports.findSeq = (req,res,next) => {
    let seq = req.params.seq;
    
    console.log('req.params.id' + req.params.seq);
    return res.status(201).json(gameRooms[seq]);
};

exports.createRoom = (req, res, next) =>{
    let idx = req.body.gameNumber;
    
    console.log('createRoom : ' + idx);
    gameRooms[idx].push({
        'seq' : idx,
        "adminUser": req.body.adminUser,
        "name": req.body.name,
        "cnt": req.body.cnt
    })
    return res.status(201).json(gameRooms[idx]);
}