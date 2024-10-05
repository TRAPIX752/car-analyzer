#!/usr/bin/env node

const path = require('path');
const { readCSV, countCars, calculateAverageMileage, findMostExpensiveCar, findOldestCar, countColors } = require('../index');

// Путь к файлу CSV
const filePath = path.join(__dirname, '../__fixtures__/cars1.csv');

// Чтение CSV-файла и выполнение всех шагов анализа данных
readCSV(filePath).then((cars) => {
  console.log(`Количество автомобилей: ${countCars(cars)}`);
  console.log(`Средний пробег: ${calculateAverageMileage(cars)}`);
  console.log(`Стоимость самой дорогой машины: ${findMostExpensiveCar(cars)}`);
  console.log(`Самый старый автомобиль: ${findOldestCar(cars)}`);
  
  const colors = countColors(cars);
  const colorsStr = Object.entries(colors).map(([color, count]) => `${color}: ${count}`).join(', ');
  console.log(`Все цвета: ${colorsStr}`);
}).catch((error) => {
  console.error('Ошибка при чтении файла:', error);
});
