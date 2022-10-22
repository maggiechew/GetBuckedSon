import mongoose from "./mongoose.js";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    topScore: Number,
    totalScore: Number
  },
  {
    statics: {
      async findByLogin(name, password) {
        let user = await this.find({ name: name, password: password });
        if (!user) {
          throw new Error("No Such Username Found");
        }
        if (password !== user.password) {
          throw new Error("Incorrect Password");
        } else {
          return user;
        }
      },
      newUser(data) {
        return User.create(data);
      }
    },
  }
);
const User = mongoose.model("User", userSchema);

async function newUser(data) {
  return await User.create(data);
}

// async function getUserInfo(data) {}

export { User, newUser };

// await User.create({ name: "Shrek"})

// const test = new User({ name: "Test", password: "test", topScore: 4, totalScore: 4});
// const otherTest = new User({ name: "Shrek", password: "DONKEY!!!", topScore: 2, totalScore: 2});

// await otherTest.save()
// console.log (otherTest.name)

// const users = await User.find();
// console.log(users);

// const allShrek = await User.find({ name: /^S/ });
// console.log(allShrek);


