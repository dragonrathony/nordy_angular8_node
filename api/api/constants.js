const apidetails = {
  key: '6sRXrtt57UZKdW79SP886s',
  secret: 'Oq/QiPaAs/P3vGQl/J1tgtkCMfyXHG+DstCUKE4K'
}
let Database = require('../database');
let database = new Database({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'nrdmaxi'
});
/*
let database = new Database({
  host     : '127.0.0.1',
  user     : 'Augurs',
  password : 'Augurs@9848',
  database : 'nrdmaxi'
});
*/
const ConstantArray = { apidetails, database};
module.exports = ConstantArray;