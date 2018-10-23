const inquirer = require('inquirer');

module.exports = class MenuController
{
  constructor()
  {
    this.mainMenuQuestions = 
    [
      {
        type: 'list',
        name: 'mainMenuChoice',
        message: 'Please choose from an option below: ',
        choices:
        [
          'Add new contact',
          'Show current date and time',
          'Exit'
        ]
      }
    ];
  }

  main()
  {
    console.log('Welcome to AddressBloc!');
    inquirer.prompt(this.mainMenuQuestions).then((response) =>
    {
      switch (response.mainMenuChoice)
      {
        case 'Add new contact':
          this.addContact();
          break;
        case 'Show current date and time':
          this.getDate();
          break;
        case 'Exit':
          this.exit();
          break;
        default:
          console.log('Invalid input!');
          this.main();
      }
    }).catch((err) => 
    {
      console.log(err);
    });
  }

  clear()
  {
    console.log("\x1Bc");
  }

  addContact()
  {
    this.clear();
    console.log('addContact called');
    this.main();
  }

  getDate()
  {
    this.clear();

    let date = new Date();

    console.log('Current date and time:');
    console.log(date.toLocaleString());
    console.log('');

    this.main();
  }

  exit()
  {
    console.log('Thanks for using AddressBloc!');
    process.exit();
  }
}