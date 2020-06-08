module.exports = (sequelize,Datatypes)=>{
    let actor = sequelize.define(
        "Actor",
        {
            first_name:Datatypes.STRING,
            last_name:Datatypes.STRING,
            rating:Datatypes.DECIMAL
        },
        {
            timestamps:false
        }
    );
    actor.associate = function(models){
        actor.belongsToMany(models.Movie,{
            as:"Movies",
            through:"actor_movie",
            foreignKey:"actor_id",
            otherKey:"movie_id",
            timestamps:false
        })
    }
    return actor
} 