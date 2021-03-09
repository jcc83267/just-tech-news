const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create our User Model
class User extends Model {}

// define table columns and configuration
User.init(
    {
        //Table column definitions go here // define an id column
        id: {
            //use the special sequelize datatypes object provide what type of datatype
            type: DataTypes.INTEGER,
            // this is the qquivalent of SQL's 'not null' option
            allowNull: false,
            // instuct that this is the primary key
            primaryKey: true,
            // turn on auto increments
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //there cannot be any duplicate email values in this table
            unique: true,
            //if allow null is set to false, we can run our data through validator before creating the table data
            validate: {
                isEmail: true
            }
        },
        //define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validata: {
                //this means the password must be least four characters long
                len: [4]
            }
        }
    },
    {
        //table configuration options go here 

        //pass in our imported sequelize connection (the direct connection to our database )
        sequelize,
        // dont automatcally create createAt/updatedAt timestamp fields
        timestamps: false,
        //dont pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. 'comment_text' and not 'commentText')
        underscored: true,
        // make it so our model name  stays lowercoase in the database
        modelName: 'user'
    }
);

module.exports = User;