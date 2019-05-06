const state = {
  user: {
    name: "Nick",
    age: 30,
    email: "my@email.com"
  },
  genres: ["fiction", "sci-fi"]
};

const newSelector = require("./selector");

const getUserName = state => state.user.name;
const getUserAge = state => state.user.age;
const getUserEmail = state => state.user.email;
const getGenres = state => state.genres.join(", ");

const getBio = newSelector(
  getUserName,
  getUserAge,
  getUserEmail,
  (name, age, email) => {
    return `This is ${name}, a ${age} year old that can be contacted at ${email}.`;
  }
);

const getExtendedBio = newSelector(getBio, getGenres, (bio, genres) => {
  return `${bio} Favorite genres are ${genres}.`;
});

const getOtherBio = newSelector(getBio, bio => bio);

console.log(getExtendedBio(state));
console.log(getExtendedBio(state));
console.log(getOtherBio(state));
