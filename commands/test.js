exports.run = async (bot, msg, args) => {
    msg.channel.send({embed: {
        title: 'Embed Title',
            "thumbnail": {
      "url": "https://cdn.discordapp.com/icons/268800390961561601/86b9a2f4c9102c22de665e666caece2c.jpg"
    },
        fields:  [ {
       name: 'FieldName',
       value: 'Field Value',
       inline: true },
      {
       name: 'FieldName',
       value: 'Field Value',
       inline: true },{
       name: 'FieldName',
       value: 'Field Value',
       inline: true },{
       name: 'FieldName',
       value: 'Field Value',
       inline: true },{
       name: 'FieldName',
       value: 'Field Value',
       inline: true },{
       name: 'FieldName',
       value: 'Field Value',
       inline: true },{
       name: 'FieldName',
       value: 'Field Value',
       inline: true },{
       name: 'FieldName',
       value: 'Field Value',
       inline: true },{
       name: 'FieldName',
       value: 'Field Value',
       inline: true },{
       name: 'FieldName',
       value: 'Field Value',
       inline: true }, ]
      }
    });
};

/*
const Discord = require("discord.js");

exports.run = async (bot, msg, args) => {
  msg.delete(100);
  let response = await promiseMyFunc("blah");
  msg.channel.send(response);
};

const myFunc = function(a, callback) {
  return callback(a);
};

function Promisify(func){
    return function(...args){
        return new Promise((resolve, reject)=>{
            func(...args, (...done)=>{
                if(done.length === 1){
                    resolve(done[0]);
                }else{
                    if(done[0]){
                        reject(done[0]);
                    }else{
                        resolve(done[1]);
                    }
                }
            })
        });
    }
}

const promiseMyFunc = Promisify(myFunc);
*/