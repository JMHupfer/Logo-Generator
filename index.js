(async () => {
  const { default: inquirer } = await import('inquirer');
  const fs = require('fs');
  const { Shape, Triangle, Circle, Square } = require('./lib/shapes');

  const generateLogo = async () => {
    // this line of code will prompt the user for text input (letters used for logo)
    const { text } = await inquirer.prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for the logo:',
        validate: (input) => input.length > 0 && input.length <= 3,
      },
    ]);

    // this line of code will prompt the user for the text color (color of letters chosen above)
    const { textColor } = await inquirer.prompt([
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color (keyword or hexadecimal):',
        validate: (input) => input.length > 0,
      },
    ]);

    // this line of code will prompt the user for the shape (shape of logo)
    const { shape } = await inquirer.prompt([
      {
        type: 'list',
        name: 'shape',
        message: 'Select a shape:',
        choices: ['circle', 'triangle', 'square'],
      },
    ]);

    // this line of code will prompt the user for the shape color (color of shape selected above)
    const { shapeColor } = await inquirer.prompt([
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color (keyword or hexadecimal):',
        validate: (input) => input.length > 0,
      },
    ]);

    // here we are creating a switch case statement (clearner if/then statement) that generates the share being called
    // please see shape.js where we define the shapes circle, triangle, and square
    let logoShape;
    switch (shape) {
      case 'circle':
        logoShape = new Circle();
        break;
      case 'triangle':
        logoShape = new Triangle();
        break;
      case 'square':
        logoShape = new Square();
        break;
    }

    logoShape.setColor(shapeColor);

    // this code here will generate SVG
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
        ${logoShape.render()}
        <text x="150" y="100" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
      </svg>
    `;

    // this code writes the SVG file
    fs.writeFileSync('logo.svg', svg);

    console.log('Generated logo.svg');
  };

  generateLogo();
})();