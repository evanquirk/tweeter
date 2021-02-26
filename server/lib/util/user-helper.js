"use strict";

const Chance      = require("chance"),
      chance      = new Chance();

const md5 = require('md5');


module.exports = {
  generateRandomUser: () => {
    const gender    = chance.gender();
    const firstName = chance.first({gender: gender});
    const lastName  = chance.last();
    const userName  = firstName + " " + lastName;
    
    let userHandle = "@";
    if (Math.random() > 0.5) {
      let prefix    = chance.prefix({gender: gender});
      prefix = prefix.replace(".", "");
      userHandle += prefix
    }

    userHandle += lastName;

    if (Math.random() > 0.5) {
      const suffix = Math.round(Math.random() * 100);
      userHandle += suffix;
    }
   
    const avatars = {
    
      Female: ["https://imgur.com/qNXEeCd.png", "https://imgur.com/2zQLIoc.png","https://imgur.com/Q28PLEn.png","https://imgur.com/ANDAHcw.png","https://imgur.com/kEnI2rh.png"],
      Male: ["https://imgur.com/KjQd2Ef.png","https://imgur.com/Ao371Kn.png","https://imgur.com/vwbDHqO.png","https://imgur.com/GUoJOal.png", "https://imgur.com/FnneLAm.png", "https://imgur.com/zLnCrJ9.png", "https://imgur.com/NrVx5xZ.png"]
    
    }
    
    const avatarArray = avatars[gender]
    const userAvatar = avatarArray[Math.floor(Math.random()*avatarArray.length)]
  

    return {
      name: userName,
      handle: userHandle,
      avatars: userAvatar
    };
  }
};