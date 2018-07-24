import {DefineAttributes, DefineOptions, Model, Sequelize} from "sequelize";

/**
 * An abstract class to build a sequelize model
 * Define the constructor, build method and getter of Model
 */
export abstract class ModelBuilder {
    attributes: DefineAttributes;
    option: DefineOptions<any>;
    private _model: Model<any, any>;
    modelName: string;

    protected constructor (protected sequelize: Sequelize) {
        this.defineAttributes()
            .defineOptions()
            .defineModelName()
            .build(sequelize)
            .afterBuilt();
    }

    get model(): Model<any, any> {
        return this._model;
    }

    abstract defineAttributes(): ModelBuilder;
    abstract defineOptions(): ModelBuilder;
    abstract defineModelName(): ModelBuilder;
    build(sequelize: Sequelize): ModelBuilder {
        this._model = <Model<any, any>> sequelize.define(this.modelName, this.attributes, this.option);
        return this;
    }
    abstract afterBuilt(): void;
}