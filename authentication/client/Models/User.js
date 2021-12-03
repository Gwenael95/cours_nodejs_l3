// Contenu de ce qu'on veut mettre

import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
    return sequelize.define("user", {
        pseudo: Sequelize.STRING,
        mail: Sequelize.STRING,
        room: Sequelize.STRING,
        connectionDate: Sequelize.DATE
    });
};