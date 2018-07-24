import * as Sqlize from "sequelize";

const config = require("../../resource/config");
export const Connection = new Sqlize(config.mysql.url);