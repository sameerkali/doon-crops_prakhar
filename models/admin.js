const { Sequelize, DataTypes } = require('sequelize');

require("dotenv").config();
const sequelize = new Sequelize(process.env.DB_URI);


const districts = ["Almora", "Nainital", "Chamoli", "Dehradun", "Haridwar", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi", "Champawat", "Bageshwar"];

const Admin = sequelize.define('Admin', {
    // Model attributes are defined here
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        get() {
            return this.getDataValue('id');
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        get() {
            return this.getDataValue('username');
        },
        set(value) {
            this.setDataValue('username', value);
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('password');
        },
        set(value) {
            this.setDataValue('password', value);
        }
    },
    mobile_number: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        isNumeric: true,
        get() {
            return this.getDataValue('mobile_number');
        },
        set(value) {
            this.setDataValue('mobile_number', value);
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'user',
        isIn: [['master_admin','district_admin']],
        get() {
            return this.getDataValue('role');
        },
        set(value) {
            this.setDataValue('role', value);
        }
    },
    district: {
        type: DataTypes.STRING,
        allowNull: true,
        isIn: [districts],
        get() {
            return this.getDataValue('district');
        },
        set(value) {
            this.setDataValue('district', value);
        }
    }
});

// TODO: Call this efficiently
Admin.sync({alter: true}).then(
    () => console.log("Admin table created successfully")
);

module.exports = Admin;