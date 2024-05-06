function getRandomDate() {
  // Generate a random year between 2023 and 2024
  const year = Math.floor(Math.random() * 2) + 2023;

  // Generate a random month between 1 and 12
  const month = Math.floor(Math.random() * 12) + 1;

  // Generate a random day based on the month and year
  const daysInMonth = new Date(year, month, 0).getDate();
  const day = Math.floor(Math.random() * daysInMonth) + 1;

  // Format the date as dd/mm/yyyy
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  return formattedDate;
}

const comments = [
  "It was a good read, enjoyed it thoroughly!",
  "It was a horrible experience, wouldn't recommend it to anyone.",
  "It was an incredible book, couldn't put it down!",
  "I wouldn't recommend this book, found it lacking.",
  "I think the ending was a bit abrupt, but overall, it was an enjoyable read.",
  "I would read this book a hundred times, it's that good!",
  "It was decent, nothing extraordinary.",
  "It was a terrible disappointment, not what I expected at all.",
  "It was amazing, one of the best books I've read!",
  "I found it mediocre, neither good nor bad.",
  "I enjoyed it for the most part, but it had its flaws.",
  "It was fantastic, highly recommend it!",
  "It was okay, didn't leave much of an impression.",
  "It was dreadful, couldn't finish it.",
  "It was captivating, kept me hooked till the end!",
  "I wouldn't call it great, but it wasn't terrible either.",
  "It was enjoyable, but forgettable.",
  "It was a masterpiece, loved every page of it!",
  "It was underwhelming, didn't live up to the hype.",
  "It was entertaining, but nothing groundbreaking.",
  "It was terrible, regret reading it.",
  "It was fantastic, a must-read for everyone!",
  "It was mediocre, didn't meet my expectations.",
  "It was excellent, couldn't ask for more.",
  "It was disappointing, not worth the hype.",
  "It was phenomenal, couldn't put it down!",
  "It was decent, but nothing special.",
  "It was awful, waste of time.",
  "It was brilliant, loved every moment of it.",
  "It was average, neither good nor bad.",
  "It was enchanting, couldn't stop reading!",
  "It was subpar, expected better.",
  "It was outstanding, highly recommended!",
  "It was just okay, didn't leave a lasting impression.",
  "It was dreadful, couldn't finish it.",
  "It was gripping, kept me on the edge of my seat!",
  "It was lackluster, didn't live up to expectations.",
  "It was superb, exceeded all expectations!",
  "It was meh, nothing special.",
  "It was remarkable, couldn't get enough of it!",
  "It was disappointing, didn't meet my expectations.",
  "It was phenomenal, a real page-turner!",
  "It was mediocre, wouldn't read it again.",
  "It was incredible, couldn't recommend it enough!",
  "It was forgettable, nothing memorable about it.",
  "It was atrocious, worst book I've ever read.",
  "It was outstanding, a must-read for all!",
  "It was decent, but nothing to write home about.",
  "It was dreadful, couldn't finish it.",
  "It was enthralling, couldn't put it down!",
];

const createMockCommentsForAllBooks = (userId, bookISBN) => {
  return {
    rating: Math.floor(Math.random() * 5) + 1,
    comment: comments[Math.floor(Math.random() * comments.length)],
    date: getRandomDate(),
    userUserId: userId,
    bookISBN: bookISBN,
  };
};

module.exports = createMockCommentsForAllBooks;
