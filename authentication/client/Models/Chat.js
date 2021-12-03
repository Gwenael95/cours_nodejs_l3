// Contenu de ce qu'on veut mettre

import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
    return sequelize.define("chat", {
        name: Sequelize.STRING,
        message: Sequelize.STRING,
        room: Sequelize.STRING
    });
};