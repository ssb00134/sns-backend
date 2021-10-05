module.exports = (sequelize, DataType) =>
  sequelize.define(
    'user',
    {
      email: {
        type: DataType.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: DataType.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataType.STRING(100),
        allowNull: false,
      },
      provider: {
        type: DataType.STRING(15),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: DataType.STRING(30),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );
