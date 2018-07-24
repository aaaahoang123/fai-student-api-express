import {ModelBuilder} from "../abstracts/model-builder";
import {DefineAttributes, DefineOptions, Sequelize} from "sequelize";
import * as Sqlize from "sequelize";

export class UserModelBuilder extends ModelBuilder {

    constructor(sequelize: Sequelize) {
        super(sequelize);
    }

    defineModelName(): UserModelBuilder {
        this.modelName = "fu_user";
        return this;
    }

    defineOptions(): UserModelBuilder {
        this.option = <DefineOptions<any>> {
            tableName: "fu_user",
            timestamps: false
        };
        return this;
    }

    defineAttributes(): UserModelBuilder {
        this.attributes = <DefineAttributes> {
            user_pass: {
                type: Sqlize.STRING(100),
                validate: {
                    notNull: {
                        msg: "Password cannot null!"
                    },
                    len: {
                        args: [8, 50],
                        msg: "User pass must have 8 to 50 characters!"
                    },
                    notEmpty: {
                        msg: "User password can not be empty!"
                    }
                }
            },
            user_level: {
                type: Sqlize.INTEGER(11)
            },
            user_login: {
                type: Sqlize.STRING(100),
                notNull: true
            },
            user_surname: {
                type: Sqlize.STRING(100)
            },
            user_middlename: {
                type: Sqlize.STRING(100)
            },
            user_givenname: {
                type: Sqlize.STRING(100)
            },
            sex: {
                type: Sqlize.TINYINT(1)
            },
            user_code: {
                type: Sqlize.STRING(256)
            },
            user_DOB: {
                type: Sqlize.DATE
            },
            user_email: {
                type: Sqlize.STRING(256)
            },
            user_address: {
                type: Sqlize.TEXT
            },
            user_telephone: {
                type: Sqlize.STRING(100)
            },
            user_create: {
                type: Sqlize.STRING(100)
            },
            user_modified: {
                type: Sqlize.STRING(100)
            }
        };
        return this;
    }

    afterBuilt(): void {
        this.model.removeAttribute("id");
    }
}