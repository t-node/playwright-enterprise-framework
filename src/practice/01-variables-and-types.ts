const firstName: string = "Vevin";
const lastName: string = "Moza";
let age: number = 31;
const isActive: boolean = true;
const salary: number = 95000.5;
console.log(`Name: ${firstName} ${lastName}, Age: ${age}, Active: ${isActive}`);
console.log(`Name: ${firstName} ${lastName}, Age: ${age}, Active: ${isActive}`);
const city = "Bangalore";
const yearsofExperience = 17;
const isRemote = true;

const skills: string[] = ["Java", "Selenium", "Maven"];
const tools: Array<String> = ["Jenkins", "Git", "Playwright"];
const mixedData: (string | number)[] = [
  "Playwright",
  "2024",
  "Typescript",
  34,
  33,
  56,
  "Selenium",
];
skills.push("TypeScript");
skills.push("Python");
console.log("Skills: ", skills);

const engineer = {
  name: "Vevin Moza",
  role: "Senior SDET",
  experience: 17,
  languages: ["Java", "TypeScript"],
  isLearningPlaywright: true,
};

console.log("Engineer:", engineer);
console.log(
  `${engineer.name} is a ${engineer.role} with ${engineer.experience}`,
);
let middleName: string | null = null;
let nickName: string | undefined = undefined;
const user: { name: string; address?: { city: string } } = { name: "Vevin" };
console.log(user.address?.city);
console.log(user.address?.city ?? "Unknown");

console.log("\n Exercise 1: complete!");
