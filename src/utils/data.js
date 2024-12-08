const mockEmployeeData = [];

const departments = ["Analytics", "Tech"];
const positions = ["Junior", "Medior", "Senior"];
const names = [
  { firstName: 'John', lastName: 'Doe' },
  { firstName: 'Jane', lastName: 'Smith' },
  { firstName: 'Robert', lastName: 'Johnson' },
  { firstName: 'Emily', lastName: 'Williams' },
  { firstName: 'Michael', lastName: 'Brown' },
  { firstName: 'Sarah', lastName: 'Davis' },
  { firstName: 'David', lastName: 'Martinez' },
  { firstName: 'Jessica', lastName: 'Garcia' },
  { firstName: 'James', lastName: 'Rodriguez' },
  { firstName: 'Linda', lastName: 'Wilson' },
  { firstName: 'William', lastName: 'Taylor' },
  { firstName: 'Olivia', lastName: 'Anderson' },
  { firstName: 'Daniel', lastName: 'Thomas' },
  { firstName: 'Sophia', lastName: 'Jackson' },
  { firstName: 'Matthew', lastName: 'White' },
  { firstName: 'Charlotte', lastName: 'Harris' },
  { firstName: 'Lucas', lastName: 'Martin' },
  { firstName: 'Amelia', lastName: 'Lee' },
  { firstName: 'Ethan', lastName: 'Walker' },
  { firstName: 'Mia', lastName: 'Young' },
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

for (let i = 1; i <= 100; i++) {
  const randomName = getRandomItem(names);
  const dateOfEmployment = `2020-01-${(i % 31) + 1}`; 
  const dateOfBirth = `199${(i % 10) + 1}-0${(i % 12) + 1}-${(i % 28) + 1}`;
  mockEmployeeData.push({
    id: i,
    firstName: randomName.firstName,
    lastName: randomName.lastName,
    dateOfEmployment: dateOfEmployment,
    dateOfBirth: dateOfBirth,
    phone: `+123456789${i}`,
    email: `${randomName.firstName.toLowerCase()}${randomName.lastName.toLowerCase()}@example.com`,
    department: getRandomItem(departments),
    position: getRandomItem(positions),
  });
}

export default mockEmployeeData;
