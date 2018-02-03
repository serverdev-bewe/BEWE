'use strict';

const messageModel = require('../models/MessageModel');

// 전체 대화방 리스트
exports.list = (type) => {
  return async(req, res, next) => {
    let result = '';

    try {
      const userData = req.userIdx;

      if (type == 'conversations') {
        result = await messageModel.listConversation(userData);
      } else if (type == 'messages') {
        const conversationId = req.params.idx;
        result = await messageModel.getConversation(userData, conversationId);
      }
    } catch (error) {
      console.log(error);
      return next(error)
    }
    return res.status(200).json(result);
  }
};

// 방 생성하기!
exports.openConversation = async(req, res, next) => {
  let result = '';

  try{
    const userData = req.userIdx;
    const receiverData = req.body.receiver_idx;
    
    result = await messageModel.openConversation(userData, receiverData);   
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(201).json({"conversationId" : result});
};

// 메시지 보내기. 방이 열려 있지 않은 경우에는 일단 방부터 연다.
exports.sendMessage = async(req, res, next) => {
  let result = '';

  try {
    const messageData = {
      contents: req.body.contents,
      sender_idx: req.userIdx,
      conversation_idx: req.params.idx
    };
    const conversationId = req.body.conversation_idx;
    result = await messageModel.sendMessage(messageData);
      
  } catch (error) {
    console.log(error);
    return next(error);
  } 
  
  return res.status(201).json(result);
};