const fs = require('fs');
const csv = require('csv-parser');

// Функция для чтения данных из CSV-файла
function readCSV(filePath) {
  const cars = []; // Массив, в который будут сохранены данные о машинах
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        cars.push(row); // Добавляем каждую строку в массив
      })
      .on('end', () => {
        resolve(cars); // Когда все данные прочитаны, возвращаем массив
      })
      .on('error', (error) => {
        reject(error); // Если произошла ошибка, мы её выведем
      });
  });
}

// Функция для подсчета количества автомобилей
function countCars(cars) {
  return cars.length;
}

// Функция для вычисления среднего пробега
function calculateAverageMileage(cars) {
  const totalMileage = cars.reduce((sum, car) => sum + parseInt(car.mileage, 10), 0);
  return Math.round(totalMileage / cars.length); // Возвращаем округленный результат
}

// Функция для нахождения самой дорогой машины
function findMostExpensiveCar(cars) {
  const mostExpensiveCar = cars.reduce((prev, current) => 
    (parseInt(current.price, 10) > parseInt(prev.price, 10) ? current : prev));
  return mostExpensiveCar.price;
}

// Функция для нахождения самого старого автомобиля
function findOldestCar(cars) {
  const oldestCar = cars.reduce((prev, current) => 
    (parseInt(current.year, 10) < parseInt(prev.year, 10) ? current : prev));
  return `${oldestCar.make} ${oldestCar.model}`;
}

// Функция для подсчета количества машин по цветам
function countColors(cars) {
  const colors = {};
  cars.forEach((car) => {
    const color = car.color;
    if (colors[color]) {
      colors[color]++;
    } else {
      colors[color] = 1; // Если цвет встретился впервые, создаем запись
    }
  });
  return colors;
}

// Экспорт всех функций для использования в других файлах
module.exports = {
  readCSV,
  countCars,
  calculateAverageMileage,
  findMostExpensiveCar,
  findOldestCar,
  countColors
};
